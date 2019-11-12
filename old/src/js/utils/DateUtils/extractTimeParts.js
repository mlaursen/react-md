/** @module utils/DateUtils/extractTimeParts */
import formatTime from './formatTime';

/**
 * Extracts the hours, minutes, and optional time period from
 * a date time.
 *
 * @param {function} DateTimeFormat the DateTimeFormat function to use.
 * @param {string|string[]} locales the locales to use.
 * @param {Boolean} showSeconds boolean if seconds should be extracted
 * @param {Date} time the time to extract from.
 * @return {Object} an object of { hours, minutes, timePeriod }
 */
export default function extractTimeParts(DateTimeFormat, locales, showSeconds, time) {
  let hours;
  let minutes;
  let seconds;
  let minuteSeparator;
  let secondSeparator;
  let remaining;
  const formatted = formatTime(DateTimeFormat, locales, showSeconds, time);
  // IE does not like lookaheads or splitting on [^0-9]
  // it will include the non-printable characters..

  if (showSeconds === true) {
    [hours, minutes, seconds] = formatted.match(/[0-9]+/g);
    [minuteSeparator, secondSeparator, ...remaining] = formatted.match(/[ ,.:A-z]+/g);
  } else {
    [hours, minutes] = formatted.match(/[0-9]+/g);
    [minuteSeparator, ...remaining] = formatted.match(/[ ,.:A-z]+/g);
  }

  let timePeriod;
  if (remaining && remaining.length) {
    timePeriod = remaining.join('').trim();
  }

  if (showSeconds === true) {
    return {
      hours,
      minutes: minuteSeparator + minutes,
      seconds: secondSeparator + seconds,
      timePeriod,
    };
  }

  return {
    hours,
    minutes: minuteSeparator + minutes,
    timePeriod,
  };
}

