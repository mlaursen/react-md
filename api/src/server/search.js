import Fuse from 'fuse.js';
import routes from 'constants/routes';
import toTitle from 'utils/StringUtils/toTitle';
import flatten from 'utils/ListUtils/flatten';
import buildSassDocList from '../utils/buildSassDocList';
import buildPropTypesList from '../utils/buildPropTypesList';

import { host, port, path } from '../../serverConfig.json';

let DB;

/**
 * Takes a current route from the `routes` import and converts every route into an `Example` or `Info`
 * route.
 *
 * @param {String|Object} route - The current route
 * @param {String=} route.path - An optional path if the route is an object
 * @param {Array.<String|Object>} route.nestedItems - An optional list of additional routes
 *    if the route is an object.
 * @param {Array.<String>=} parents - An optional list of parent paths to be joined
 *    into the final path
 * @return {Object|Array.<Object>} all the links for a given route.
 */
function mapToSearchList(route, parents = []) {
  const prefix = `${parents.length ? '/' : ''}${parents.join('/')}/`;
  const matches = prefix.match(/pickers|progress/);
  const suffix = matches ? `-${matches[0]}` : '';
  const type = prefix.indexOf('components') !== -1 ? 'Examples' : 'Info';
  if (typeof route === 'string') {
    return {
      type,
      name: toTitle(`${route}${suffix}`).replace(' Helper', 's'),
      ref: `${prefix}${route}`,
    };
  }

  const { path, primaryText, nestedItems, href } = route;
  if (nestedItems) {
    return nestedItems.map(nestedRoute => mapToSearchList(nestedRoute, parents.length ? [...parents, path] : [path]));
  }

  return {
    type: href ? 'SassDoc' : type,
    name: primaryText || toTitle(path),
    ref: href || `${prefix}${path}`,
  };
}

/**
 * Builds the local "database" of search results.
 */
export async function buildLocalDB() {
  const searchRoutes = flatten(routes.map(route => mapToSearchList(route)));
  searchRoutes.push({
    name: 'Theme Builder',
    ref: '/customization/themes?tab=1',
    type: 'Info',
  });

  const propTypes = await buildPropTypesList();
  const sassdocs = await buildSassDocList();

  const db = searchRoutes.concat(propTypes).concat(sassdocs);
  DB = new Fuse(db, {
    keys: [{ name: 'name', weight: 0.85 }, { name: 'type', weight: 0.15 }],
  });

  if (__DEV__) {
    /* eslint-disable global-require */
    const fs = require('fs');
    const nodePath = require('path');

    const fileName = nodePath.resolve(process.cwd(), 'searches.localdb.json');
    fs.writeFile(fileName, JSON.stringify(db, null, '  '), error => {
      if (error) {
        throw error;
      }

      console.log(`Wrote: ${fileName}`);
    });
  }

  console.log('Search Routes Built');
  return DB;
}

function isInt(x) {
  return !Number.isNaN(x) && x % 1 === 0;
}

/**
 * This is the main search route. A user can search the site for examples, info, prop types, or sassdoc.
 * The search results will be filtered to be in sets of 10 by default.
 *
 * To search the site:
 * - the query param `q` must be defined as a string to query with.
 * - the optional query param `start` must be a number between 0 the length of results
 * - the optional query param `limit` must be a number between 1 and 50
 *
 * If there is no `q` query param, or the validation for start and limit are incorrect, a `400` response
 * code will be returned.
 *
 * The response will contain a `meta` object and `data` list of results. The meta object will contain:
 * - the request's `start` index
 * - the request's `limit`
 * - the total number of results for the query
 * - an optional `next` link that can be used to fetch the next results in the query if there are more results
 * - an optional `previous` link that can be used to fetch the previous results in the query if the start index
 *      is greater than zero.
 *
 * The `data` list's object will have the shape of:
 * - {String} name - the name of the match. So something like Autocomplete, sassdoc variable name etc.
 * - {String} type - The type of the match. So one of 'Mixin', 'Variable', 'Prop Types', etc.
 * - {String} ref - the reference link to be used within the client to quickly change to match
 *
 * @param {Object} req - the http request
 * @param {Object} res - the http response
 */
export default function search(req, res) {
  const { q } = req.query;
  let { start, limit } = req.query;
  if (!start) {
    start = 0;
  }

  if (!limit) {
    limit = 10;
  }

  if (!q || !isInt(start) || !isInt(limit) || start < 0 || limit > 50 || limit < 1) {
    res.sendStatus(400);
    return;
  }
  start = parseInt(start, 10);
  limit = parseInt(limit, 10);

  const data = DB.search(q);

  const total = data.length;
  if (start > total) {
    res.sendStatus(400);
    return;
  }

  const url = `http://${host}${port ? `:${port}` : ''}${path || ''}/search?q=${q}`;
  let next = null;
  let previous = null;
  if (total > start + limit) {
    next = `${url}&start=${start + limit}&limit=${limit}`;
  }

  if (start + limit > limit) {
    previous = `${url}&start=${Math.max(0, start - limit)}&limit=${limit}`;
  }

  res.json({
    meta: {
      start,
      limit,
      total,
      next,
      previous,
    },
    data: data.slice(start, start + limit),
  });
}
