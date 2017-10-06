/* eslint-env jest */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

jest.mock('utils/random', () => ({
  randomInt: () => 3,
  randomImage: () => 'https://unplash.it/300?random&time=3',
}));

window.matchMedia = jest.fn(query => ({
  matches: query.indexOf('(min-width: 1025px)') !== -1,
}));
