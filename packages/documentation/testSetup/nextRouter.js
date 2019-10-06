const { createElement } = require('react');
const router = require('next/router');

const testRouter = {
  push: () => {},
  query: {},
};

const withRouter = Component => ({ children, ...props }) =>
  createElement(Component, { router: testRouter, ...props }, children);

module.exports = {
  ...router,
  withRouter,
};
