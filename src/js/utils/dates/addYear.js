import isValidDate from './isValidDate';

/**
 * Adds the specified number of years to a provided date. If the date
 * is null, an invalid formatted date, or not a Date instance, null
 * will be returned instead.
 *
 * @param {Date} date - The date to update
 * @param {number} amount - The number of years to add. This can be positive
 *    or negative.
 * @return {Date} a new date with the number of years added or null.
 */
export default function addYear(date, amount) {
  if (!isValidDate(date)) {
    return null;
  }

  const d = new Date(date);
  d.setFullYear(d.getFullYear() + amount);

  return d;
}
