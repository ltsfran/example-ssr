import fs from 'fs';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from '@app/src/config/route';

const scripts = JSON.parse(fs.readFileSync(__dirname + '/stats.json', 'utf8'));
const port = 80;
const app = express();

app.use(express.static(__dirname + '/'));

app.get('/health', async (req, res) => {
  res.json({
    alive: true
  });
});

const templateFn = ({ body, scripts }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Example SSR</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
  </head>
  <body>
    <div id="root">${body}</div>
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
    const context = {
      status: HTTP_STATUS.OK
    };
    const body = renderToString(
      <Router location={req.path} context={context}>
        {renderRoutes(routes)}
      </Router>
    );

    if (context.status === HTTP_STATUS.NOT_FOUND) {
      res.status(HTTP_STATUS.NOT_FOUND);
    }
    
    res.send(templateFn({
      body,
      scripts
    }));
  } catch (error) {
    throw new Error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`);
});
