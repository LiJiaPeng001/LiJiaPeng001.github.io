<script setup>
import { copyText } from '@peeeng/utils'
import { getFiles } from '@peeeng/utils/upload'
import { createPanoramaViewer } from './createPanoramaViewer.js'
import { buildPanoramaShareUrl, uploadToLitterbox } from './litterbox.js'

const route = useRoute()
const message = useMessage()

const rootRef = ref(null)
const sharing = ref(false)
const shareTime = ref('24h')

/** @type {null | { dispose: Function, loadLocal: Function, loadRemote: Function, enterViewer: Function, getShareSource: Function }} */
let api = null

const initialImageUrl = computed(() => {
  const raw = route.query.img
  if (typeof raw !== 'string' || !raw.trim()) return ''
  try {
    return decodeURIComponent(raw.trim())
  } catch {
    return raw.trim()
  }
})

onMounted(() => {
  api = createPanoramaViewer(rootRef.value, {
    initialImageUrl: initialImageUrl.value,
  })
})

onBeforeUnmount(() => {
  api?.dispose()
  api = null
})

async function pickPanorama() {
  const files = await getFiles({ multiple: false, accept: 'image/*' })
  const file = files?.[0]
  if (!file || !api) return
  api.enterViewer()
  await api.loadLocal(file)
}

async function enterDefaultPreview() {
  if (!api) return
  api.enterViewer()
  await api.loadRemote('https://hsimage.fotile.com/202608310959490473537.jpg')
}

async function sharePanorama() {
  if (!api || sharing.value) return

  const source = api.getShareSource()
  if (!source) {
    message.warning('请先加载一张全景图')
    return
  }

  sharing.value = true
  let loadingMsg = null
  try {
    let imageUrl = source.remoteUrl
    if (!imageUrl && source.file) {
      loadingMsg = message.loading('正在上传到临时图床…', { duration: 0 })
      imageUrl = await uploadToLitterbox(source.file, shareTime.value)
      loadingMsg.destroy()
      loadingMsg = null
      api.setRemoteUrl(imageUrl)
    }

    if (!imageUrl) {
      message.error('暂无可分享的图片地址')
      return
    }

    const shareUrl = buildPanoramaShareUrl(imageUrl)
    const ok = await copyText(shareUrl)
    if (ok) {
      message.success(`分享链接已复制（Litterbox ${shareTime.value} 有效）`)
    } else {
      message.error('复制失败，请手动复制链接')
    }
  } catch (err) {
    console.error(err)
    loadingMsg?.destroy()
    message.error(err?.message || '分享失败，请稍后重试')
  } finally {
    sharing.value = false
  }
}
</script>

<template>
  <div ref="rootRef" class="panorama-page">
    <div id="gate" class="gate">
      <div class="gate-card">
        <div class="gate-title">360° PANORAMA</div>
        <p class="gate-desc">上传自己的全景，或进入默认预览</p>
        <div class="gate-actions">
          <button type="button" class="gate-btn primary" title="上传全景图" @click="pickPanorama">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 16V7" />
              <path d="M8.5 10.5 12 7l3.5 3.5" />
              <path d="M5 17.5v1A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5v-1" />
            </svg>
            上传全景
          </button>
          <button type="button" class="gate-btn" @click="enterDefaultPreview">进入预览</button>
        </div>
      </div>
    </div>

    <div id="brand" class="brand viewer-ui">360° PANORAMA</div>

    <div id="viewer-actions" class="viewer-actions">
      <label class="share-time viewer-ui" title="分享链接有效期">
        <span>有效期</span>
        <select v-model="shareTime">
          <option value="1h">1 小时</option>
          <option value="12h">12 小时</option>
          <option value="24h">24 小时</option>
          <option value="72h">72 小时</option>
        </select>
      </label>
      <button
        id="share-btn"
        type="button"
        class="action-btn viewer-ui"
        :disabled="sharing"
        title="上传到 Litterbox 并复制分享链接"
        @click="sharePanorama"
      >
        {{ sharing ? '分享中…' : '分享' }}
      </button>
      <button
        id="corner-upload"
        type="button"
        class="action-btn viewer-ui"
        title="上传全景图"
        @click="pickPanorama"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 16V7" />
          <path d="M8.5 10.5 12 7l3.5 3.5" />
          <path d="M5 17.5v1A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5v-1" />
        </svg>
        <span class="label">上传全景</span>
      </button>
    </div>

    <div id="loading" class="loading">加载全景中…</div>
    <div id="canvas-wrap"></div>
    <div id="hint" class="hint viewer-ui">拖拽环顾 · 滚轮缩放</div>
  </div>
</template>

<style lang="less">
@import './panorama.less';
</style>
