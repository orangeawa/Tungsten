import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({}),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: true,
      dirs: [
        './composables/**',
        'stores',
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
  ],
})
