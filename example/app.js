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
    toast.success('Hello Svelte Toast')
  })
})

