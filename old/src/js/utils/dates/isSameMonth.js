import isSameYear from './isSameYear';

/**
 * Checks if two dates are part of the same month. This will also
 * make sure the dates are part of the same year.
 *
 * @param {Date} d1 - The first date to compare.
 * @param {Date} d2 - The second date to compare.
 * @param {boolean=false} bothNullValue - boolean for what should be returned if
 *  both values are null.
 * @return {boolean} true if both the dates are defined and part of the same year and month
 *  or if both values are null it will return the `bothNullValue`
 */
export default function isSameMonth(d1, d2, bothNullValue = false) {
  if (!d1 && !d2) {
    return bothNullValue;
  }

  return isSameYear(d1, d2, bothNullValue) && d1.getMonth() === d2.getMonth();
}
