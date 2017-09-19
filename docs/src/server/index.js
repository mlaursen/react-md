/* eslint-disable react/jsx-filename-extension */
import path from 'path';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import winston from 'winston';

import { API_ENDPOINT } from 'constants/application';
import { CUSTOM_THEME_ROUTE } from 'constants/colors';
import App from 'components/App';
import configureStore from './configureStore';
import api from './api';
import themes from './themes';
import renderHtmlPage from './utils/renderHtmlPage';

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // days * hours * minutes * seconds * milliseconds
const dist = path.resolve(process.cwd(), 'public');
const app = express();

app.set('etag', 'strong');
app.use(helmet({
  noCache: false,
}));
app.use(hpp());
app.use(morgan(__DEV__ ? 'dev' : 'combined'));
app.use(compression());

if (!global.__NGINX__) {
  app.use(express.static(dist, {
    maxAge: CACHE_DURATION,
  }));
}

if (__DEV__ && !global.__SERVER_ONLY__) {
  /* eslint-disable import/no-extraneous-dependencies, global-require */
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../../webpack.config')({ development: true });

  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: 'errors-only',
  }));


  app.use(webpackHotMiddleware(compiler));
}

app.use(API_ENDPOINT, api);
app.get(`/${CUSTOM_THEME_ROUTE}/*.css`, themes);

app.get('*', cookieParser(), async (req, res) => {
  if (__DEV__) {
    global.webpackIsomorphicTools.refresh();
  }

  let store;
  const context = { bundles: [] };
  try {
    if (!__SSR__) {
      res.send(renderHtmlPage(store));
      return;
    }

    store = await configureStore(req);
    const html = renderToString(
      <StaticRouter context={context} location={req.url}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    );

    if (context.url) {
      res.writeHead(301, {
        Location: context.url,
      });

      res.end();
    } else {
      res.send(renderHtmlPage(store, context.bundles, html));
    }
  } catch (e) {
    winston.error(e);
    if (__DEV__) {
      throw e;
    }

    res.send(renderHtmlPage(store, context.bundles));
  }
});

let port = process.env.NODE_PORT;
if (!port) {
  const message = 'The `NODE_PORT` environment variable has not been set. This can be done by copying '
    + 'the `.env.example` to `.env` in the docs root directory and updating the `NODE_PORT` or set an '
    + 'environment variable on your machine.';

  if (__DEV__) {
    winston.info('Defaulting `NODE_PORT` to `8080` for dev mode.');
    winston.info('It is recommended to copy the `.env.example` file to `.env` and set the `NODE_PORT` there.');
    port = 8080;
  } else {
    throw new Error(message);
  }
}

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  // This gets set during the webpack config, but it is completely possible to have no PUBLIC_URL
  // in dev mode, so set it to any address on server side by default
  global.PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:${port}`;
  if (__DEV__ && !global.__SERVER_ONLY) {
    winston.info('Starting webpack compilation...');
    winston.info(`Please wait until webpack spams your console, then you can navigate to ${global.PUBLIC_URL}`);
  } else {
    winston.info(`Started documentation server at: '${global.PUBLIC_URL}'`);
  }
});
