const isDev = process.env.NODE_ENV !== 'production'

export default function document(pathname, markup, assets, props) {
  return `
  <!doctype html>
  <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta char-set='utf-8' />
      <title>${props.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${
        assets[pathname].css
          ? `<link rel="stylesheet" href="${assets[pathname].css}">`
          : ''
      }
      <script src="${assets['commons'].js}" defer ${isDev ? 'crossorigin' : ''}></script>
      <script src="${assets['runtime'].js}" defer ${isDev ? 'crossorigin' : ''}></script>
      <script src="${assets[pathname].js}" defer ${isDev ? 'crossorigin' : ''}></script>
    </head>
    <body>
      <div id="root">
        ${markup}
      </div>
      <script>window.__DATA__ = ${JSON.stringify(props)};</script>
    </body>
  </html>
  `
}