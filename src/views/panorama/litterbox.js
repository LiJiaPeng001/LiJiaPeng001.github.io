const LITTERBOX_API = 'https://litterbox.catbox.moe/resources/internals/api.php'

/**
 * 上传文件到 Litterbox 临时图床
 * @param {File} file
 * @param {'1h' | '12h' | '24h' | '72h'} [time='24h']
 * @returns {Promise<string>} 公网直链
 */
export async function uploadToLitterbox(file, time = '24h') {
  const form = new FormData()
  form.append('reqtype', 'fileupload')
  form.append('time', time)
  form.append('fileToUpload', file, file.name || 'panorama.jpg')

  const res = await fetch(LITTERBOX_API, {
    method: 'POST',
    body: form,
  })

  const text = (await res.text()).trim()
  if (!res.ok || !/^https?:\/\//i.test(text)) {
    throw new Error(text || `Litterbox 上传失败（${res.status}）`)
  }
  return text
}

/**
 * Litterbox / Catbox 会对跨站请求附加 CORP: same-site，
 * 直接当 WebGL 贴图会失败；经 wsrv.nl 代理后可正常加载。
 * 分享链接仍应使用原始直链。
 * @param {string} imageUrl
 */
export function toLoadableImageUrl(imageUrl) {
  try {
    const host = new URL(imageUrl).hostname.toLowerCase()
    if (host === 'catbox.moe' || host.endsWith('.catbox.moe')) {
      // w=8192：尽量保留全景分辨率；we：不放大小图
      return `https://wsrv.nl/?url=${encodeURIComponent(imageUrl)}&n=-1&w=8192&we`
    }
  } catch {
    // ignore invalid url
  }
  return imageUrl
}

/**
 * 生成可分享的全景页链接
 * @param {string} imageUrl
 */
export function buildPanoramaShareUrl(imageUrl) {
  const base = import.meta.env.BASE_URL || '/'
  const root = `${window.location.origin}${base.endsWith('/') ? base : `${base}/`}`
  const share = new URL('360', root)
  share.searchParams.set('img', imageUrl)
  return share.toString()
}
