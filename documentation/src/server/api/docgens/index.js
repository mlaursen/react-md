/* eslint-disable new-cap */
import express from 'express';

const docgensRouter = express.Router();

function docgens(req, res) {
  const { component, section } = req.params;
  console.log('component:', component);
  console.log('section:', section);
  if (!component) {
    res.sendStatus(400);
  } else {
    res.sendStatus(200);
  }
}

docgensRouter.get('/:section/:component', docgens);
docgensRouter.get('/:component', docgens);
docgensRouter.get('*', docgens);

export default docgensRouter;
