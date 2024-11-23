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
  plugins: [
    VueRouter({}),
    vue(),
    AutoImport({
      imports: ['vue', '@vueuse/core', VueRouterAutoImports],
      dts: true,
      dirs: [
        './composables/**',
        './utils/**',
        'stores',
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    Components({}),
    Layouts({
      defaultLayout: 'default',
    }),
    UnoCSS(),
  ],
})
