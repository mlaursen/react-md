/* eslint-disable new-cap */
import express from 'express';
import database from 'server/databases/sassdocs.json';

const sassdocsRouter = express.Router();

function sassdocs(req, res) {
  const { component, section } = req.params;
  const layovers = component === 'layovers';
  const helpers = section === 'helpers';
  if (!component || (section && !helpers)) {
    res.sendStatus(400);
  }

  const data = helpers && !layovers ? database[section] : database[component];
  if (!data) {
    res.sendStatus(404);
  } else {
    res.json(data);
  }
}

sassdocsRouter.get('/:section/:component', sassdocs);
sassdocsRouter.get('/:component', sassdocs);
sassdocsRouter.get('*', sassdocs);

export default sassdocsRouter;
