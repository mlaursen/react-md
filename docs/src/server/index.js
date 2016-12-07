const path = require('path');
const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const { port } = require('../../serverConfig.json');
const helmet = require('helmet');

const theme = require('./theme');
const proxy = require('./proxy');

const app = express();

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // days * hours * minutes * seconds * milliseconds

const clientRoot = path.resolve(process.cwd(), 'dist', 'client');
const client = express.static(clientRoot, {
  maxAge: CACHE_DURATION,
});

app.set('view engine', 'ejs');
app.set('views', clientRoot);
app.use(helmet({
  noCache: false,
}));
app.use(compression());
app.use(logger(__DEV__ ? 'dev' : 'combined'));


app.get('/themes/*.css', theme);
app.get('/proxy', proxy);

if (!__DEV__ || __DEBUG_SSR__) {
  app.use(client);
  app.use(require('./reactMD').default);
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../../webpack-client.config');

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    stats: 'errors-only',
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));

  app.use(client);
  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, file) => {
      if (err) {
        next(err);
        return;
      }

      res.set('content-type', 'text/html');
      res.send(file);
      res.end();
    });
  });
}

app.listen(port, err => {
  if (err) {
    throw err;
  }

  console.log(`Started server on port ${port}`);
});
