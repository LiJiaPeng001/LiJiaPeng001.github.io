import { defineConfig, globalIgnores } from 'eslint/config'
import { createRequire } from 'node:module'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

const require = createRequire(import.meta.url)
const autoImportGlobals = require('./.eslintrc-auto-import.json')

const readonlyGlobals = Object.fromEntries(
  Object.keys(autoImportGlobals.globals || {}).map((key) => [key, 'readonly']),
)

const sharedGlobals = {
  ...globals.browser,
  ...readonlyGlobals,
}

const vueConfigs = pluginVue.configs['flat/essential'].map((config) => ({
  ...config,
  languageOptions: {
    ...config.languageOptions,
    globals: {
      ...config.languageOptions?.globals,
      ...sharedGlobals,
    },
  },
}))

export default defineConfig([
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
    languageOptions: {
      globals: sharedGlobals,
    },
  },

  js.configs.recommended,
  ...vueConfigs,

  {
    name: 'app/vue-auto-import',
    files: ['**/*.vue'],
    rules: {
      // auto-import 注入的 API 对 no-undef 不友好，改由 globals + 构建期保障
      'no-undef': 'off',
    },
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,
])
