import isValidDate from './isValidDate';

/**
 * Checks if a date is the month before another date without time
 *
 * @param {Date} date the date to check if it is before the other
 * @param {Date} toCompare the date to compare to
 * @return true if the date is before the other date's first day of month.
 */
export default function isMonthBefore(date, toCompare) {
  if (!isValidDate(date) || !isValidDate(toCompare)) {
    return false;
  }

  const d1 = new Date(date.getFullYear(), date.getMonth(), 1);
  const d2 = new Date(toCompare.getFullYear(), toCompare.getMonth() - 1, 1);
  return d1 > d2;
}
