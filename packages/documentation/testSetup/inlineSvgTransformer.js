module.exports = {
  process(code, filename, config, options) {
    return 'module.exports = { Component: () => null }';
  },
};
