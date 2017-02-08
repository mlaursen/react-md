/* eslint-env jest */
window.matchMedia = jest.fn(query => ({
  matches: !!query.match(/min-width: 1025/),
}));
