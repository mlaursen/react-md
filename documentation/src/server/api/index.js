/* eslint-disable new-cap */
import express from 'express';
import bodyParser from 'body-parser';
import { middleware as cache } from 'apicache';
import docgens from './docgens';
import sassdocs from './sassdocs';
import search from './search';
import github from './github';

const CACHE_DURATION = '10 days';
const apiRouter = express.Router();

apiRouter.use(cache(CACHE_DURATION));
apiRouter.use(bodyParser.urlencoded({ extended: true }));
apiRouter.use(bodyParser.json());

apiRouter.use('/docgens', docgens);
apiRouter.use('/sassdocs', sassdocs);
apiRouter.use('/search', search);
apiRouter.use('/github', github);

export default apiRouter;
