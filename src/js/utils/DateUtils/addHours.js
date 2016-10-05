/**
 * Adds hours to a date.
 *
 * @param {Date} time the time to increment
 * @param {number} hours the number of hours to increment by.
 * @return a new Date with the new hours set.
 */
export default function addHours(time, hours) {
  const t = new Date(time.getTime());
  t.setHours(t.getHours() + hours);
  return t;
}
