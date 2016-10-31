// const fs = require('fs');
const path = require('path');
const express = require('express');
const { parse } = require('sassdoc');
const transformSassdocVariable = require('../utils/transformSassdocVariable');
const transformSassdocFunction = require('../utils/transformSassdocFunction');

const router = express.Router();

const LOCAL_DB = {};
const GROUPS = [];
function buildLocalDB() {
  return parse(path.resolve(process.cwd(), '..', 'src', 'scss')).then(allSassDocs => {
    allSassDocs.forEach(sassdoc => {
      if (sassdoc.access === 'private') {
        return;
      }

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
      const fs = require('fs'); // eslint-disable-line global-require

      fs.writeFile(path.resolve(process.cwd(), 'sassdoc.localdb.json'), JSON.stringify(LOCAL_DB, null, '  '));
    }

    console.log('Sassdoc DB Built');
    return null;
  });
}

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (GROUPS.indexOf(id) === -1) {
    return res.sendStatus(404);
  }

  return res.json(LOCAL_DB[id]);
});

module.exports = router;
module.exports.buildLocalDB = buildLocalDB;
