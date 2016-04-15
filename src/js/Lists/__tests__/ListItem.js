/*eslint-env jest*/
jest.unmock('../ListItem');
jest.unmock('../ListTile');
jest.unmock('../ListItemText');
jest.unmock('../../Inks');
jest.unmock('../../Inks/injectInk');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';

import ListItem from '../ListItem';

describe('ListItem', () => {
  it('renders as an li component', () => {
    const li = renderIntoDocument(<ListItem primaryText="Test" />);
    const liNode = findDOMNode(li);

    expect(liNode.nodeName).toBe('LI');
  });

  it('passes all remaining props to .md-list-tile', () => {
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

    const li = renderIntoDocument(
      <ListItem
        primaryText="Test"
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

    const tileNode = findDOMNode(li).querySelector('.md-list-tile');

    Simulate.click(tileNode);
    expect(onClick).toBeCalled();

    Simulate.focus(tileNode);
    expect(onFocus).toBeCalled();

    Simulate.blur(tileNode);
    expect(onBlur).toBeCalled();

    Simulate.mouseOver(tileNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(tileNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(tileNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(tileNode);
    expect(onMouseUp).toBeCalled();

    const touchEvent = { changedTouches: [{}] };
    Simulate.touchStart(tileNode, touchEvent);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(tileNode, touchEvent);
    expect(onTouchEnd).toBeCalled();
  });

});
