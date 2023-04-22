let index = 0;

// this was added because https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149
// is not working at this time
module.exports = {
  nanoid: () => `${++index}`,
};
