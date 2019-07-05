import { h } from 'preact'
/** @jsx h */

const isDev = process.env.NODE_ENV !== 'production'

export function Document({ pathname, markup, assets, data, criticalStyles, cachedStylesId}) {
  return (
    <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta char-set="utf-8" />
      <title>{data.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {['vendor', 'runtime'].map(n => (
        <script 
          key={n}
          src={assets[n].js}
          defer 
          crossOrigin={isDev}
        />
      ))}
      {criticalStyles && <style dangerouslySetInnerHTML={{
        __html: criticalStyles,
      }}/>}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{
        __html: markup
      }}>
      </div>
      <script src={assets[pathname].js} defer crossorigin={isDev} />
      {
        !criticalStyles && 
        !cachedStylesId && 
        assets[pathname].css && 
        <link rel="stylesheet" href={assets[pathname].css} />
      }
      {
        criticalStyles && 
        cachedStylesId &&
        <link rel="stylesheet" href={`/styles/${cachedStylesId}`} />
      }
      <script dangerouslySetInnerHTML={{
        __html: `
          window.__DATA__ = ${JSON.stringify(data)};
        `
      }}/>
    </body>
    </html>
  )
}