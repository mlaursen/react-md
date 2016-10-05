import formatTime from './formatTime';

/**
 * Extracts the hours, minutes, and optional time period from
 * a date time.
 *
 * @param {function} DateTimeFormat the DateTimeFormat function to use.
 * @param {string|string[]} locales the locales to use.
 * @param {Date} time the time to extract from.
 * @return {Object} an object of { hours, minutes, timePeriod }
 */
export default function extractTimeParts(DateTimeFormat, locales, time) {
  const formatted = formatTime(DateTimeFormat, locales, time);

  // IE does not like lookaheads or splitting on [^0-9]
  // it will include the non-printable characters..
  const [hours, minutes] = formatted.match(/[0-9]+/g);
  const [separator, ...remaining] = formatted.match(/[ ,.:A-z]+/g);
  let timePeriod;
  if (remaining && remaining.length) {
    timePeriod = remaining.join('').trim();
  }

  return {
    hours,
    minutes: separator + minutes,
    timePeriod,
  };
}

