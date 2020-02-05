import fs from 'fs';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from '@app/src/config/route';
import { Provider } from 'react-redux';
import configureStore from '@app/src/store/configureStore';

const scripts = JSON.parse(fs.readFileSync(__dirname + '/stats.json', 'utf8'));
const port = 80;
const app = express();

app.use(express.static(__dirname + '/'));

app.get('/health', async (req, res) => {
  res.json({
    alive: true
  });
});

const templateFn = ({ body, scripts, preloadedState }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Example SSR</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
  </head>
  <body>
    <div id="root">${body}</div>
    <script>
    // WARNING: See the following for security issues around embedding JSON in HTML:
    // http://redux.js.org/recipes/ServerRendering.html#security-considerations
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g,'\\u003c')}
    </script>
    ${Object.keys(scripts.assetsByChunkName)
      .map((entry) => `<script type="text/javascript" src="${process.env.PATH_STATIC}/${scripts.assetsByChunkName[entry][0]}"></script>`)
      .join('\n')
    }
  </body>
  </html>
`;

enum HTTP_STATUS {
  OK = 200,
  NOT_FOUND = 404
}

app.get('*', async (req, res) => {
  try {
    const store = configureStore();
    const preloadedState = store.getState();
    const context = {
      status: HTTP_STATUS.OK
    };
    const body = renderToString(
      <Provider store={store}>
        <Router location={req.path} context={context}>
          {renderRoutes(routes)}
      </Router>
      </Provider>
    );

    if (context.status === HTTP_STATUS.NOT_FOUND) {
      res.status(HTTP_STATUS.NOT_FOUND);
    }
    
    res.send(templateFn({
      body,
      scripts,
      preloadedState
    }));
  } catch (error) {
    throw new Error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`);
});
