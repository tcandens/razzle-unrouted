
class Runtime {
  constructor(options) {
    this.renderers = new Map()
    this.currentPathname = null

    if (typeof window === 'undefined') {
      return
    }
    import(
      /* webpackChunkName */ 
      'turbolinks'
    ).then(Turbolinks => {
      if (Turbolinks.supported && !this.turbolinks) {
        this.turbolinks = Turbolinks.start()
        if (!this.isInitialized) {
          this.init()
        }
      }
    })


    window.runtime = this
  }
  init() {
    console.dir(this.renderers)
    const self = this

    window.addEventListener('turbolinks:load', function(e) {
      const { pathname } = window.location
      console.log(`Current path: ${pathname}`)
      const renderer = self.renderers.get(pathname)
      if (typeof renderer === 'function') {
        renderer.call()
      }
      console.dir(renderer)

    })

    this.isInitialized = true
  }
  setRenderer(pathname, renderer) {
    this.renderers.set(pathname, renderer)
  }
}

let runtime

export default function getRuntime() {
  if (!runtime) {
    console.log('creating runtime singleton')
    runtime = new Runtime()
  }

  return runtime
}