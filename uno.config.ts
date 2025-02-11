import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    // https://icones.js.org/collection/mdi
    presetIcons({
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
    }),
  ],
  // https://unocss.dev/config/#safelist
  safelist: [
    ...Array.from({ length: 100 }, (_, i) => `w-${i + 1}`),
  ],
})
