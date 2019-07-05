
class Runtime {
  constructor(options) {
    this.renderers = new Map()
    this.currentPathname = null

    if (typeof window === 'undefined') {
      return
    }
    import(
      /* webpackChunkName: 'turbolinks' */
      'turbolinks'
    ).then(Turbolinks => {
      if (Turbolinks.supported && !this.turbolinks) {
        this.turbolinks = Turbolinks.start()
      }
    })

    window.runtime = this
  }
}

let runtime = new Runtime()

export default runtime
