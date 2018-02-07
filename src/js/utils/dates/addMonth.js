import isValidDate from './isValidDate';
import getDaysInMonth from './getDaysInMonth';


/**
 * Adds the specified number of months to a provided date. If the date
 * is null, an invalid formatted date, or not a Date instance, null
 * will be returned instead.
 *
 * When a new month is returned, it will make sure that the date matches
 * the date in the old month if possible, if the new month does not have
 * include the new date, the `newMonthDate` will be used instead.
 *
 * @param {Date} date - The date to update
 * @param {number} amount - The number of months to add. This can be positive
 *    or negative.
 * @param {number=1} newMonthDate - An optional date to set in the new month
 *    if the new month does not have the old date.
 * @return {Date} a new date with the number of days added or null.
 */
export default function addMonth(date, amount, newMonthDate) {
  if (!isValidDate(date)) {
    return null;
  } else if (amount === 0) {
    return new Date(date);
  }

  if (!newMonthDate) { // 0 is invalid for this case
    newMonthDate = date.getDate();
  }

  const d = new Date(date);
  d.setDate(1); // reset to first day to prevent month overflows
  d.setMonth(d.getMonth() + amount);

  if (newMonthDate !== 1 && newMonthDate <= getDaysInMonth(d)) {
    // set the date back to the correct day if it still exists within the month
    d.setDate(newMonthDate);
  }

  return d;
}
