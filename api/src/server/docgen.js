const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const express = require('express');

const createReactDocgen = require('../utils/createReactDocgen');
const extractReactModules = require('../utils/extractReactModules');

const router = express.Router();

const readdir = Promise.promisify(fs.readdir);

const JS_FOLDER = path.resolve(process.cwd(), '..', 'src', 'js');

const LOCAL_DB = {};
const GROUPS = [];

function buildLocalDB() {
  return readdir(JS_FOLDER).then(files => {
    Promise.all(
      files.filter(file => file.match(/^(?!(Transitions|FAB))[A-Z]/))
        .map(folder => extractReactModules(JS_FOLDER, folder))
    ).then(exports => Promise.all(exports.map(createReactDocgen))).then(docgens => {
      docgens.forEach(({ group, docgens }) => {
        LOCAL_DB[group] = docgens;
        GROUPS.push(group);
      });

      if (process.env.NODE_ENV === 'development') {
        fs.writeFile(path.resolve(process.cwd(), 'docgen.localdb.json'), JSON.stringify(LOCAL_DB, null, '  '));
      }

      console.log('Built Docgens DB');
      return null;
    });
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
