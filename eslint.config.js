// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  ignores: [
    'tsconfig.*',
  ],
  rules: {
    'antfu/no-import-dist': 'off',
  },
})
