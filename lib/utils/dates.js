'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.stripTime = stripTime;
exports.getLastDay = getLastDay;
exports.getDayOfWeek = getDayOfWeek;
exports.addDate = addDate;
exports.subtractDate = subtractDate;
exports.isMonthBefore = isMonthBefore;
exports.getTimeString = getTimeString;
exports.extractTimeParts = extractTimeParts;
exports.addHours = addHours;
exports.subtractHours = subtractHours;

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

/**
 * Removes all time from a date. Only keeps year, month, and date.
 * @param {Date} date the date to strip
 * @return a new Date with the time stripped.
 */
function stripTime(date) {
  if (!date || !(date instanceof Date)) {
    return null;
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Gets the last day in a month
 *
 * @param {Date} sourceDate the date to get the last day from.
 * @return a new Date as the last day of the month.
 */
function getLastDay(sourceDate) {
  return new Date(sourceDate.getFullYear(), sourceDate.getMonth() + 1, 0);
}

/**
 * Gets a day in the week. 0 = Sunday 6 = Saturday
 *
 * @param {date} sourceDate the date to find a relative day of week from
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
 * @param {Date} date the date to check if it is before the other
 * @param {Date} toCompare the date to compare to
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

/**
 * Formats a date as a time string using the DateTimeFormat function and locales.
 *
 * @param {function} DateTimeFormat the DateTimeFormat function to use.
 * @param {string|string[]} locales the locales to use.
 * @param {Date} time the time to format into a string.
 * @return a string of the formatted time.
 */
function getTimeString(DateTimeFormat, locales, time) {
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
function extractTimeParts(DateTimeFormat, locales, time) {
  var formatted = getTimeString(DateTimeFormat, locales, time);

  // IE does not like lookaheads or splitting on [^0-9]
  // it will include the non-printable characters..

  var _formatted$match = formatted.match(/[0-9]+/g);

  var _formatted$match2 = _slicedToArray(_formatted$match, 2);

  var hours = _formatted$match2[0];
  var minutes = _formatted$match2[1];

  var _formatted$match3 = formatted.match(/[ ,.:A-z]+/g);

  var _formatted$match4 = _toArray(_formatted$match3);

  var separator = _formatted$match4[0];

  var remaining = _formatted$match4.slice(1);

  var timePeriod = void 0;
  if (remaining && remaining.length) {
    timePeriod = remaining.join('').trim();
  }

  return {
    hours: hours,
    minutes: separator + minutes,
    timePeriod: timePeriod
  };
}

/**
 * Adds hours to a date.
 *
 * @param {Date} time the time to increment
 * @param {number} hours the number of hours to increment by.
 * @return a new Date with the new hours set.
 */
function addHours(time, hours) {
  var t = new Date(time.getTime());
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
function subtractHours(time, hours) {
  return addHours(time, -hours);
}