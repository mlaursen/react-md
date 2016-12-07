/**
 * Gets a day in the week. 0 = Sunday 6 = Saturday
 *
 * @param {date} sourceDate the date to find a relative day of week from
 * @param {number} dow the day of the week to find
 * @return a new Date as the given day of week
 */
export default function getDayOfWeek(sourceDate, dow = 0) {
  const date = new Date(sourceDate);
  const day = date.getDay();

  const diff = date.getDate() - day + dow;
  return new Date(date.setDate(diff));
}
