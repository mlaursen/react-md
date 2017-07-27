import express from 'express';
import BusBoy from 'busboy';

import { NOT_FOUND } from 'constants/responseCodes';

const fakeUploadRouter = express.Router();

fakeUploadRouter.post('/', (req, res) => {
  // A **really** terrible fake upload by using busboy to track incoming files so
  // there is some sort of progress available in the client. Don't actually do
  // anything with the files though.
  const busboy = new BusBoy({ headers: req.headers });
  busboy.on('finish', () => {
    res.writeHead(200, { Connection: 'close' });
    res.end();
  });

  req.pipe(busboy);
});

fakeUploadRouter.use('*', (req, res) => {
  res.sendStatus(NOT_FOUND);
});

export default fakeUploadRouter;
