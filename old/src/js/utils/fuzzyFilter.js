/** @module utils/fuzzyFilter */
import React from 'react';

/**
 * This function does a simple fuzzy search of some `needle` for every
 * item in a `haystack`. It will only include items that are:
 *  - not null or undefined
 *  - valid React Components
 *  - a number or string that contains each letter/number in order ignoring case
 *  - an object's `dataLabel` value that contains each letter/number in order ignoring case.
 *
 * Example:
 * ```js
 * const haystack = ['Apple', 'Banana', 'Orange'];
 * fuzzyFilter(haystack, 'An') // ['Banana', 'Orange'];
 * fuzzyFilter(haystack, 'ae') // ['Apple']
 * ```
 *
 * @param {Array.<string|number|Object|function>} haystack - the haystack to search
 * @param {string} needle - the filter text to use.
 * @param {string=} dataLabel - the data label to use if the element is an object.
 *
 * @return {Array.<string|number|Object|function>} a filtered list.
 */
export default function fuzzyFilter(haystack, needle, dataLabel) {
  // Create an amazing regex that matches the letters in order
  // and escapes any strings that could be part of a regex.
  const reg = new RegExp(
    `${needle}`.split('')
      .join('\\w*')
      .replace(/(\(|\||\)|\\(?!w\*)|\[|\|-|\.|\^|\+|\$|\?|^(?!w)\*)/g, '\\$1')
      // Couldn't get the matching of two '*' working, so replace them here..
      .replace(/\*\*/g, '*\\*'),
    'i'
  );

  return haystack.filter(hay => {
    if (hay === null || typeof hay === 'undefined') {
      return false;
    } else if (React.isValidElement(hay)) {
      return true;
    }

    let value;
    switch (typeof hay) {
      case 'string':
      case 'number':
        value = hay.toString();
        break;
      default:
        value = hay[dataLabel];
    }

    return value && value.match(reg);
  });
}
