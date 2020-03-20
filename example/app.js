import Toast from '../dist/svelte-toast.mjs'

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
      if (r < 0.25) {
        toast.show('Toast -- toast.show')
      } else if (r < 0.5) {
        toast.info('Toast -- toast.info')
      } else if (r < 0.75) {
        toast.success('Toast -- toast.success')
      } else {
        toast.error('Toast -- toast.error')
      }
    }
  })
})
