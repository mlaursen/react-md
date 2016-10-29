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
const NESTED_GROUPS = [];

function toPrettyName({ component }) {
  return component.split(/(?=[A-Z])/).join('-').toLowerCase();
}

function findCustomPropTypes() {
  return readdir(path.join(JS_FOLDER, 'utils', 'PropTypes'))
    .then(files => files.filter(file => file.charAt(0) !== '_')
      .map(file => file.replace('.js', ''))
      .concat(['deprecated', 'requiredForA11y'])
    );
}

function insertSelectionControls(group, docgens) {
  // Need to group selection-control and selection-controls together while remainders are alone
  LOCAL_DB[group] = {
    'selection-control': [],
  };
  NESTED_GROUPS.push(group);
  docgens.forEach(docgen => {
    if (docgen.component.match(/selection/i)) {
      LOCAL_DB[group]['selection-control'].push(docgen)
    } else {
      const name = toPrettyName(docgen);
      LOCAL_DB[group][`${name}${name.match(/radio/) ? '' : 'e'}s`] = [docgen];
    }
  });
}
function insertIntoDB({ group, docgens }) {
  if (group.match(/selection/i)) {
    insertSelectionControls(group, docgens);
  } else if (group.match(/helpers|picker/i)) {
    LOCAL_DB[group] = {};
    NESTED_GROUPS.push(group);

    docgens.forEach(docgen => {
      const name = toPrettyName(docgen);
      LOCAL_DB[group][name] = [docgen];
    });
  } else {
    GROUPS.push(group);
    LOCAL_DB[group] = docgens;
  }
}

function findDocgenComponents() {
  return readdir(JS_FOLDER).then(files => Promise.all(
    files.filter(file => file.match(/^(?!(Transitions|FAB|Sidebar))[A-Z]/))
      .map(folder => extractReactModules(JS_FOLDER, folder)))
  );
}

function buildLocalDB() {
  return findCustomPropTypes()
    .then(customPropTypes => readdir(JS_FOLDER).then(files => {
      findDocgenComponents().then(exports => Promise.all(exports.map(e => createReactDocgen(e, customPropTypes)))).then(docgens => {
        docgens.forEach(insertIntoDB);

        if (process.env.NODE_ENV === 'development') {
          fs.writeFile(path.resolve(process.cwd(), 'docgen.localdb.json'), JSON.stringify(LOCAL_DB, null, '  '));
        }

        console.log('Built Docgens DB');
        return null;
      });
  }))
}

function findDocgen(req, res) {
  const { id, section } = req.params;
  const isNested = NESTED_GROUPS.indexOf(section) !== -1 && LOCAL_DB[section][id];
  if (GROUPS.indexOf(id) === -1 && !isNested) {
    return res.sendStatus(404);
  }

  return res.json(isNested ? LOCAL_DB[section][id] : LOCAL_DB[id]);
}

router.get('/:section/:id', findDocgen);
router.get('/:id', findDocgen);

module.exports = router;
module.exports.buildLocalDB = buildLocalDB;
