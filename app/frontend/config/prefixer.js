import postcssJs from 'postcss-js'
import autoprefixer from 'autoprefixer'

export const prefixer = postcssJs.sync([autoprefixer])
