import isValidDate from './isValidDate';

/**
 * Gets the last day in a month as a new Date.
 *
 * @param {Date} date - The date to get the last date in a month for
 * @return {Date} the last day in the month as a date object or null.
 */
export default function getLastDay(date) {
  if (!isValidDate(date)) {
    return null;
  }

  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
