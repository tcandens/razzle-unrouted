import { h } from 'preact';
import { createView } from '../createView'
import { css } from 'linaria'
/** @jsx h */

export const Home = createView((props, state) => {
  return (
    <div class={css`
      background-color: red;
    `}>
      <h1 class={css`
        font-size: 3em;
      `}>{props.title}</h1>
      <a href="/about" class={css`
        color: red;
      `}>
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



