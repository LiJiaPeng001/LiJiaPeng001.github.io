<script setup>
import { createPanoramaViewer } from './createPanoramaViewer.js'

const rootRef = ref(null)
let dispose = null

onMounted(() => {
  dispose = createPanoramaViewer(rootRef.value)
})

onBeforeUnmount(() => {
  dispose?.()
  dispose = null
})
</script>

<template>
  <div ref="rootRef" class="panorama-page">
    <div id="gate" class="gate">
      <div class="gate-card">
        <div class="gate-title">360° PANORAMA</div>
        <p class="gate-desc">上传自己的全景，或进入默认预览</p>
        <div class="gate-actions">
          <label class="gate-btn primary" title="上传全景图">
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
            <input id="gate-upload" type="file" accept="image/*" />
          </label>
          <button id="enter-preview" type="button" class="gate-btn">进入预览</button>
        </div>
      </div>
    </div>

    <div id="brand" class="brand viewer-ui">360° PANORAMA</div>
    <label id="corner-upload" class="upload-btn" title="上传全景图">
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
      <input id="pano-upload" type="file" accept="image/*" />
    </label>
    <div id="loading" class="loading">加载全景中…</div>
    <div id="canvas-wrap"></div>
    <div id="hint" class="hint viewer-ui">拖拽环顾 · 滚轮缩放</div>
  </div>
</template>

<style lang="less">
@import './panorama.less';
</style>
