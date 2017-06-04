/* eslint-disable new-cap */
import express from 'express';
import bodyParser from 'body-parser';
import { middleware as cache } from 'apicache';
import docgens from './docgens';

const CACHE_DURATION = '10 days';
const apiRouter = express.Router();

apiRouter.use(cache(CACHE_DURATION));
apiRouter.use(bodyParser.urlencoded({ extended: true }));
apiRouter.use(bodyParser.json());

apiRouter.use('/docgens', docgens);

export default apiRouter;
