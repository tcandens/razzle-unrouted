import { h } from 'preact';
import { createView } from '../../createView'
/** @jsx h */

export const Something = createView((props, state) => {
  return (
    <div class="Preact">
      <h1>Something</h1>

      <a href="/about">Home</a>
      <a href="/about">About</a>
      <a href="/something" style={{ color: 'black' }}>
        Something
      </a>
      <div style={{ marginTop: 10 }}>
        <button onClick={() => alert('Yeahhhh')}>Click this, it works</button>
      </div>
    </div>
  );
})