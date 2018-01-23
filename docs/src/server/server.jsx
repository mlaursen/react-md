import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import path from 'path';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import winston from 'winston';

import { API_ENDPOINT } from 'constants/application';
import { CUSTOM_THEME_ROUTE } from 'constants/colors';
import App from 'components/App';
import api from './api';
import themes from './themes';
import configureStore from './configureStore';
import renderHtmlPage from './utils/renderHtmlPage';

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // days * hours * minutes * seconds * milliseconds
const dist = path.resolve(process.cwd(), 'public');
const app = express();

app.use(helmet());
app.use(hpp());
app.use(morgan(__DEV__ ? 'dev' : 'combined'));
app.use(compression());

if (!global.__NGINX__) {
  app.use(express.static(dist, {
    maxAge: CACHE_DURATION,
  }));
}

app.use(API_ENDPOINT, api);
app.get(`/${CUSTOM_THEME_ROUTE}/*.css`, themes);

app.get('*', cookieParser(), async (req, res) => {
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

export default app;
