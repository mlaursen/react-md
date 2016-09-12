/**
 * Capitalizes the first letter of a string.
 *
 * @param {String} s the string to capitalize.
 * @return {String} the capitalized string
 */
export function capitalizeFirst(s) {
  return s.charAt(0).toUpperCase() + s.substring(1, s.length);
}

/**
 * Creates x amount of tabs to use for code formatting.
 * A tab is two spaces.
 *
 * @param {Integer} amt the number of tabs to create.
 * @param {String} a string of spaces for the number of tabs.
 */
export function tab(amt = 1) {
  return '  '.repeat(amt);
}

/**
 * A helper function to optionally split a string with a splitter (regex/string)
 * and then join the string with a joiner while applying a function to each split.
 *
 * @param {String|Array.<String>} str the string to modify
 * @param {String|RegExp} splitter the string or regex to split the string on
 * @param {String} joiner the string to use to join with
 * @param {func} fn a function to apply to each split string.
 * @return {String} a formatted string.
 */
function strReduce(str, splitter, joiner, fn) {
  return fn(
    (Array.isArray(str) ? str : str.split(splitter))
      .reduce((reduced, s) => {
        if (reduced) {
          reduced += joiner;
        }

        s = fn(s);
        return reduced ? reduced + s : s;
      }, '')
  );
}

/**
 * Converts a string to a title by splitting on '-',
 * capitalizing each word, and then joining with a space.
 *
 * @param {String} str the string to convert to a title.
 * @return {String} the string converted to a title.
 */
export function toTitle(str) {
  return strReduce(str, '-', ' ', capitalizeFirst);
}

/**
 * Converts a space delimited string into a css class by splitting on spaces,
 * lowercasing each word, and then joining with '-'.
 *
 * @param {String} str the string to convert to a css class.
 * @param {String} a css class formatted string.
 */
export function toClassName(str) {
  return strReduce(str, ' ', '-', s => s.toLowerCase());
}


/**
 * Converts a '-' delimited str into a page name by splitting on '-',
 * capitalizing each word, and joining with the empty string.
 *
 * @param {String} str the string to convert.
 * @return {String} a page name converted string.
 */
export function toPageName(str) {
  return strReduce(str, '-', '', capitalizeFirst);
}

/**
 * Converts a '-' delimited component name into a Docgen.json
 * file name.
 *
 * @param {String} component the component string to convert.
 * @returns {String} a Docgen.json filename for the component.
 */
export function toJsonName(component) {
  let name = toTitle(component).replace(/(Selection Controls)/, '').replace(/ /g, '');

  let lastIndex = name.length;
  if (name.endsWith('es') && !name.match(/Table|Auto/)) {
    lastIndex -= 2;
  } else if (!name.match(/Progress/)) {
    lastIndex -= 1;
  }

  name = name.substring(0, lastIndex);

  return name + 'Docgen.json';
}

/**
 * Converts a path string or a full component name into a prop-type id to use
 * in the routes fuse.
 *
 * @param {String} s the string to convert
 * @return {String} a string to use for an id tag or the routes fuse search.
 */
export function toPropTypeId(s) {
  if (s.indexOf('/') !== -1) {
    s = s.replace('/components/', '')
      .split('/')
      .reduce((prev, curr) => capitalizeFirst(curr) + prev, '');
  }

  const id = s.split(/(?=[A-Z])/)
    .map(s => s.toLowerCase())
    .join('-')
    .replace(/ /g, '')
    .replace('-selection-controls', '');

  let endIndex = id.length;
  if (id.substring(id.length - 2, id.length) === 'es' && id !== 'data-tables' && id !== 'autocompletes') {
    endIndex = id.length - 2;
  } else if (id !== 'tabs' && id.charAt(id.length - 1) === 's' && id.charAt(id.length - 2) !== 's') {
    endIndex = id.length - 1;
  }

  return id.substring(0, endIndex);
}

export function getMarkdownFileName(pathname) {
  return getPageTitle(pathname).replace(/ /g, '');
}

/**
 * Gets a page title from the pathname.
 *
 * @param {String} a pathname to format
 * @return {String} the page title for the given path.
 */
export function getPageTitle(pathname) {
  const path = pathname.replace('/', '');
  if (!path) {
    return '';
  } else if (path.indexOf('components') === -1) {
    return toTitle(path.split('/').reverse()[0]);
  } else {
    return 'Components';
  }
}

