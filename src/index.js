import _Toast from './toast.svelte'

export default class Toast {
  constructor (opts) {
    this.opts = Object.assign({
      position: 'bottom-center',
      duration: 2000,
      borderRadius: 0
    }, opts)
  }

  show (msg, opts = {}) {
    this._show(msg, opts, 'default')
  }

  info (msg, opts = {}) {
    this._show(msg, opts, 'info')
  }

  success (msg, opts = {}) {
    this._show(msg, opts, 'success')
  }

  error (msg, opts = {}) {
    this._show(msg, opts, 'error')
  }

  _show (msg, opts, type) {
    const _opts = Object.assign({}, this.opts, opts)
    const t = new _Toast({
      target: document.querySelector('body'),
      props: {
        msg,
        type,
        ..._opts
      }
    })

    setTimeout(() => {
      t.$set({ type: type + ' ' + 'anim' })
    }, 0)

    setTimeout(() => {
      t.$destroy()
    }, _opts.duration)
  }
}
