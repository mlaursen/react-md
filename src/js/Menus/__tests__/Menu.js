/*eslint-env jest*/
jest.unmock('../Menu');
jest.unmock('../../Lists');
jest.unmock('../../Lists/List.js');
jest.unmock('../../Lists/ListTile');
jest.unmock('../../Lists/ListItemText');
jest.unmock('../../Lists/ListItem');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithTag,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import Menu from '../Menu';
import List from '../../Lists/List';
import ListItem from '../../Lists/ListItem';

describe('Menu', () => {
  it('applies style and className correctly', () => {
    const style = { display: 'block' };
    const className = 'test';
    const listStyle = { display: 'initial' };
    const listClassName = 'list-test';
    const menu = renderIntoDocument(
      <Menu
        isOpen={true}
        style={style}
        className={className}
        listStyle={listStyle}
        listClassName={listClassName}
      >
        <li>A</li>
        <li>A</li>
      </Menu>
    );

    const container = findDOMNode(menu);
    const list = findDOMNode(findRenderedComponentWithType(menu, List));
    expect(container.style.display).toBe(style.display);
    expect(container.classList.contains('test')).toBe(true);

    expect(list.style.display).toBe(listStyle.display);
    expect(list.classList.contains(listClassName)).toBe(true);
  });

  it('applies any remaining props to the container component', () => {
    const onClick = jest.genMockFunction();
    const onFocus = jest.genMockFunction();
    const onBlur = jest.genMockFunction();
    const onMouseDown = jest.genMockFunction();
    const onMouseUp = jest.genMockFunction();
    const onMouseOver = jest.genMockFunction();
    const onMouseLeave = jest.genMockFunction();
    const onTouchStart = jest.genMockFunction();
    const onTouchEnd = jest.genMockFunction();
    const onTouchCancel = jest.genMockFunction();

    const menu = renderIntoDocument(
      <Menu
        isOpen={false}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      />
    );

    const menuNode = findDOMNode(menu);

    Simulate.click(menuNode);
    expect(onClick).toBeCalled();

    Simulate.focus(menuNode);
    expect(onFocus).toBeCalled();

    Simulate.blur(menuNode);
    expect(onBlur).toBeCalled();

    Simulate.mouseOver(menuNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(menuNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(menuNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(menuNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(menuNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(menuNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(menuNode);
    expect(onTouchCancel).toBeCalled();
  });

  it('toggles the visibility of the items when opened', () => {
    let menu = renderIntoDocument(
      <Menu isOpen={false}>
        <li>1</li>
        <li>2</li>
      </Menu>
    );

    let list = scryRenderedComponentsWithType(menu, List);
    let items = scryRenderedDOMComponentsWithTag(menu, 'li');
    expect(list.length).toBe(0);
    expect(items.length).toBe(0);

    menu = renderIntoDocument(
      <Menu isOpen={true}>
        <li>1</li>
        <li>2</li>
      </Menu>
    );

    list = scryRenderedComponentsWithType(menu, List);
    items = scryRenderedDOMComponentsWithTag(menu, 'li');
    expect(list.length).toBe(1);
    expect(items.length).toBe(2);
  });

  it('attempts to close the menu on a child click if autoclose is set to true', () => {
    const close = jest.genMockFunction();
    let menu = renderIntoDocument(
      <Menu isOpen={true} autoclose={true} close={close}>
        <ListItem primaryText="One" />
        <ListItem primaryText="Two" />
      </Menu>
    );

    let item = scryRenderedDOMComponentsWithClass(menu, 'md-list-tile')[0];
    expect(close.mock.calls.length).toBe(0);

    Simulate.click(item);
    expect(close.mock.calls.length).toBe(1);

    menu = renderIntoDocument(
      <Menu isOpen={true} autoclose={false} close={close}>
        <ListItem primaryText="One" />
        <ListItem primaryText="Two" />
      </Menu>
    );

    item = scryRenderedDOMComponentsWithClass(menu, 'md-list-tile')[0];
    Simulate.click(item);
    expect(close.mock.calls.length).toBe(1);
  });

  it('renders a toggle element in the menu container', () => {
    const toggle = <button type="button">Hello</button>;
    const menu = renderIntoDocument(
      <Menu isOpen={false} toggle={toggle} />
    );

    const toggleNode = findRenderedDOMComponentWithTag(menu, 'button');
    expect(toggleNode).not.toBe(null);
  });
});
