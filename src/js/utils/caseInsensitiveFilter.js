/** @module utils/caseInsensitiveFilter */
import React from 'react';

/**
 * This function does a simple ignore case search of some `filterText` for every
 * item in a `haystack`. It will only include items that are:
 *  - not null or undefined
 *  - valid React Components
 *  - a number or string that contains each letter/number in exact order ignoring case
 *  - an object's `dataLabel` value that contains each letter/number in exact order ignoring case.
 *
 * Example:
 *
 * ```js
 * const haystack = ['Apple', 'Banana', 'Orange'];
 * caseInsensitiveFilter(haystack, 'An') // ['Banana', 'Orange'];
 * caseInsensitiveFilter(haystack, 'ae') // []
 * ```
 *
 * @param {Array.<string|number|Object|function>} haystack - the haystack to search
 * @param {string} filterText - the filter text to use.
 * @param {string=} dataLabel - the data label to use if the element is an object.
 *
 * @return {Array.<string|number|Object|function>} a filtered list.
 */
export default function caseInsensitiveFilter(haystack, filterText, dataLabel) {
  const needle = filterText.toLowerCase();

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

    return value && value.toLowerCase().indexOf(needle) !== -1;
  });
}
