const DateTimeFormat = (() => {
  if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat !== 'undefined') {
    return Intl.DateTimeFormat;
  }

  // Very bad 'mock' of Intl.DateTimeFormat
  return (/* locales, formatOptions */) => ({ format: date => date.toLocaleString() });
})();

export default DateTimeFormat;
