import path from 'path';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';

import { toPageTitle } from 'utils/strings';
import configureStore from '../state/store';
import renderHtmlPage from './utils/renderHtmlPage';

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // days * hours * minutes * seconds * milliseconds
const dist = path.resolve(process.cwd(), 'public');
const app = express();

app.use(helmet({
  noCache: false,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(hpp());
app.use(morgan(__DEV__ ? 'dev' : 'combined'));
app.use(compression());
app.use(favicon(path.join(dist, 'favicon.ico')));
app.use(express.static(dist, {
  maxAge: CACHE_DURATION,
}));

if (__DEV__) {
  /* eslint-disable import/no-extraneous-dependencies, global-require */
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../../webpack.config')({ development: true });

  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: { colors: true },
  }));


  app.use(webpackHotMiddleware(compiler));
}

app.get('*', (req, res) => {
  if (__DEV__) {
    global.webpackIsomorphicTools.refresh();
  }

  const userAgent = req.header('user-agent');
  const mobile = !!userAgent.match(/mobile/i);
  const tablet = !!userAgent.match(/ipad/i);
  const desktop = !mobile && !tablet;

  let defaultMedia = 'desktop';
  if (tablet) {
    defaultMedia = 'tablet';
  } else if (mobile) {
    defaultMedia = 'mobile';
  }

  const store = configureStore({
    media: { mobile, tablet, desktop, defaultMedia },
    drawer: {
      toolbarTitle: toPageTitle(req.url),
      toolbarProminent: !req.url.match(/minimizing/) && !!req.url.match(/components|customization/),
      visibleBoxShadow: req.url !== '/',
    },
  });

  if (!__SSR__) {
    res.send(renderHtmlPage(store));
    return;
  }

  const context = {};
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
    res.send(renderHtmlPage(store, html));
  }
});

const port = process.env.NODE_PORT;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  /* eslint-disable no-console */
  console.log(`Started documentation server on port: '${port}'`);
});
