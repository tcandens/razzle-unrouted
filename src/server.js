import fs from 'fs'
import crypto from 'crypto'
import path from 'path'
import express from 'express';
import { h } from 'preact';
import render from 'preact-render-to-string';
import { collect } from 'linaria/server'
/** @jsx h */

import { Document } from './_document'
import { Home } from './views/home';
import { About } from './views/about';
import { Something } from './views/something';

const cssCache = new Map()

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/styles/:slug', (req, res) => {
    res.type('text/css')
    const cached = cssCache.get(req.params.slug)
    if (cached) {
      res.end(cached)
    } else {
      res.end(`/** no styles **/`)
    }
  })
  .use((req, res, next) => {
    res.render = (Comp, name, props) => {
      const markup = render(<Comp {...props} />)
      const rest = {}
      if (assets[name] && assets[name].css) {
        try {
          const staticCssPath = path.join(__dirname, 'public', assets[name].css)
          const staticCss = fs.readFileSync(staticCssPath, 'utf8')
          let {critical, other} = collect(markup, staticCss)
          const slug = crypto.createHash('md5').update(other).digest('hex')
          cssCache.set(slug, other)
          rest.criticalStyles = critical
          rest.cachedStylesId = slug
        } catch (e) {
          console.warn('could not open css files', e)
        }
      }

      const html = render(<Document
        assets={assets}
        pathname={name}
        data={props}
        markup={markup}
        {...rest}
      >
      </Document>);

      res.status(200).send(html)
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
