import express from 'express';
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import Promise from 'bluebird';
import { middleware as cache } from 'apicache';

import docgen, { buildLocalDB as buildDocgenDB } from './docgen';
import sassdoc, { buildLocalDB as buildSassDocDB } from './sassdoc';
import search, { buildLocalDB as buildSearchDB } from './search';
import { port, path } from './config';

const DEV = process.env.NODE_ENV === 'development';
const app = express();
const CACHE_DURATION = '10 days';

app.set('etag', 'strong');
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger(DEV ? 'dev' : 'combined'));

if (path) {
  const router = express.Router();
  router.use('/docgens', cache(CACHE_DURATION), docgen);
  router.use('/sassdocs', cache(CACHE_DURATION), sassdoc);
  router.use('/search', cache(CACHE_DURATION), search);

  app.use(path, router);
} else {
  app.use('/docgens', cache(CACHE_DURATION), docgen);
  app.use('/sassdocs', cache(CACHE_DURATION), sassdoc);
  app.use('/search', cache(CACHE_DURATION), search);
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
