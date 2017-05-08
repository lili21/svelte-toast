import 'svelte-toast/style.css'
import './app.css'

import Toast from 'svelte-toast'

function ready (fn) {
  document.addEventListener('DOMContentLoaded', fn)
}

ready(function () {
  const demo = document.getElementById('svelte-toast-demo')
  const toast = new Toast()
  demo.addEventListener('click', function (e) {
    e.stopPropagation()
    e.preventDefault()
    if (e.target.classList.contains('toast-btn')) {
      const r = Math.random()
      // toast.success('Hello Svelte Toast')
      if (r < 0.25) {
        toast.show('Hello Svelte Toast -- toast.show')
      } else if (r < 0.5) {
        toast.info('Hello Svelte Toast -- toast.info')
      } else if (r < 0.75) {
        toast.success('Hello Svelte Toast -- toast.success')
      } else {
        toast.error('Hello Svelte Toast -- toast.error')
      }
    }
  })
})

