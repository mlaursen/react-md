/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

import PhoneEmulator from '../PhoneEmulator';

class ContextProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    hideDemo: PropTypes.func.isRequired,
  };

  getChildContext() {
    return { hideDemo: jest.fn() };
  }

  render() {
    return this.props.children;
  }
}

describe('PhoneEmulator', () => {
  it('should render correctly with the base required props', () => {
    const tree1 = renderer.create(
      <ContextProvider>
        <PhoneEmulator mobile={false}>
          <h2>This is some content that should appear in the phone emulator!</h2>
        </PhoneEmulator>
      </ContextProvider>
    ).toJSON();
    const tree2 = renderer.create(
      <ContextProvider>
        <PhoneEmulator mobile>
          <h2>This is some content that should appear in the phone emulator!</h2>
        </PhoneEmulator>
      </ContextProvider>
    ).toJSON();
    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });

  it('should be able to render without a toolbar', () => {
    const tree = renderer.create(
      <ContextProvider>
        <PhoneEmulator toolbar={false}>
          <h2>This is some content that should appear in the phone emulator!</h2>
        </PhoneEmulator>
      </ContextProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render only the children if mobileOnly is provided and not mobile', () => {
    const tree1 = renderer.create(
      <ContextProvider>
        <PhoneEmulator mobileOnly mobile={false}>
          <h2>This is some content that should appear in the phone emulator!</h2>
        </PhoneEmulator>
      </ContextProvider>
    ).toJSON();
    const tree2 = renderer.create(
      <ContextProvider>
        <PhoneEmulator mobileOnly mobile={false}>
          <div>Line 1</div>
          <div>Line 2</div>
        </PhoneEmulator>
      </ContextProvider>
    ).toJSON();

    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });
});
