import { render, h } from 'preact';
import getRuntime from './runtime'
/** @jsx h */

function noop() {}

export function createView(Component) {

  let renderer = noop

  if (typeof window !== 'undefined') {

    function renderView() {
      const data = window.__DATA__;
      render(<Component {...data} />, document.getElementById('root'));
    }

    Object.defineProperty(renderView, 'name', {
      value: `${Component.name}Renderer`,
      writable: false,
    })

    const { pathname } = window.location
    const runtime = getRuntime()
    runtime.setRenderer(pathname, renderView)
  }

  renderer()

  return { Component, renderer }
}