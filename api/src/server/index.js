const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const bodyParser = require('body-parser');
const sassdoc = require('./sassdoc');
const docgen = require('./docgen');
const Promise = require('bluebird');
const config = require('../../serverConfig.json');

const { port } = config;

const app = express();
const router = express.Router();

app.disable('x-powered-by');
app.set('etag', 'strong');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.use('/docgens', docgen);
router.use('/sassdocs', sassdoc);

app.use('/api', router);

Promise.all([docgen.buildLocalDB(), sassdoc.buildLocalDB()]).then(() => {
  app.listen(port, err => {
    if (err) {
      throw err;
    }

    console.log(`Listening to api calls on port ${port}`);
  });
});

