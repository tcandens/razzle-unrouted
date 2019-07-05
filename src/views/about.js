import { h } from 'preact';
import { createView } from '../createView'
import { css } from 'linaria'
/** @jsx h */

const title = css`
  font-size: 2em;
  color: coral;
  background-color: red;
  padding: 0.2em;
`

export const About = createView((props, state) => {
  return (
    <div class="Preact">
      <h1 class={title}>{props.title}</h1>
      <a href="/">Home</a>
      <a href="/about" style={{ color: 'black' }}>
        About
      </a>
      <a href="/something">Something</a>
    </div>
  );
})
