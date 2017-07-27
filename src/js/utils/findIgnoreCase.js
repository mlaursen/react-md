/** @module utils/findIgnoreCase */
import React from 'react';

/**
 * This function finds the first item in a `haystack` that starts with every
 * letter of the `value` in order. It will ignore:
 *  - null or undefined
 *  - valid React components
 *
 * @param {Array.<string|number|Object|function>} haystack - the haystack to search.
 * @param {string} value - the current value to use.
 * @param {string=} dataLabel - the object key to use to extract the comparing value.
 *
 * @return {string} the found element or the empty string.
 */
export default function findIgnoreCase(haystack, value, dataLabel) {
  const needle = value ? value.toLowerCase() : '';

  if (!needle) { return needle; }

  let suggestion = '';
  haystack.some(hay => {
    if (hay === null || typeof hay === 'undefined' || React.isValidElement(hay)) {
      return false;
    }

    const hayStr = typeof hay === 'object' ? hay[dataLabel] : hay.toString();

    if (hayStr.toLowerCase().indexOf(needle) === 0) {
      suggestion = hayStr;
    }

    return suggestion;
  });

  return suggestion;
}
