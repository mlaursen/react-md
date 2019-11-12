/** @module utils/DateUtils/formatTime */

/**
 * Formats a date as a time string using the DateTimeFormat function and locales.
 *
 * @param {function} DateTimeFormat the DateTimeFormat function to use.
 * @param {string|string[]} locales the locales to use.
 * @param {Boolean} showSeconds boolean if seconds should be formatted
 * @param {Date} time the time to format into a string.
 * @return a string of the formatted time.
 */
export default function formatTime(DateTimeFormat, locales, showSeconds, time) {
  let format;
  if (showSeconds === true) {
    format = { hour: 'numeric', minute: '2-digit', second: '2-digit' };
  } else {
    format = { hour: 'numeric', minute: '2-digit' };
  }

  return new DateTimeFormat(locales, format).format(time);
}
