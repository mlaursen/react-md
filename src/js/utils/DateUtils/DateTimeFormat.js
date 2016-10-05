const DateTimeFormat = (() => {
  if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat !== 'undefined') {
    return Intl.DateTimeFormat;
  }

  // Very bad 'mock' of Intl.DateTimeFormat
  return { format: () => date => date };
})();

export default DateTimeFormat;
