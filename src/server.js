import express from 'express';
import { h } from 'preact';
import render from 'preact-render-to-string';
/** @jsx h */

import { Document } from './_document'
import { Home } from './views/home';
import { About } from './views/about';
import { Something } from './views/something';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use((req, res, next) => {
    res.render = (Comp, name, props) => {
      const markup = render(<Document
        assets={assets}
        pathname={name}
        data={props}
      >
        <Comp {...props} />
      </Document>);
      res.status(200).send(markup)
    };
    next();
  })
  .get('/', (req, res) => {
    res.render(Home, 'home', {
      title: 'home',
    });
  })
  .get('/about', (req, res) => {
    res.render(About, 'about', {
      title: 'about',
    });
  })
  .get('/something', (req, res) => {
    res.render(Something, 'something/index', {
      title: 'something about',
    });
  });

export default server;
