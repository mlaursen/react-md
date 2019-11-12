import getWeekNumber from './getWeekNumber';

/**
 * Checks if a provided date is the last week within its month.
 *
 * @param {Date} date - the date to check
 * @return {boolean} true if the date is within the last week within its month.
 */
export default function isLastWeek(date) {
  const weekNumber = getWeekNumber(date);
  if (weekNumber === -1) {
    return false;
  }

  const d = new Date(date);
  d.setDate(1);

  const firstDay = d.getDay();
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const weeksInMonth = Math.ceil((firstDay + lastDay) / 7);
  return weeksInMonth === weekNumber;
}
