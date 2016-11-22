import express from 'express';
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import { middleware as cache } from 'apicache';

import docgen, { buildLocalDB as buildDocgenDB } from './docgen';
import sassdoc, { buildLocalDB as buildSassDocDB } from './sassdoc';
import search, { buildLocalDB as buildSearchDB } from './search';
import { port, path } from '../../serverConfig.json';

const app = express();

app.disable('x-powered-by');
app.set('etag', 'strong');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger(__DEV__ ? 'dev' : 'combined'));

if (__DEV__ && path) {
  const router = express.Router();
  router.use('/docgens', cache('5 minutes'), docgen);
  router.use('/sassdocs', cache('5 minutes'), sassdoc);
  router.use('/search', cache('5 minutes'), search);

  app.use(path, router);
} else {
  app.use('/docgens', cache('5 minutes'), docgen);
  app.use('/sassdocs', cache('5 minutes'), sassdoc);
  app.use('/search', cache('5 minutes'), search);
}

(async () => {
  await Promise.all([buildDocgenDB(), buildSassDocDB(), buildSearchDB()]);

  app.listen(port, err => {
    if (err) {
      throw err;
    }

    console.log(`Listening to api calls on port ${port}`);
  });
})();
