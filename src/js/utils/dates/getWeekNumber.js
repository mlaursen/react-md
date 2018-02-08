import isValidDate from './isValidDate';

/**
 * Gets the current week number within a month for a provided date. If
 * the date is invalid, -1 will be returned instead.
 *
 * @param {Date} date - The date to get a week number for.
 * @return {number} the week number with the date's month or -1.
 */
export default function getWeekNumber(date) {
  if (!isValidDate(date)) {
    return -1;
  }

  const d = new Date(date);
  d.setDate(1);

  const firstDay = d.getDay();
  const dateOffset = date.getDate() + (firstDay - 1);
  return Math.floor(dateOffset / 7) + 1;
}
