require('import-export');
require('babel-core/register')({'presets': ['es2015', 'react']});

const http           = require('http');
const fs             = require('fs');
const path           = require('path');
const express        = require('express');
const React          = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter    = require('react-router')

const { renderToString } = ReactDOMServer;
const { match, RouterContext } = ReactRouter;

const staticFiles = [
  '/static/*',
  '/logo.svg',
  '/asset-manifest.json',
  '/favicon.ico'
];

const routes = require('../src/routes').default()

const app = express();
const port = process.env.PORT || 8080;
app.server = http.createServer(app);

// respond to reqs for static files
// (everything in build, minus index.html)
app.use(express.static('../build'));
staticFiles.forEach((file) => {
  app.get(file, (req, res) => {
    const filePath = path.join(__dirname, '../build', req.url);
    res.sendFile(filePath);
  });
});

app.get('*', (req, res) => {
  const error = () => res.status(404).send('404');
  const htmlFilePath = path.join(__dirname, '../build', 'index.html');

  fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
    if (err) {
      error();
    }
    else {
      match({ routes, location: req.url }, (err, redirect, ssrData) => {
        if (err) {
          error();
        }
        else if (redirect) {
          res.redirect(302, redirect.pathname + redirect.search)
        }
        else if (ssrData) {
          const ReactApp = renderToString(React.createElement(RouterContext, ssrData));
          const RenderedApp = htmlData.replace('{{SSR}}', ReactApp)
          res.status(200).send(RenderedApp)
        }
        else {
          error();
        }
      });
    }
  });
});

app.server.listen(port, (err) => {
  if (err) console.log('❌ Server Error', err);

  console.log(`==> 🌍 Listening on http://127.0.0.1:${port}`);
})
