import { upperFirst } from 'lodash/string';

/**
 * Formats a string into a 'Title Cased String'.
 *
 * Examples:
 * hello-world -> Hello World
 * TableColumn -> Table Column
 *
 * @param {String} str - The string to format
 * @return {String} the title cased string.
 */
export function toTitle(str) {
  return str.split(/-|[A-Z]+/).reduce((s, split) => `${s ? `${s} ` : ''}${upperFirst(split)}`, '');
}

/**
 * Formats the current pathname into a title to use for the page.
 *
 * Example:
 * /components/pickers/date -> Date Pickers
 * /getting-started/installation -> Installation
 * /components/data-tables -> Data Tables
 *
 * @param {String} pathname - The current pathname to use
 * @return {String} the current page title for the pathname
 */
export function toPageTitle(pathname) {
  const path = pathname.replace('/', '').replace(/\?.*/, '');
  if (!path) {
    return '';
  }

  const [id, section] = path.split('/').reverse();
  if (path.match(/upgrade-guides/)) {
    return `Upgrade to ${id}`;
  } else if (section && section.match(/pickers|progress/)) {
    return toTitle(`${id}-${section}`);
  }

  return toTitle(id);
}

/**
 * Formats a string into a caterpillar-cased-string. This is really mostly helpful
 * for creating unique ids or class names.
 *
 * Example:
 * 'Hello World Stuff' -> 'hello-world-stuff'
 * 'WowzaNoWay' -> 'wowza-no-way'
 *
 * @param {String} str - the string to caterpillar-case
 * @return {String} the caterpillar-cased string.
 */
export function toCaterpillarCase(str) {
  return str.replace(/\/|\\|\[|]/g, '').split(/\s|(?=[A-Z])/).join('-').toLowerCase();
}

export function underscore(s) {
  return s.replace('-', '_');
}

export function hyphenate(s) {
  return s.replace('_', '-');
}

export function getCompiledStylesName(primary, secondary, light) {
  return `react-md.${underscore(primary)}-${underscore(secondary)}${light ? '' : '.dark'}.min.css`;
}
