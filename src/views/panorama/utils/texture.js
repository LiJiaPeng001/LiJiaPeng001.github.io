import * as THREE from 'three'
import { getSourceSize } from './image.js'

/**
 * @param {THREE.Texture} texture
 * @param {THREE.WebGLRenderer} renderer
 * @param {{ anisotropy: number, generateMipmaps: boolean }} quality
 */
export function configureTexture(texture, renderer, quality) {
  texture.colorSpace = THREE.SRGBColorSpace
  texture.mapping = THREE.UVMapping
  texture.anisotropy = Math.min(quality.anisotropy, renderer.capabilities.getMaxAnisotropy())
  texture.generateMipmaps = quality.generateMipmaps
  texture.minFilter = quality.generateMipmaps ? THREE.LinearMipmapLinearFilter : THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.needsUpdate = true
  return texture
}

function flipCylinderUVs(geometry) {
  const uvs = geometry.attributes.uv
  for (let i = 0; i < uvs.count; i++) {
    uvs.setX(i, 1 - uvs.getX(i))
  }
  uvs.needsUpdate = true
}

/**
 * 创建圆柱体内侧全景网格
 * @param {THREE.Texture} texture
 * @param {{ cylinderSegments: number }} quality
 */
export function createPanoramaMesh(texture, quality) {
  const { width, height } = getSourceSize(texture.image)
  const aspect = width / height
  const radius = 500
  const cylHeight = (2 * Math.PI * radius) / aspect

  const geometry = new THREE.CylinderGeometry(
    radius,
    radius,
    cylHeight,
    quality.cylinderSegments,
    1,
    true,
  )
  flipCylinderUVs(geometry)

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  })

  return new THREE.Mesh(geometry, material)
}

/** 释放全景网格及其贴图资源 */
export function disposePanoramaMesh(mesh) {
  if (!mesh) return
  mesh.geometry.dispose()
  const { map } = mesh.material
  if (map) map.dispose()
  mesh.material.dispose()
}
