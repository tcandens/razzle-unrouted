import { h } from 'preact';
import { createView } from '../createView'
/** @jsx h */

export const About = createView((props, state) => {
  return (
    <div class="Preact">
      <h1>{props.title}</h1>
      <a href="/">Home</a>
      <a href="/about" style={{ color: 'black' }}>
        About
      </a>
      <a href="/something">Something</a>
    </div>
  );
})
