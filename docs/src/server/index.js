import path from 'path';
import express from 'express';
import compression from 'compression';
import vhost from 'vhost';
import logger from 'morgan';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd(), 'dist', 'client'));

app.use(compression());

const clientRoot = path.resolve(process.cwd(), 'dist', 'client');
const client = express.static(clientRoot, {
  maxAge: 3156000,
});


let port = process.env.PORT || 8080;
if (process.env.NODE_ENV === 'production') {
  port = 80;
  app.use(logger('combined'));
  app.use(vhost('localhost'), client);
  app.use('/*', vhost('localhost'), require('./react-md').default);
} else {
  const fallback = require('express-history-api-fallback');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../../webpack-dev.client.config');

  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    stats: 'errors-only',
    publicPath: config.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler));

  app.use(logger('dev'));
  app.use(client);
  app.use(fallback('index.html', { root: clientRoot }));
}

app.listen(port, err => {
  if (err) {
    throw err;
  }

  console.log(`Started server on port ${port}`);
});
