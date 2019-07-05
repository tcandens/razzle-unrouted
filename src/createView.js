import { render, h } from 'preact';
/** @jsx h */

export function createView(Component) {


  if (typeof window !== 'undefined') {

    const data = window.__DATA__;

    function renderApp() {
      render(<Component {...data} />, document.body, document.body.firstElementChild);
    }

    // Initial render.
    renderApp();

    if (!window.turbolinks) {
      import(/* webpackChunkName: 'turbolinks' */'turbolinks').then(Turbolinks => {
        if (!Turbolinks.supported) {
          console.warn('Turbolinks not supported')
          return
        }
        window.turbolinks = Turbolinks.start()
      })
    }

    const viewListender = document.addEventListener('turbolinks:load', function() {
      // console.dir(renderApp)
      // console.log('rendering!')
      renderApp()
    })
    console.dir(viewListender, {depth: null})
  }

  return Component
}