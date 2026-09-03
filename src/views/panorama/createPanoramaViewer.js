import * as THREE from 'three'
import {
  QUALITY,
  applyAndroidClass,
  clamp,
  smoothFollowFactor,
  fitToMaxTexture,
  loadImageElement,
  isLikelyImage,
  isHeicFile,
  configureTexture,
  createPanoramaMesh,
  disposePanoramaMesh,
} from './utils/index.js'

const DEFAULT_PANO = 'https://hsimage.fotile.com/202608310959490473537.jpg'

const IDLE_MS = 3000
const AUTO_ROTATE_DEG_PER_SEC = 6
const LAT_MIN = -35
const LAT_MAX = 35
const INERTIA_FRICTION = 0.92
const INERTIA_STOP = 0.02

/**
 * 在指定根节点挂载 360 全景查看器，返回销毁函数
 * @param {HTMLElement} root
 */
export function createPanoramaViewer(root) {
  const wrap = root.querySelector('#canvas-wrap')
  const loadingEl = root.querySelector('#loading')
  const uploadInput = root.querySelector('#pano-upload')
  const gateUploadInput = root.querySelector('#gate-upload')
  const gateEl = root.querySelector('#gate')
  const enterPreviewBtn = root.querySelector('#enter-preview')
  const brandEl = root.querySelector('#brand')
  const hintEl = root.querySelector('#hint')
  const cornerUploadEl = root.querySelector('#corner-upload')

  applyAndroidClass()

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
  camera.rotation.order = 'YXZ'

  const renderer = new THREE.WebGLRenderer({
    antialias: QUALITY.antialias,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, QUALITY.maxPixelRatio))
  renderer.setSize(window.innerWidth, window.innerHeight)
  wrap.appendChild(renderer.domElement)

  const view = { lon: 0, lat: 0, fov: 75 }
  const target = { lon: 0, lat: 0 }
  const velocity = { lon: 0, lat: 0 }

  let isDragging = false
  let didDragRotate = false
  let prevX = 0
  let prevY = 0
  let prevMoveTime = 0
  let panoramaMesh = null
  let objectUrl = null
  let viewerStarted = false
  let pauseAutoUntil = 0
  let lastFrameTime = performance.now()
  let rafId = 0
  let lastPinch = 0
  let disposed = false

  const loader = new THREE.TextureLoader()
  loader.setCrossOrigin('anonymous')

  function enableAutoRotateNow() {
    pauseAutoUntil = 0
    velocity.lon = 0
    velocity.lat = 0
  }

  function pauseAutoAfterDrag() {
    pauseAutoUntil = performance.now() + IDLE_MS
  }

  function clampLat(lat) {
    return clamp(lat, LAT_MIN, LAT_MAX)
  }

  function syncTargetFromView() {
    target.lon = view.lon
    target.lat = view.lat
  }

  const canvas = renderer.domElement
  canvas.style.touchAction = 'none'

  function onPointerDown(e) {
    if (!viewerStarted) return
    isDragging = true
    didDragRotate = false
    prevX = e.clientX
    prevY = e.clientY
    prevMoveTime = performance.now()
    velocity.lon = 0
    velocity.lat = 0
    syncTargetFromView()
    canvas.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e) {
    if (!isDragging) return

    const now = performance.now()
    const dt = Math.max(0.008, (now - prevMoveTime) / 1000)
    prevMoveTime = now

    const dx = e.clientX - prevX
    const dy = e.clientY - prevY
    prevX = e.clientX
    prevY = e.clientY

    if (dx === 0 && dy === 0) return
    didDragRotate = true

    const dLon = dx * 0.15
    const dLat = dy * 0.12
    target.lon += dLon
    target.lat = clampLat(target.lat + dLat)
    velocity.lon = dLon / dt
    velocity.lat = dLat / dt
  }

  function onPointerUp() {
    if (didDragRotate) pauseAutoAfterDrag()
    isDragging = false
    didDragRotate = false
  }

  function onPointerCancel() {
    if (didDragRotate) pauseAutoAfterDrag()
    isDragging = false
    didDragRotate = false
    velocity.lon = 0
    velocity.lat = 0
  }

  function onWheel(e) {
    if (!viewerStarted) return
    e.preventDefault()
    view.fov += e.deltaY * 0.04
    view.fov = clamp(view.fov, 40, 100)
    camera.fov = view.fov
    camera.updateProjectionMatrix()
  }

  function onTouchMove(e) {
    if (!viewerStarted || e.touches.length !== 2) return
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY,
    )
    if (lastPinch) {
      view.fov += (lastPinch - dist) * 0.08
      view.fov = clamp(view.fov, 40, 100)
      camera.fov = view.fov
      camera.updateProjectionMatrix()
    }
    lastPinch = dist
  }

  function onTouchEnd() {
    lastPinch = 0
  }

  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerup', onPointerUp)
  canvas.addEventListener('pointercancel', onPointerCancel)
  canvas.addEventListener('wheel', onWheel, { passive: false })
  canvas.addEventListener('touchmove', onTouchMove, { passive: true })
  canvas.addEventListener('touchend', onTouchEnd)

  function showLoading(text, soft = false) {
    loadingEl.textContent = text
    loadingEl.classList.toggle('soft', soft)
    loadingEl.classList.add('show')
  }

  function hideLoading() {
    loadingEl.classList.remove('show')
  }

  function showError(text) {
    loadingEl.classList.remove('soft')
    loadingEl.textContent = text
    loadingEl.classList.add('show')
  }

  function enterViewer() {
    gateEl.classList.add('hide')
    brandEl.classList.add('visible')
    hintEl.classList.add('visible')
    cornerUploadEl.classList.add('visible')
    viewerStarted = true
  }

  function clearPanorama() {
    if (panoramaMesh) {
      scene.remove(panoramaMesh)
      disposePanoramaMesh(panoramaMesh)
      panoramaMesh = null
    }
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl)
      objectUrl = null
    }
  }

  function applyTexture(texture) {
    configureTexture(texture, renderer, QUALITY)

    if (panoramaMesh) {
      scene.remove(panoramaMesh)
      disposePanoramaMesh(panoramaMesh)
    }

    panoramaMesh = createPanoramaMesh(texture, QUALITY)
    scene.add(panoramaMesh)

    view.lon = 0
    view.lat = 0
    view.fov = 75
    target.lon = 0
    target.lat = 0
    velocity.lon = 0
    velocity.lat = 0
    camera.fov = view.fov
    camera.updateProjectionMatrix()

    enableAutoRotateNow()
    hideLoading()
  }

  function buildTextureFromSource(source) {
    const fitted = fitToMaxTexture(source, {
      maxTexture: QUALITY.maxTexture,
      maxTextureSize: renderer.capabilities.maxTextureSize || 8192,
    })
    return new THREE.Texture(fitted)
  }

  async function loadRemotePanorama(url) {
    showLoading('加载全景中…', false)

    try {
      const img = await loadImageElement(url, { crossOrigin: 'anonymous' })
      const texture = buildTextureFromSource(img)
      clearPanorama()
      applyTexture(texture)
    } catch (err) {
      console.error('全景图加载失败:', err)
      loader.load(
        url,
        (texture) => {
          clearPanorama()
          applyTexture(texture)
        },
        undefined,
        (loadErr) => {
          console.error('全景图加载失败:', loadErr)
          showError('全景图加载失败')
        },
      )
    }
  }

  async function loadLocalPanorama(file) {
    showLoading(viewerStarted ? '切换全景中…' : '加载全景中…', viewerStarted)

    const url = URL.createObjectURL(file)

    try {
      const img = await loadImageElement(url)
      const texture = buildTextureFromSource(img)
      clearPanorama()
      objectUrl = url
      applyTexture(texture)
    } catch (err) {
      console.error('本地全景加载失败:', err)
      URL.revokeObjectURL(url)
      showError(
        isHeicFile(file) ? '暂不支持 HEIC，请先转为 JPG/PNG' : '全景图加载失败，请换 JPG/PNG 重试',
      )
    }
  }

  function handleUploadFile(file) {
    if (!file) return

    if (!isLikelyImage(file)) {
      showLoading('请选择图片文件', true)
      setTimeout(hideLoading, 1600)
      return
    }

    enterViewer()
    loadLocalPanorama(file)
  }

  function onUploadChange(e) {
    const input = e.currentTarget
    const file = input.files?.[0]
    input.value = ''
    handleUploadFile(file)
  }

  function onEnterPreview() {
    enterViewer()
    loadRemotePanorama(DEFAULT_PANO)
  }

  uploadInput.addEventListener('change', onUploadChange)
  gateUploadInput.addEventListener('change', onUploadChange)
  enterPreviewBtn.addEventListener('click', onEnterPreview)

  function animate(now = performance.now()) {
    if (disposed) return
    rafId = requestAnimationFrame(animate)

    const dt = Math.min(0.05, (now - lastFrameTime) / 1000)
    lastFrameTime = now

    if (viewerStarted && panoramaMesh) {
      if (!isDragging) {
        if (Math.abs(velocity.lon) > INERTIA_STOP || Math.abs(velocity.lat) > INERTIA_STOP) {
          target.lon += velocity.lon * dt
          target.lat = clampLat(target.lat + velocity.lat * dt)
          velocity.lon *= INERTIA_FRICTION
          velocity.lat *= INERTIA_FRICTION
        } else {
          velocity.lon = 0
          velocity.lat = 0
          if (now >= pauseAutoUntil) {
            target.lon -= AUTO_ROTATE_DEG_PER_SEC * dt
          }
        }
      }

      const follow = smoothFollowFactor(QUALITY.dragSmooth, dt)
      view.lon += (target.lon - view.lon) * follow
      view.lat += (target.lat - view.lat) * follow
      view.lat = clampLat(view.lat)
    }

    camera.rotation.y = THREE.MathUtils.degToRad(view.lon)
    camera.rotation.x = THREE.MathUtils.degToRad(view.lat)
    renderer.render(scene, camera)
  }
  rafId = requestAnimationFrame(animate)

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, QUALITY.maxPixelRatio))
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  return function dispose() {
    disposed = true
    cancelAnimationFrame(rafId)

    canvas.removeEventListener('pointerdown', onPointerDown)
    canvas.removeEventListener('pointermove', onPointerMove)
    canvas.removeEventListener('pointerup', onPointerUp)
    canvas.removeEventListener('pointercancel', onPointerCancel)
    canvas.removeEventListener('wheel', onWheel)
    canvas.removeEventListener('touchmove', onTouchMove)
    canvas.removeEventListener('touchend', onTouchEnd)
    uploadInput.removeEventListener('change', onUploadChange)
    gateUploadInput.removeEventListener('change', onUploadChange)
    enterPreviewBtn.removeEventListener('click', onEnterPreview)
    window.removeEventListener('resize', onResize)

    clearPanorama()
    renderer.dispose()
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }
}
