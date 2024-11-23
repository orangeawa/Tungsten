import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      /* options */
    }),
    vue(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
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
    UnoCSS(),
  ],
})
