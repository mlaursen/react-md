import express from 'express';
import bodyParser from 'body-parser';
import { middleware as cache } from 'apicache';

import { NOT_FOUND } from 'constants/responseCodes';
import docgens from './docgens';
import sassdocs from './sassdocs';
import search from './search';
import github from './github';
import airQuality from './airQuality';
import {
  DOCGENS_ENDPOINT,
  SASSDOCS_ENDPOINT,
  SEARCH_ENDPOINT,
  GITHUB_ENDPOINT,
  AIR_QUALITY_ENDPOINT,
} from 'constants/application';

const CACHE_DURATION = '10 days';
const apiRouter = express.Router();

apiRouter.use(cache(CACHE_DURATION));
apiRouter.use(bodyParser.urlencoded({ extended: true }));
apiRouter.use(bodyParser.json());

apiRouter.use(DOCGENS_ENDPOINT, docgens);
apiRouter.use(SASSDOCS_ENDPOINT, sassdocs);
apiRouter.use(SEARCH_ENDPOINT, search);
apiRouter.use(GITHUB_ENDPOINT, github);
apiRouter.use(AIR_QUALITY_ENDPOINT, airQuality);
apiRouter.get('*', (req, res) => {
  res.sendStatus(NOT_FOUND);
});

export default apiRouter;
