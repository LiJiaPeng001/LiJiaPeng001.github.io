/** 平台画质：安卓降负载，iOS / 桌面保持高画质 */
import { isAndroid } from '@peeeng/utils/validate'

export { isAndroid }

export const QUALITY = isAndroid
  ? {
      antialias: false,
      maxPixelRatio: 1.5,
      maxTexture: 4096,
      anisotropy: 2,
      cylinderSegments: 64,
      dragSmooth: 14,
      generateMipmaps: false,
    }
  : {
      antialias: true,
      maxPixelRatio: 2,
      maxTexture: 8192,
      anisotropy: 8,
      cylinderSegments: 128,
      dragSmooth: 18,
      generateMipmaps: true,
    }

export function applyAndroidClass() {
  if (isAndroid) {
    document.documentElement.classList.add('android')
  }
}
