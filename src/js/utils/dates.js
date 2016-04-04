/**
 * Removes all time from a date. Only keeps year, month, and date.
 * @param {Date} date the date to strip
 * @return a new Date with the time stripped.
 */
export function stripTime(date) {
  if(!date || !(date instanceof Date)) { return null; }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Gets the last day in a month
 *
 * @param {Date} sourceDate the date to get the last day from.
 * @return a new Date as the last day of the month.
 */
export function getLastDay(sourceDate) {
  return new Date(sourceDate.getFullYear(), sourceDate.getMonth() + 1, 0);
}


/**
 * Gets a day in the week. 0 = Sunday 6 = Saturday
 *
 * @param {date} sourceDate the date to find a relative day of week from
 * @param {number} dow the day of the week to find
 * @return a new Date as the given day of week
 */
export function getDayOfWeek(sourceDate, dow = 0) {
  const date = new Date(sourceDate);
  const day = date.getDay();

  const diff = date.getDate() - day + dow;
  return new Date(date.setDate(diff));
}

/**
 * Adds a given amount to a date.
 *
 * @param {date} sourceDate the date to add
 * @param {number} amt the amount to add
 * @param {string} part the date part to add to. ['D', 'M', 'Y']
 * @return a new Date with the part added or the date if the part is not valid.
 */
export function addDate(sourceDate, amt, part) {
  const date = new Date(sourceDate);

  switch(part) {
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

/**
 * Subtracts a given amount to a date.
 *
 * @param {date} sourceDate the date to subtract
 * @param {number} amt the amount to subtract
 * @param {string} part the date part to subtract to. ['D', 'M', 'Y']
 * @return a new Date with the part subtracted or the date if the part is not valid.
 */
export function subtractDate(sourceDate, amt, part) {
  return addDate(sourceDate, -amt, part);
}

export const DateTimeFormat = (() => {
  if(typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat !== 'undefined') {
    return Intl.DateTimeFormat;
  }

  // (locales, options)
  return () => date => date;
})();

/**
 * Checks if a date is the month before another date without time
 *
 * @param {Date} date the date to check if it is before the other
 * @param {Date} toCompare the date to compare to
 * @return true if the date is before the other date's first day of month.
 */
export function isMonthBefore(date, toCompare) {
  if(!date || !toCompare) { return false; }

  const d1 = stripTime(new Date(date.getFullYear(), date.getMonth(), 1));
  const d2 = stripTime(new Date(toCompare.getFullYear(), toCompare.getMonth() - 1, 1));
  return d1 > d2;
}

/**
 * Formats a date as a time string using the DateTimeFormat function and locales.
 *
 * @param {function} DateTimeFormat the DateTimeFormat function to use.
 * @param {string|string[]} locales the locales to use.
 * @param {Date} time the time to format into a string.
 * @return a string of the formatted time.
 */
export function getTimeString(DateTimeFormat, locales, time) {
  return new DateTimeFormat(locales, { hour: 'numeric', minute: '2-digit' }).format(time);
}

/**
 * Extracts the hours, minutes, and optional time period from
 * a date time.
 *
 * @param {function} DateTimeFormat the DateTimeFormat function to use.
 * @param {string|string[]} locales the locales to use.
 * @param {Date} time the time to extract from.
 * @return an object of { hours, minutes, timePeriod }
 */
export function extractTimeParts(DateTimeFormat, locales, time) {
  const formatted = getTimeString(DateTimeFormat, locales, time);

  // IE does not like lookaheads or splitting on [^0-9]
  // it will include the non-printable characters..
  const [hours, minutes] = formatted.match(/[0-9]+/g);
  const [separator, ...remaining] = formatted.match(/[ ,.:A-z]+/g);
  let timePeriod;
  if(remaining && remaining.length) {
    timePeriod = remaining.join('').trim();
  }

  return {
    hours,
    minutes: separator + minutes,
    timePeriod,
  };
}

/**
 * Adds hours to a date.
 *
 * @param {Date} time the time to increment
 * @param {number} hours the number of hours to increment by.
 * @return a new Date with the new hours set.
 */
export function addHours(time, hours) {
  const t = new Date(time.getTime());
  t.setHours(t.getHours() + hours);
  return t;
}

/**
 * Subtracts hours to a date.
 *
 * @param {Date} time the time to increment
 * @param {number} hours the number of hours to decrement by.
 * @return a new Date with the new hours set.
 */
export function subtractHours(time, hours) {
  return addHours(time, -hours);
}
