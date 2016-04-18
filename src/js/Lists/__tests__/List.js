/*eslint-env jest*/
jest.unmock('../List');
jest.unmock('../ListItem');
jest.unmock('../ListTile');
jest.unmock('../ListItemText');
jest.unmock('../../Dividers');
jest.unmock('../../Dividers/Divider');
jest.unmock('../../Inks');
jest.unmock('../../Inks/injectInk');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';

import List from '../List';
import ListItem from '../ListItem';
import Divider from '../../Dividers';

describe('List', () => {
  it('renders an ol or ul component', () => {
    const ul = renderIntoDocument(<List />);
    const ol = renderIntoDocument(<List ordered={true} />);

    const ulNode = findDOMNode(ul);
    const olNode = findDOMNode(ol);

    expect(ulNode.nodeName).toBe('UL');
    expect(olNode.nodeName).toBe('OL');
  });

  it('adds style and className to the list', () => {
    const style = { display: 'block' };
    const list = renderIntoDocument(<List style={style} className="test" />);

    const listNode = findDOMNode(list);

    expect(listNode.className).toBe('md-list test');
    expect(listNode.style.display).toBe(style.display);
  });

  it('passes all remaining props to the list', () => {
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

    const list = renderIntoDocument(
      <List
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

    const listNode = findDOMNode(list);

    Simulate.click(listNode);
    expect(onClick).toBeCalled();

    Simulate.focus(listNode);
    expect(onFocus).toBeCalled();

    Simulate.blur(listNode);
    expect(onBlur).toBeCalled();

    Simulate.mouseOver(listNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(listNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(listNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(listNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(listNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(listNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(listNode);
    expect(onTouchCancel).toBeCalled();
  });

  it('adds the className extra-mb to a list item that has a divider right after it', () => {
    const list = renderIntoDocument(
      <List>
        <ListItem primaryText="Test" />
        <Divider />
        <ListItem primaryText="Test" />
      </List>
    );

    const listNode = findDOMNode(list);

    const item1 = listNode.querySelector('li');

    expect(item1.classList.contains('extra-mb')).toBe(true);
  });
});
