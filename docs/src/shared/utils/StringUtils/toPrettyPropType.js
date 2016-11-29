/* eslint-disable no-use-before-define */
/* This should probably be a parser instead of shitty regex.. */

/**
 * Makes 0 to many tabs as two spaces.
 *
 * spaces > tabs // suckers
 *
 * @param {Number} tabs - The number of tabs to create.
 * @return {String} a tab-spaced string
 */
function tab(tabs) {
  if (tabs <= 0) {
    return '';
  }

  return [...new Array(tabs)].reduce(s => `${s}  `, '');
}

/**
 * Formats the `oneOf([ ... ])` prop type.
 *
 * @param {String} value - The current prop type's value to format.
 * @param {Number} tabs - the current number of tabs
 * @return {String} a pretty string!
 */
function formatOneOf(value, tabs) {
  const values = value.substring(value.indexOf('[') + 1, value.lastIndexOf(']'))
    .split(', ')
    .reduce((vs, v) => `${vs}${tab(tabs + 1)}${toPrettyPropType(v, tabs + 1)},\n`, '');

  return value.replace(/ /g, '')
    .replace(/(\[.*])/, `[\n${values}${tab(tabs)}]`);
}

/**
 * Formats the `oneOfType([ ... ])` prop type.
 *
 * @param {String} value - The current prop type's value to format.
 * @param {Number} tabs - the current number of tabs
 * @return {String} a pretty string!
 */
function formatOneOfType(value, tabs) {
  const types = value.substring(value.indexOf('[') + 1, value.lastIndexOf(']'))
    // I'm so good at regex. So beautiful
    .split(/((?!\(|\[)(number|string|object|bool|custom|func|element|node|instanceOf),)|((arrayOf|oneOf).+\)|shape.+}\))/)
    // Clean up terrible regex by removing bad matches or empty strings
    .filter(t => !!t && !t.match(/,$/) && !!t.trim() && !t.match(/^(arrayOf|oneOf)$/))
    // If the match someone started with ', ${type}', remove the precending ', '
    .reduce((vs, v) => `${vs}${tab(tabs + 1)}${toPrettyPropType((v.indexOf(',') === 0 ? v.replace(', ', '') : v).trim(), tabs + 1)},\n`, '');

  return `oneOfType([\n${types}${tab(tabs)}])`;
}

/**
 * Formats the `arrayOf( ... )` prop type.
 *
 * @param {String} value - The current prop type's value to format.
 * @param {Number} tabs - the current number of tabs
 * @return {String} a pretty string!
 */
function formatArrayOf(value, tabs) {
  const inner = value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
  return `arrayOf(${toPrettyPropType(inner, tabs)})`;
}

/**
 * Extracts a `key`, `value`, and `remaining` string from a shape's value.
 *
 * Will probably need more testing of special shapes.
 *
 * @param {String} shapeValue - The current shape's value or remaining
 *    string.
 * @return {Object} an object containing the current key, value, and remaining string
 *    of the shape's value.
 */
function extractShapeKey(shapeValue) {
  const i = shapeValue.indexOf(': ') + 2;
  const key = shapeValue.substring(0, i);
  let value = '';
  let remaining = shapeValue.substring(i);
  if (isPrimitiveType(remaining)) {
    value = remaining.substring(0, remaining.indexOf(',') + 1);
    remaining = remaining.substring(value.length);
  } else if (remaining.match(/^oneOf/)) {
    value = remaining.substring(0, remaining.indexOf(']') + 3);
    remaining = remaining.substring(value.length);
  }

  return { key, value, remaining };
}

/**
 * Formats the `shape({ ... })` prop type.
 *
 * @param {String} value - The current prop type's value to format.
 * @param {Number} tabs - the current number of tabs
 * @return {String} a pretty string!
 */
function formatShape(value, tabs) {
  const keys = [];
  const values = [];
  let remaining = value.substring(value.indexOf(' ') + 1, value.lastIndexOf('}'));
  while (remaining) {
    const extracted = extractShapeKey(remaining);
    keys.push(extracted.key.trim());
    values.push(extracted.value);
    remaining = extracted.remaining;
  }

  const shape = keys.reduce((all, key, i) => `${all}${tab(tabs + 1)}${key} ${toPrettyPropType(values[i], tabs + 1)}\n`, '');

  return `shape({\n${shape}${tab(tabs)}})`;
}

function isPrimitiveType(type) {
  return !!type.match(/^(number|string|object|bool|custom|deprecated|func|element|node|instanceOf)/);
}

function isOneOf(type) {
  return !!type.match(/^oneOf\(/);
}

function isOneOfType(type) {
  return !!type.match(/^oneOfType/);
}

function isArrayOf(type) {
  return !!type.match(/^arrayOf/);
}

function isShape(type) {
  return !!type.match(/^shape/);
}

/**
 * Takes in a one line string or an already formatted string and prettifies it.. Terribly.
 *
 * Basically:
 *
 * ```js
 * shape({ hello: string, world: arrayOf(string) })
 * ```
 *
 * to
 *
 * ```js
 * shape({
 *   hello: string,
 *   world: arrayOf(string),
 * }),
 * ```
 *
 * This handles some neested structures. But the nested shapes are bit iffy still. Will probably
 * have to update that at some point.
 *
 * @param {String} type - The prop type to prettify.
 * @param {Number=} tabs - The current number of tabs to format with.
 * @return {String} a pretty prop type string!
 */
export default function toPrettyPropType(type, tabs = 0) {
  if (type.match(/\r?\n/) || isPrimitiveType(type)) {
    return type;
  } else if (isOneOf(type)) {
    return formatOneOf(type, tabs);
  } else if (isOneOfType(type)) {
    return formatOneOfType(type, tabs);
  } else if (isArrayOf(type)) {
    return formatArrayOf(type, tabs);
  } else if (isShape(type)) {
    return formatShape(type, tabs);
  }

  return type;
}
