/* eslint-env jest */

export const matchesMobile = jest.fn(query => ({
  matches: query.indexOf('min-width: 320') !== -1,
}));

export const matchesTablet = jest.fn(query => ({
  matches: query.indexOf('min-width: 768') !== -1,
}));

export const matchesDesktop = jest.fn(query => ({
  matches: query.indexOf('min-width: 1025') !== -1,
}));

export default jest.fn(() => ({ matches: false }));
