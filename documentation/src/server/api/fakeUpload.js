import express from 'express';
import fs from 'fs';
import path from 'path';
import guid from 'uuid/v1';

import { OK, BAD_REQUEST, NOT_FOUND } from 'constants/responseCodes';

const fakeUploadRouter = express.Router();
const databases = path.resolve(process.cwd(), 'src', 'server', 'databases');

fakeUploadRouter.post('/', (req, res) => {
  console.log('req.body:', JSON.stringify(req.body, null, 2));
  if (!req.files || !req.files.file) {
    res.sendStatus(BAD_REQUEST);
    return;
  }

  const fileName = path.join(databases, `${guid()}`);
  const stream = fs.createWriteStream(fileName);
  const total = req.headers['content-length'];
  console.log('total:', total);

  req.on('data', (chunk) => {
    console.log('chunk:', chunk);
  });

  req.on('done', (...args) => {
    console.log('args:', args);
    res.sendStatus(OK);
  });

  req.pipe(stream);
  res.writeHead(200);
});

fakeUploadRouter.use('*', (req, res) => {
  res.sendStatus(NOT_FOUND);
});

export default fakeUploadRouter;
