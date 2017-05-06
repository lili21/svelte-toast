import * as fs from 'fs'
import buble from 'rollup-plugin-buble'
import svelte from 'rollup-plugin-svelte'

export default {
  entry: 'index.js',
  dest: 'svelte-toast.js',
  format: 'umd',
  plugins: [
    svelte({
      include: 'src/*.svelte',
      css: function (css) {
        fs.writeFileSync('style.css', css)
      }
    }),
    buble()
  ]
}
