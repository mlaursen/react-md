'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripTime = stripTime;
exports.getLastDay = getLastDay;
exports.getDayOfWeek = getDayOfWeek;
exports.addDate = addDate;
exports.subtractDate = subtractDate;
exports.isMonthBefore = isMonthBefore;
exports.getTimeString = getTimeString;
exports.addHours = addHours;
exports.subtractHours = subtractHours;
/**
 * Removes all time from a date. Only keeps year, month, and date.
 * @param {date} date the date to strip
 * @return a new Date with the time stripped.
 */
function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Gets the last day in a month
 *
 * @param {date} sourceDate the date to get the last day from.
 * @return a new Date as the last day of the month.
 */
function getLastDay(sourceDate) {
  return new Date(sourceDate.getFullYear(), sourceDate.getMonth() + 1, 0);
}

/**
 * Gets a day in the week. 0 = Sunday 6 = Saturday
 *
 * @param {date} sourceDate the date to find a relative day of wek from
 * @param {number} dow the day of the week to find
 * @return a new Date as the given day of week
 */
function getDayOfWeek(sourceDate) {
  var dow = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  var date = new Date(sourceDate);
  var day = date.getDay();

  var diff = date.getDate() - day + dow;
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
function addDate(sourceDate, amt, part) {
  var date = new Date(sourceDate);

  switch (part) {
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
function subtractDate(sourceDate, amt, part) {
  return addDate(sourceDate, -amt, part);
}

var DateTimeFormat = exports.DateTimeFormat = function () {
  if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat !== 'undefined') {
    return Intl.DateTimeFormat;
  }

  // (locales, options)
  return function () {
    return function (date) {
      return date;
    };
  };
}();

/**
 * Checks if a date is the month before another date without time
 *
 * @param {date} date the date to check if it is before the other
 * @param {date} toCompare the date to compare to
 * @return true if the date is before the other date's first day of month.
 */
function isMonthBefore(date, toCompare) {
  if (!date || !toCompare) {
    return false;
  }

  var d1 = stripTime(new Date(date.getFullYear(), date.getMonth(), 1));
  var d2 = stripTime(new Date(toCompare.getFullYear(), toCompare.getMonth() - 1, 1));
  return d1 > d2;
}

function getTimeString(DateTimeFormat, locales, time) {
  return new DateTimeFormat(locales, { hour: 'numeric', minute: '2-digit' }).format(time);
}

function addHours(time, hours) {
  var t = new Date(time.getTime());
  t.setHours(t.getHours() + hours);
  return t;
}

function subtractHours(time, hours) {
  return addHours(time, -hours);
}