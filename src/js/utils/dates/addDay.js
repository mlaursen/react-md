import isValidDate from './isValidDate';

/**
 * Adds the specified number of days to a provided date. If the date
 * is null, an invalid formatted date, or not a Date instance, null
 * will be returned instead.
 *
 * @param {Date} sourceDate - The date to update
 * @param {number} amount - The number of days to add. This can be positive
 *    or negative.
 * @return {Date} a new date with the number of days added or null.
 */
export default function addDay(sourceDate, amount) {
  if (!isValidDate(sourceDate)) {
    return null;
  }
  const d = new Date(sourceDate);
  d.setDate(d.getDate() + amount);

  return d;
}
