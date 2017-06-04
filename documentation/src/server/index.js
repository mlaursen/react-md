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

import { CUSTOM_THEME_ROUTE } from 'constants/colors';
import { updateCustomTheme } from 'state/helmet';
import { pageNotFound } from 'state/routing';
import { getInitialState } from 'state/theme';
import { DEFAULT_STATE, handleLocationChange } from 'state/quickNav';
import { toPageTitle } from 'utils/strings';
import api from './api';
import routes from './routes';
import themes from './themes';
import renderHtmlPage from './utils/renderHtmlPage';
import configureStore from '../configureStore';

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
    noInfo: true,
    stats: { colors: true },
  }));


  app.use(webpackHotMiddleware(compiler));
}

app.use('/api', api);
app.get(`/${CUSTOM_THEME_ROUTE}/*.css`, themes);

app.get('*', cookieParser(), (req, res) => {
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
    quickNav: handleLocationChange(DEFAULT_STATE, { pathname: req.url }),
    theme: getInitialState(req.cookies),
  });

  store.dispatch(updateCustomTheme(store.getState().theme.href));
  if (routes.indexOf(req.url.replace(/\?.*/, '')) === -1) {
    store.dispatch(pageNotFound());
  }

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
