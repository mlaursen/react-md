/* eslint-disable new-cap */
import express from 'express';
import { difference } from 'lodash/array';
import { BAD_REQUEST, NOT_FOUND } from 'constants/responseCodes';
import { NESTED_GROUPS } from 'server/constants';
import database from 'server/databases/docgens.json';

const GROUPS = difference(Object.keys(database), NESTED_GROUPS);
const docgensRouter = express.Router();

function docgens(req, res) {
  const { component, section } = req.params;
  const nested = section && NESTED_GROUPS.indexOf(section) !== -1 && database[section][component];
  const data = nested || database[component];
  if (!component) {
    return res.sendStatus(BAD_REQUEST);
  } else if (GROUPS.indexOf(component) === -1 && !data) {
    return res.sendStatus(NOT_FOUND);
  }

  return res.json(data);
}

docgensRouter.get('/:section/:component', docgens);
docgensRouter.get('/:component', docgens);
docgensRouter.get('*', docgens);

export default docgensRouter;
