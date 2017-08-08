/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { createSnapshot } from 'utils/testing';

import CloseEmulator from '../CloseEmulator';

class ContextProvider extends React.Component {
  static propTypes = {
    hideDemo: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    hideDemo: jest.fn(),
  };

  static childContextTypes = {
    hideDemo: PropTypes.func.isRequired,
  };

  getChildContext() {
    return { hideDemo: this.props.hideDemo };
  }

  render() {
    return this.props.children;
  }
}

describe('CloseEmulator', () => {
  it('should render correctly', () => {
    const tree1 = createSnapshot(
      <ContextProvider>
        <CloseEmulator icon>close</CloseEmulator>
      </ContextProvider>
    );
    const tree2 = createSnapshot(
      <ContextProvider>
        <CloseEmulator raised primary>Hello, World!</CloseEmulator>
      </ContextProvider>
    );
    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });

  it('should correctly call the hideDemo context function and onClick', () => {
    const hideDemo = jest.fn();
    const onClick = jest.fn();

    const button = mount(
      <ContextProvider hideDemo={hideDemo}>
        <CloseEmulator icon onClick={onClick}>close</CloseEmulator>
      </ContextProvider>
    );

    button.simulate('click');
    expect(onClick).toBeCalled();
    expect(hideDemo).toBeCalled();
  });
});
