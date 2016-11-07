/* eslint-env jest */
jest.unmock('../MenuButton');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import MenuButton from '../MenuButton';
import Menu from '../Menu';

describe('MenuButton', () => {
  it('renders a Menu', () => {
    const container = renderIntoDocument(<MenuButton id="test" />);
    const menus = scryRenderedComponentsWithType(container, Menu);

    expect(menus.length).toBe(1);
  });

  it('renders a Button as the Menu\'s toggle prop', () => {
    const container = renderIntoDocument(<MenuButton id="test" />);
    const menu = findRenderedComponentWithType(container, Menu);
    expect(menu.props.toggle).toBeDefined();
  });
});
