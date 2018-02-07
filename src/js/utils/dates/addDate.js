import addDay from './addDay';
import addMonth from './addMonth';
import addYear from './addYear';

/**
 * Adds a given amount to a date.
 *
 * @param {Date} sourceDate - The date to add
 * @param {number} amount - The amount to add
 * @param {string} part - The date part to add to. ['D', 'M', 'Y']
 * @param {number=1} newMonthDate - An optional date to set in the new month
 *    if the new month does not have the old date. This only applies to month
 *    addition.
 * @return a new Date with the part added or the date if the part is not valid.
 */
export default function addDate(sourceDate, amount, part, newMonthDate) {
  switch (part) {
    case 'D':
      return addDay(sourceDate, amount);
    case 'M':
      return addMonth(sourceDate, amount, newMonthDate);
    case 'Y':
      return addYear(sourceDate, amount);
    default:
      return sourceDate;
  }
}
