/* eslint-disable new-cap */
import express from 'express';
import { BAD_REQUEST, NOT_FOUND } from 'constants/responseCodes';
import database from 'server/databases/sassdocs.json';

const sassdocsRouter = express.Router();

function sassdocs(req, res) {
  const { section } = req.params;
  let { component } = req.params;
  if (component === 'font-icons') {
    component = 'icons';
  }

  const layovers = component === 'layovers';
  const helpers = section === 'helpers';
  if (!component || (section && !helpers)) {
    res.sendStatus(BAD_REQUEST);
    return;
  }

  const data = helpers && !layovers ? database[section] : database[component];
  if (!data) {
    res.sendStatus(NOT_FOUND);
  } else {
    res.json(data);
  }
}

sassdocsRouter.get('/:section/:component', sassdocs);
sassdocsRouter.get('/:component', sassdocs);
sassdocsRouter.get('*', sassdocs);

export default sassdocsRouter;
