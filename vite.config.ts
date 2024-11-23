import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    VueRouter({}),
    vue(),
    UnoCSS(),
    AutoImport({
      imports: ['vue', '@vueuse/core', VueRouterAutoImports],
      dts: true,
      dirs: [
        'src/composables/**',
        'src/utils/**',
        'src/stores',
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    Components({}),
    Layouts(),
  ],
})
