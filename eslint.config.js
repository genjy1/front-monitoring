import js from '@eslint/js'
import pluginVue, { rules } from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // Merging vue rules and disabling specific rules
  {
    'vue/multi-word-component-names': 'off',
  },

  // Including ESLint recommended config for JS
  js.configs.recommended,

  // Including Vue's "flat/essential" config
  ...pluginVue.configs['flat/essential'],

  // Applying Prettier configuration for skipping formatting
  skipFormatting,
]
