import { copyFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const outDir = 'own'

function spaFallback404() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const indexHtml = fileURLToPath(new URL(`./${outDir}/index.html`, import.meta.url))
      const notFoundHtml = fileURLToPath(new URL(`./${outDir}/404.html`, import.meta.url))
      copyFileSync(indexHtml, notFoundHtml)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      dts: false,
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: false,
    }),
    spaFallback404(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir,
  },
})
