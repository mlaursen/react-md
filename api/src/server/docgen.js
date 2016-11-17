import fs from 'fs';
import path from 'path';
import express from 'express';
import Promise from 'bluebird';

import toClassName from 'utils/StringUtils/toClassName';
import isPrivate from '../utils/isPrivate';
import findDocgenComponents from '../utils/findDocgenComponents';
import createReactDocgen from '../utils/createReactDocgen';

const router = express.Router();
const readdir = Promise.promisify(fs.readdir);

const JS_FOLDER = path.resolve(process.cwd(), '..', 'src', 'js');

/**
 * This is the local "database" that will be built. It will contain a key/value pair
 * of a component grouping and its docgens.
 *
 * Example shape:
 *
 * ```js
 * {
 *   autocompletes: [... docgens ...],
 *   ... components ...
 *   pickers: {
 *     date: [... docgens ...],
 *     time: [... docgens ...],
 *   },
 *   ... components ...
 * }
 * ```
 */
const LOCAL_DB = {};

/**
 * This will be a list of top-level groupings of components. So things like
 * cards, pickers, autocompletes etc. It is just used for a quick check.
 */
const GROUPS = [];

/**
 * This will be a list of second-level groupings of components. So things like
 * date and time pickers.
 */
const NESTED_GROUPS = [];

function toPrettyName({ component }) {
  return toClassName(component).replace(/-(progress|picker)/, '');
}

/**
 * Finds any of my custom prop types so that it can be formatted nicely for the client.
 */
async function findCustomPropTypes() {
  const files = await readdir(path.join(JS_FOLDER, 'utils', 'PropTypes'));

  return files.filter(file => !isPrivate(file)).map(file => file.replace('.js', ''))
    .concat(['deprecated', 'requiredForA11y']);
}

/**
 * Since the selection controls do a little bit different than the other components, it was extracted
 * out into its own insert method.
 *
 * @param {String} group - This is the 'selection-controls' grouping.
 * @param {Array.<Object>} docgens - All the docgens for the selection controls grouping.
 */
function insertSelectionControls(group, docgens) {
  // Need to group selection-control and selection-controls together while remainders are alone
  LOCAL_DB[group] = {
    'selection-control': [],
  };
  NESTED_GROUPS.push(group);
  docgens.forEach(docgen => {
    if (docgen.component.match(/selection/i)) {
      LOCAL_DB[group]['selection-control'].push(docgen);
    } else {
      const name = toPrettyName(docgen);
      LOCAL_DB[group][`${name}${name.match(/radio/) ? '' : 'e'}s`] = [docgen];
    }
  });
}

/**
 * "Inserts" a docgen into the "database".
 *
 * @param {Object} docgen - The docgen to insert
 * @param {String} docgen.group - The grouping for the docgen
 * @param {Array.<Object>} docgen.docgens - The docgens for the grouping.
 */
function insertIntoDB({ group, docgens }) {
  if (group.match(/selection/i)) {
    insertSelectionControls(group, docgens);
  } else if (group.match(/helpers|picker|progress/i)) {
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

/**
 * This function basically runs the react-docgen component and then builds an in-memory database
 * that maps to the component routes. Each component will be grouped together correctly
 * and the docgen will be modified for use in the client.
 *
 * When in development mode, a "localdb" file will be created to debug the output.
 */
export async function buildLocalDB() {
  const customPropTypes = await findCustomPropTypes();
  const docgens = await findDocgenComponents().then(exports => Promise.all(exports.map(e => createReactDocgen(e, customPropTypes))));
  docgens.forEach(insertIntoDB);

  if (process.env.NODE_ENV === 'development') {
    const fileName = path.resolve(process.cwd(), 'docgen.localdb.json');
    fs.writeFile(fileName, JSON.stringify(LOCAL_DB, null, '  '), error => {
      if (error) {
        throw error;
      }

      console.log(`Wrote: ${fileName}`);
    });
  }

  console.log('Built Docgens DB');
  return null;
}

/**
 * The main function for the docgens route. Attempts to find a `/docgens/(:section/?):id`
 *
 * @param {Object} req - the http request
 * @param {Object} res - the http response
 */
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

export default router;
