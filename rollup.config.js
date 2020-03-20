import babel from 'rollup-plugin-babel'
import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/svelte-toast.mjs',
    format: 'esm'
  },
  plugins: [
    svelte({
      include: 'src/*.svelte'
    }),
    resolve(),
    babel({
      exclude: ['node_modules/**']
    })
  ]
}
