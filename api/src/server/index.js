const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const vhost = require('vhost');

const docgen = require('./docgen');
const sassdoc = require('./sassdoc');
const { port, host, path } = require('../../serverConfig.json');

const DEV = process.env.NODE_ENV === 'development';

const app = express();

app.disable('x-powered-by');
app.set('etag', 'strong');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger(DEV ? 'dev' : 'combined'));

if (path) {
  const router = express.Router();
  router.use('/docgens', vhost(host, docgen));
  router.use('/sassdocs', vhost(host, sassdoc));

  app.use('/api', router);
} else {

  app.use('/docgens', vhost(host, docgen));
  app.use('/sassdocs', vhost(host, sassdoc));
}


Promise.all([docgen.buildLocalDB(), sassdoc.buildLocalDB()]).then(() => {
  app.listen(port, err => {
    if (err) {
      throw err;
    }

    console.log(`Listening to api calls on port ${port}`);
  });
});

