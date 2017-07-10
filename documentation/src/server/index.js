/* eslint-disable react/jsx-filename-extension */
import path from 'path';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import winston from 'winston';

import { API_ENDPOINT } from 'constants/application';
import { CUSTOM_THEME_ROUTE } from 'constants/colors';
import configureStore from './configureStore';
import api from './api';
import themes from './themes';
import renderHtmlPage from './utils/renderHtmlPage';

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // days * hours * minutes * seconds * milliseconds
const dist = path.resolve(process.cwd(), 'public');
const app = express();

app.use(helmet({
  noCache: false,
}));
app.use(hpp());
app.use(morgan(__DEV__ ? 'dev' : 'combined'));
app.use(compression());
app.use(favicon(path.join(dist, 'favicon.ico')));
app.use(express.static(dist, {
  maxAge: CACHE_DURATION,
}));

if (__DEV__ && !global.__SERVER_ONLY) {
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
    store = await configureStore(req);

    if (!__SSR__) {
      res.send(renderHtmlPage(store));
      return;
    }

    const App = require('components/App').default;

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

const port = process.env.NODE_PORT;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  winston.info(`Started documentation server on port: '${port}'`);
  if (__DEV__ && !global.__SERVER_ONLY) {
    winston.info('Starting webpack compilation...');
    winston.info(`Please wait until webpack spams your console, then you can navigate to http://localhost:${port}`);
  }
});
