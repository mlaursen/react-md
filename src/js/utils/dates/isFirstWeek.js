import getWeekNumber from './getWeekNumber';

/**
 * Checks if a provided date is within the first week of its month.
 *
 * @param {Date} date - the date to check
 * @return {boolean} true if the date is within the first week.
 */
export default function isFirstWeek(date) {
  return getWeekNumber(date) === 1;
}
