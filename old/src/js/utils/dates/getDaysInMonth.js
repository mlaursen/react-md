import getLastDay from './getLastDay';

/**
 * Gets the number of days in a month for the provided date.
 *
 * @param {Date} date - The date to get the number of days for
 * @return {number} the number of days in the month or -1 if it is false-ish
 *    or an invalid date object.
 */
export default function getDaysInMonth(date) {
  const day = getLastDay(date);
  return day === null ? -1 : day.getDate();
}
