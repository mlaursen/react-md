import isValidDate from './isValidDate';

/**
 * Takes in a date and returns a new date at the specified day of week.
 *
 * Examples:
 * // to Sunday
 * - toDayOfWeek(new Date(2018, 0, 1), 0) == new Date(2017, 11, 31)
 *
 * // to Monday
 * - toDayOfWeek(new Date(2018, 0, 1), 1) == new Date(2018, 0, 1)
 *
 * @param {Date} date - The date to convert to a day of week
 * @param {number=0} dow - The day of the week to convert to
 * @return {Date} the new date set at the day of week or null if the
 *    date is invalid or false-ish.
 */
export default function toDayOfWeek(date, dow = 0) {
  if (!isValidDate(date)) {
    return null;
  }

  const d = new Date(date);
  const day = date.getDay();
  const diff = (d.getDate() - day) + dow;
  return new Date(d.setDate(diff));
}
