/* eslint-env jest */
jest.mock('react-md/lib/Inks/InkContainer');
jest.mock('react-md/lib/Tooltips/TooltipContainer');

jest.mock('utils/random', () => ({
  randomInt: () => 3,
  randomImage: () => 'https://unplash.it/300?random&time=3',
}));

window.matchMedia = jest.fn(query => ({
  matches: query.indexOf('(min-width: 1025px)') !== -1,
}));
