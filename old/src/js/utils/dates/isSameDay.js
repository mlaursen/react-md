import isSameMonth from './isSameMonth';

/**
 * Checks if two dates are part of the same date. This will also
 * make sure the dates are part of the same year and month.
 *
 * @param {Date} d1 - The first date to compare.
 * @param {Date} d2 - The second date to compare.
 * @param {boolean=false} bothNullValue - boolean for what should be returned if
 *  both values are null.
 * @return {boolean} true if both the dates are defined and part of the same year, month, and day
 *  or if both values are null it will return the `bothNullValue`.
 */
export default function isSameDay(d1, d2, bothNullValue = false) {
  if (!d1 && !d2) {
    return bothNullValue;
  }

  return isSameMonth(d1, d2, bothNullValue) && d1.getDate() === d2.getDate();
}
