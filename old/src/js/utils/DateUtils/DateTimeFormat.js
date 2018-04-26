/** @module utils/DateUtils/DateTimeFormat */

/**
 * A _really_ terrible DateTimeFormat mock if it is not available in
 * the browser or node version.
 */
const DateTimeFormat = (() => {
  if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat !== 'undefined') {
    return Intl.DateTimeFormat;
  }

  // Very bad 'mock' of Intl.DateTimeFormat
  return class DateTimeFormat { // eslint-disable-line no-shadow
    constructor(locales, formatOptions) {
      this.locales = locales;
      this.options = formatOptions;
    }

    format(date) {
      return date.toLocaleString();
    }
  };
})();

export default DateTimeFormat;
