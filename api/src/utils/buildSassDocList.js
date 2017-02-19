import routes from 'constants/routes';
import flatten from 'utils/ListUtils/flatten';
import toTitle from 'utils/StringUtils/toTitle';
import toClassName from 'utils/StringUtils/toClassName';


import createSassDocs from '../utils/createSassDocs';

/**
 * Takes a current route from the `routes` import and maps it to a link to be used
 * for the client.
 *
 * @param {String|Object} route - The current route
 * @param {String=} route.path - An optional path if the route is an object
 * @param {Array.<String|Object>} route.nestedItems - An optional list of additional routes
 *    if the route is an object.
 * @param {Array.<String>=} parents - An optional list of parent paths to be joined
 *    into the final path
 * @return {String|Array.<String>} all the routes and nested routes.
 */
function mapToLinks(route, parents = []) {
  const prefix = `${parents.length ? '/' : ''}${parents.join('/')}/`;

  if (typeof route === 'string') {
    return toClassName(`${prefix}${route}`).replace(' Helper', 's');
  }

  const { path, nestedItems } = route;
  if (nestedItems) {
    return nestedItems.map(nestedRoute => mapToLinks(nestedRoute, parents.length ? [...parents, path] : [path]));
  }

  return toClassName(`${prefix}${path}`);
}

/**
 * All the available links for sassdocs on the client.
 */
const LINKS = flatten(routes.map(route => mapToLinks(route)));

let lastLink = '';

/**
 * "Lazily" finds the link to use for a sassdoc. It attempts to match the `lastLink`,
 * but otherwise searches the `LINKS` for a match.
 *
 * @param {String} ref - the ref to match with
 * @return {String} link - the link to use for the ref.
 */
function findLink(ref) {
  if (lastLink.indexOf(ref) !== -1) {
    return lastLink;
  }

  lastLink = '';
  LINKS.some(link => {
    if (link.indexOf(ref) !== -1) {
      lastLink = link;
    }

    return lastLink;
  });

  return lastLink;
}

/**
 * Returns links for sassdoc
 *
 * @return {Object} a sassdoc link
 */
export function buildSassDocLink({ context: { type, name, value, scope }, group }) {
  const hash = `${type}-${name}`;
  let ref = group[0].split(', ')[0];
  if (ref.match(/accessibility|collapsers|base|transitions|defaults|overlays|helper/)) {
    ref = `/sassdoc/#${group[0]}-${hash}`;
  } else {
    ref = findLink(ref);
    ref = `${ref}?tab=${ref.match(/components|themes/) ? 2 : 1}#${hash}`;
  }

  if (value) {
    value = `${value}${scope === 'default' ? ' !default' : ''}`;
  }

  return { name, type: toTitle(type), ref, value };
}

/**
 * Builds and returns the list of sassdocs with links for the client.
 *
 * @return {Array.<Object>} all the sassdoc links
 */
export async function buildSassDocList() {
  return (await createSassDocs()).map(buildSassDocLink);
}
