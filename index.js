import _Toast from './src/toast.svelte'

class Toast {
  constructor (opts) {
    this.opts = opts || {
      position: 'bottom-center',
      duration: 2000
    }
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
      data: {
        msg,
        type,
        postion: _opts.postion
      }
    })

    setTimeout(() => {
      t.set({ type: t.get('type') + ' ' + 'anim' })
    }, 0)

    setTimeout(() => {
      t.destroy()
    }, _opts.duration)
  }
}

export default Toast
