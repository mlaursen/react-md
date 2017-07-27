/* eslint-disable import/prefer-default-export */
import qs from 'qs';

/**
 * Utility function for getting the current tab number from the query parameters.
 * If the tab is less than 1, greater than 2, or not a number, null will be returned.
 *
 * @param {String} search - The current search query.
 * @return {Number} the tab number or null.
 */
export function getTab(search) {
  let tab = null;
  if (search) {
    tab = parseInt(qs.parse(search.replace('?', '')).tab, 10);
  }

  if (tab < 1 || tab > 2 || Number.isNaN(tab)) {
    tab = null;
  }

  return tab;
}
