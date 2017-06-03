/* eslint-env jest */
jest.mock('react-md/lib/Inks/InkContainer');
jest.mock('react-md/lib/Tooltips/TooltipContainer');

window.matchMedia = jest.fn(query => ({
  matches: query.indexOf('(min-width: 1025px)') !== -1,
}));
