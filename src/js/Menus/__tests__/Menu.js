/* eslint-env jest */
jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-dom/test-utils';

import { SPACE, TAB, ENTER } from '../../constants/keyCodes';
import Menu from '../Menu';
import List from '../../Lists/List';
import ListItem from '../../Lists/ListItem';

describe('Menu', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
      listStyle: { background: 'orange' },
      listClassName: 'wowww',
      isOpen: true,
      onClose: jest.fn(),
    };

    const menu = renderIntoDocument(<Menu {...props} />);
    const menuNode = findDOMNode(menu);
    const list = findRenderedComponentWithType(menu, List);
    expect(menuNode.style.background).toBe(props.style.background);
    expect(menuNode.className).toContain(props.className);
    expect(list.props.style).toEqual(props.listStyle);
    expect(list.props.className).toContain(props.listClassName);
  });

  it('should call the onClose function when a ListItem is clicked', () => {
    const onClose = jest.fn();
    const menu = mount(
      <Menu isOpen id="test" onClose={onClose}>
        <ListItem primaryText="My Test" />
        <ListItem primaryText="Another" />
      </Menu>
    );

    const items = menu.find(ListItem);
    expect(items.length).toBe(2);
    items.at(0).simulate('click');

    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('should call the onClose function when a ListItem is pressed with the enter or space keys', () => {
    const onClose = jest.fn();
    const menu = mount(
      <Menu id="test" isOpen onClose={onClose}>
        <ListItem primaryText="My Test" />
        <ListItem primaryText="My Test 2" />
      </Menu>
    );

    const item = menu.find(ListItem).at(0);
    item.simulate('keyDown', { which: TAB, keyCode: TAB });
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(0);

    item.simulate('keyDown', { which: ENTER, keyCode: ENTER });
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(1);

    item.simulate('keyDown', { which: SPACE, keyCode: SPACE });
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(2);
  });

  it('should not call the onClose function if a ListItem has nested children', () => {
    const onClose = jest.fn();
    const menu = mount(
      <Menu id="test" isOpen onClose={onClose}>
        <ListItem primaryText="My Test" nestedItems={[<ListItem key="1" primaryText="Nested" />]} />
        <ListItem primaryText="My Test 2" />
      </Menu>
    );

    const item = menu.find(ListItem).at(0);
    item.simulate('click');
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(0);
  });
});
