const path = require('path');
const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const vhost = require('vhost');
const { host, port } = require('../../serverConfig.json');

const theme = require('./theme');
const proxy = require('./proxy');

const app = express();

const clientRoot = path.resolve(process.cwd(), 'dist', 'client');
app.set('view engine', 'ejs');
app.set('views', clientRoot);
app.use(compression());
app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

app.get('/themes/*.css', vhost(host, theme));
app.get('/proxy', vhost(host, proxy));

if (process.env.NODE_ENV === 'development') {
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
} else {
  const client = express.static(clientRoot, {
    maxAge: 3156000,
  });

  app.use(vhost(host, client));
  app.use(vhost(host, require('./reactMD').default));
}

app.listen(port, err => {
  if (err) {
    throw err;
  }

  console.log(`Started server on port ${port}`);
});
