import { ROOT_PATH } from 'constants/application';
import { componentRoutes } from 'server/routes';
import { toTitle } from 'utils/strings';

const routes = [
  ...componentRoutes,
  `${ROOT_PATH}customization/colors`,
  `${ROOT_PATH}customization/themes`,
  `${ROOT_PATH}customization/typography`,
  `${ROOT_PATH}customization/media-queries`,
];

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
  routes.some((link) => {
    if (link.indexOf(ref) !== -1) {
      lastLink = link;
    }

    return lastLink;
  });

  return lastLink;
}

export function createSassDocLink({ context: { type, name, value, scope }, group }) {
  const hash = `${type}-${name}`;
  let ref = group[0].split(', ')[0];
  if (ref.match(/accessibility|collapsers|base|transitions|defaults|overlays|helper/)) {
    ref = `${ROOT_PATH}sassdoc/#${group[0]}-${hash}`;
  } else {
    ref = findLink(ref);
    ref = `${ref}?tab=${ref.match(/components|themes/) ? 2 : 1}#${hash}`;
  }

  if (value) {
    value = `${value}${scope === 'default' ? ' !default' : ''}`
      .replace(/\r?\n/g, '') // make on eline
      .replace(/ +/g, ' ') // remove additional spaces
      .replace(/(((\() )|,(\)))/g, '$3$4'); // final trimming for sass maps
  }

  return { name, type: toTitle(type), ref, value };
}

export default function getSassDocLinks(sassdocs) {
  return sassdocs.map(createSassDocLink);
}
