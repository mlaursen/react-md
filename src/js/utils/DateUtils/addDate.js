
/**
 * Adds a given amount to a date.
 *
 * @param {date} sourceDate the date to add
 * @param {number} amt the amount to add
 * @param {string} part the date part to add to. ['D', 'M', 'Y']
 * @return a new Date with the part added or the date if the part is not valid.
 */
export default function addDate(sourceDate, amt, part) {
  const date = new Date(sourceDate);

  switch (part) {
    case 'D':
      return new Date(date.setDate(date.getDate() + amt));
    case 'M':
      return new Date(date.setMonth(date.getMonth() + amt));
    case 'Y':
      return new Date(date.setFullYear(date.getFullYear() + amt));
    default:
      return date;
  }
}
