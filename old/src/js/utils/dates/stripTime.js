import isValidDate from './isValidDate';

/**
 * Removes all the time parts (hours, minutes, seconds, milliseconds) from a date.
 * The hour of the stripped time is set to 1 by default to help with cross-browser
 * date implementations and how hour 0 sometimes is the previous day.
 *
 * @param {Date} date the date to strip
 * @param {number=0} hours - the fake hours to set for the stripped time date.
 * @return a new Date with the time stripped.
 */
export default function stripTime(date, hours = 0) {
  if (!isValidDate(date)) {
    return null;
  }

  const d = new Date(date);
  d.setHours(hours, 0, 0, 0);

  return d;
}
