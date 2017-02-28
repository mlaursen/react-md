import path from 'path';
import express from 'express';
import transformSassdocFunction from '../utils/transformSassdocFunction';
import transformSassdocVariable from '../utils/transformSassdocVariable';
import createSassDocs from '../utils/createSassDocs';

const router = express.Router();

const LOCAL_DB = {};
const GROUPS = [];

/**
 * This function basically creates the sassdocs and then converts it into an in-memory database
 * to be used from routes.
 */
export async function buildLocalDB() {
  const allSassDocs = await createSassDocs();
  allSassDocs.forEach(sassdoc => {
    sassdoc.group[0].split(', ').forEach(group => {
      if (!LOCAL_DB[group]) {
        GROUPS.push(group);
        LOCAL_DB[group] = {
          placeholders: [],
          variables: [],
          functions: [],
          mixins: [],
        };
      }

      const groupDB = LOCAL_DB[group];
      switch (sassdoc.context.type) {
        case 'placeholder':
          groupDB.placeholders.push(transformSassdocVariable(sassdoc));
          break;
        case 'function':
          groupDB.functions.push(transformSassdocFunction(sassdoc));
          break;
        case 'variable':
          groupDB.variables.push(transformSassdocVariable(sassdoc));
          break;
        case 'mixin':
          groupDB.mixins.push(transformSassdocFunction(sassdoc));
          break;
        default:
          // Do nothing
      }
    });
  });

  if (process.env.NODE_ENV === 'development') {
    if (LOCAL_DB.undefined) {
      console.error('There is undefined Sassdoc:\n', JSON.stringify(LOCAL_DB.undefined));
    }

    const fs = require('fs'); // eslint-disable-line global-require

    const fileName = path.resolve(process.cwd(), 'sassdoc.localdb.json');

    fs.writeFile(fileName, JSON.stringify(LOCAL_DB, null, '  '), error => {
      if (error) {
        throw error;
      }

      console.log(`Wrote: ${fileName}`);
    });
  }

  console.log('Sassdoc DB Built');
  return null;
}

router.get('/:id', (req, res) => {
  let { id } = req.params;
  if (id && id.match(/font-icons/)) {
    id = 'icons';
  }
  if (GROUPS.indexOf(id) === -1) {
    return res.sendStatus(404);
  }

  return res.json(LOCAL_DB[id]);
});

export default router;
