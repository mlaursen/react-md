/**
 * Gets the last day in a month
 *
 * @param {Date} sourceDate the date to get the last day from.
 * @return a new Date as the last day of the month.
 */
export default function getLastDay(sourceDate) {
  return new Date(sourceDate.getFullYear(), sourceDate.getMonth() + 1, 0);
}
