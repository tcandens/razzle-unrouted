import { h } from 'preact';
import { createView } from '../createView'
/** @jsx h */

export const Home = createView((props, state) => {
  return (
    <div class="Preact">
      <h1>{props.title}</h1>
      <a href="/about" style={{ color: 'black' }}>
        Home
      </a>
      <a href="/about">About</a>
      <a href="/something">Something</a>
      <p>
        Hello, Goodbye, Something
      </p>
    </div>
  );
})



