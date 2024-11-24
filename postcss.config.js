import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import postcssMixins from 'postcss-mixins'
import postcssNested from 'postcss-nested'

/**
 * PostCSS Configuration File
 *
 * See https://github.com/postcss/postcss#usage
 */

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    autoprefixer,
    postcssImport,
    postcssMixins,
    postcssNested,
  ],
}

export default config
