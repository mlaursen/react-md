/* eslint-env jest */

window.matchMedia = jest.fn(query => ({
  matches: query.indexOf('(min-width: 1025px)') !== -1,
}));

