import express from 'express';
import { AIR_QUALITY_COLUMNS_ENDPOINT, AIR_QUALITY_DATA_ENDPOINT } from 'constants/application';
import { NOT_FOUND } from 'constants/responseCodes';
import createPaginatedRoute from 'server/utils/createPaginatedRoute';

import airQuality from 'server/databases/airQuality.json';

const airQualityRouter = express.Router();

airQualityRouter.get(AIR_QUALITY_COLUMNS_ENDPOINT, (req, res) => {
  res.json(airQuality.columns);
});
airQualityRouter.get(AIR_QUALITY_DATA_ENDPOINT, createPaginatedRoute(() => airQuality.data, false, 100));

airQualityRouter.get('*', (req, res) => {
  res.send(NOT_FOUND);
});

export default airQualityRouter;
