export function getSourceSize(source) {
  return {
    width: source.naturalWidth || source.videoWidth || source.width,
    height: source.naturalHeight || source.videoHeight || source.height,
  }
}

/**
 * 按平台画质 + GPU 上限等比缩小贴图源
 * @param {CanvasImageSource} source
 * @param {{ maxTexture: number, maxTextureSize?: number }} options
 */
export function fitToMaxTexture(source, { maxTexture, maxTextureSize = 8192 }) {
  const maxSize = Math.min(maxTexture, maxTextureSize)
  const { width, height } = getSourceSize(source)
  if (!width || !height) {
    throw new Error('无法读取图片尺寸')
  }

  const scale = Math.min(1, maxSize / width, maxSize / height)
  if (scale >= 1 && (source instanceof HTMLImageElement || source instanceof ImageBitmap)) {
    return source
  }

  const w = Math.max(1, Math.round(width * scale))
  const h = Math.max(1, Math.round(height * scale))
  const offscreen = document.createElement('canvas')
  offscreen.width = w
  offscreen.height = h
  const ctx = offscreen.getContext('2d', { alpha: false })
  ctx.drawImage(source, 0, 0, w, h)
  return offscreen
}

export function loadImageElement(url, { crossOrigin = null } = {}) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    if (crossOrigin) img.crossOrigin = crossOrigin
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('图片解码失败'))
    img.src = url
  })
}

export function isLikelyImage(file) {
  if (!file) return false
  if (file.type.startsWith('image/')) return true
  return /\.(jpe?g|png|webp|gif|bmp|avif)$/i.test(file.name || '')
}

export function isHeicFile(file) {
  const name = (file?.name || '').toLowerCase()
  const type = (file?.type || '').toLowerCase()
  return type.includes('heic') || type.includes('heif') || /\.heic$|\.heif$/.test(name)
}