export function getIdsForRoute(route) {
  const id = toPropTypeId(route.to);
  const ids = [id];
  switch (id) {
    case 'card':
      ids.push('card-action-overlay');
      ids.push('card-actions');
      ids.push('card-media');
      ids.push('card-text');
      ids.push('card-title');
      break;
    case 'floating-button':
      ids.push('speed-dial');
      break;
    case 'data-table':
      ids.push('table-body');
      ids.push('table-header');
      ids.push('table-row');
      ids.push('table-column');
      ids.push('edit-dialog-column');
      break;
    case 'list':
      ids.push('list-item');
      ids.push('list-item-control');
      break;
    case 'radio':
      ids.push('radio-group');
      break;
    case 'tab':
      ids.push('tabs');
      break;
    default:
  }

  return ids;
}


function getOneOfPropType(value, tabs) {
  const l = value.length - 1;
  const values = value.reduce((prev, curr, i) => {
    const v = prev + curr.value;
    return v + (i < l ? ',\n' + tab(tabs) : '');
  }, '\n' + tab(tabs)) + '\n' + tab(tabs - 1);

  return `oneOf([${values}])`;
}

function getOneOfTypePropType(value, tabs) {
  const l = value.length - 1;
  const values = value.reduce((prev, curr, i) => {
    const v = prev + getPropTypeString(curr, tabs + 1);
    return v + (i < l ? ',\n' + tab(tabs) : '');
  }, '\n' + tab(tabs)) + '\n' + tab(tabs - 1);

  return `oneOfType([${values}])`;
}

function getShapePropType(value, tabs) {
  const keys = Object.keys(value);
  const l = keys.length - 1;
  const values = keys.reduce((prev, key, i) => {
    const v = prev + key + ': ' + getPropTypeString(value[key], tabs);
    return v + (i < l ? ',\n' + tab(tabs) : '');
  }, '\n' + tab(tabs)) + '\n' + tab(tabs - 1);

  return `shape({${values}})`;
}

function getComputedPropType(name, value) {
  const computed = eval(value); // eslint-disable-line no-eval
  switch (name) {
    case 'enum':
      return getOneOfPropType(computed.map(v => ({ value: `'${v}'` })));
    default:
      return computed;
  }
}

function getCustomPropType(raw) {
  if (raw.match(/controlled|minNumber|maxNumber/)) {
    return raw;
  } else if (raw.match(/deprecated/)) {
    return 'deprecated';
  }

  return 'custom';
}

export function getDeprecatedReason(propName, { raw }) {
  return `The \`${propName}\` prop has been deprecated and will be removed in the next release.

${raw.split(',')[1].replace(/\)$/, '').replace(/'/g, '').trim()}
`;
}

/**
 * Converts a docgen prop type into a string.
 *
 * @param {Object} docgen The docgen object.
 * @param {Number} tabs? The current number of tabs.
 * @return {String} a formatted markdown string to represent the prop type.
 */
export function getPropTypeString({ name, value, computed, raw }, tabs = 0) {
  if (computed) {
    return getComputedPropType(name, value);
  }

  switch (name) {
    case 'union':
      return getOneOfTypePropType(value, tabs + 1);
    case 'arrayOf':
      return `${name}(${getPropTypeString(value, tabs + 1)})`;
    case 'enum':
      return getOneOfPropType(value, tabs + 1);
    case 'shape':
      return getShapePropType(value, tabs + 1);
    case 'instanceOf':
      return `${name}(${value})`;
    case 'custom':
      return getCustomPropType(raw);
    default:
      return name;
  }
}

function extractNestedPropTypeDescriptions({ name, value, description, computed }, propName, descriptions) {
  switch (name) {
    case 'shape':
      Object.keys(value).forEach(key => {
        extractNestedPropTypeDescriptions(value[key], key, descriptions);
      });
      break;
    case 'union':
      value.forEach(value => extractNestedPropTypeDescriptions(value, propName, descriptions));
      break;
    case 'arrayOf':
    case 'enum':
      extractNestedPropTypeDescriptions(value, propName, descriptions);
      break;
    default:
  }

  if (propName && description) {
    descriptions.push({
      propName,
      description,
    });
  }

  return descriptions;
}

/**
 * Takes a docgen propType and attempts to find any nested descriptions of a prop.
 * This really only happens when there is a nested shape at this time.
 *
 * @param {Object} propType The docgen propType.
 * @param {String} propName The initial propName.
 * @return {String} a markdown string to use.
 */
export function getAdditionalPropTypeDescriptions(propType, propName) {
  const descriptions = extractNestedPropTypeDescriptions(propType, propName, []);
  if (!descriptions.length) {
    return '';
  }

  return descriptions.reduce((prev, { propName, description }) => {
    return prev + `\`${propName}\`: ${description}\n\n`;
  }, '\n\n');
}
