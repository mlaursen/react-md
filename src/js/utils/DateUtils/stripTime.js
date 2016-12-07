/**
 * Removes all time from a date. Only keeps year, month, and date.
 * @param {Date} date the date to strip
 * @return a new Date with the time stripped.
 */
export default function stripTime(date) {
  if (!date || !(date instanceof Date)) {
    return null;
  }

  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
