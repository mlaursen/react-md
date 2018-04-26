/* eslint-env jest */
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

window.matchMedia = jest.fn(query => ({
  matches: !!query.match(/min-width: 1025/),
}));

global.expectSnapshot = function expectSnapshot(children) {
  expect(renderer.create(children).toJSON()).toMatchSnapshot();
};

global.expectRenderSnapshot = function expectRenderSnapshot(children, fullDOM = true) {
  const component = (fullDOM ? mount : shallow)(children);
  expect(component.render()).toMatchSnapshot();
};

/**
 * A utility function that will override the console's behavior and throw errors
 * if console.error occurs. This is useful when you want to consider React warnings
 * as failures.
 */
global.captureConsole = function captureConsole(match = null) {
  const console = global.console;

  beforeAll(() => {
    global.console = {
      ...console,
      error: (error) => {
        if (match === null || error.match(match)) {
          throw new Error(error);
        }
      },
    };
  });

  afterAll(() => {
    global.console = console;
  });
};
