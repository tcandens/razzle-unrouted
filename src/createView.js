import { render, h } from 'preact';
/** @jsx h */

export function createView(Component) {

  if (typeof window !== 'undefined') {
    function renderView() {
      const data = window.__DATA__;
      render(<Component {...data} />, document.getElementById('root'));
    }

    renderView()
  }

  return Component
}