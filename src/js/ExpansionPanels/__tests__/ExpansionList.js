/* eslint-env jest */
jest.unmock('../ExpansionList');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import ExpansionList from '../ExpansionList';
import ExpansionPanel from '../ExpansionPanel';

describe('ExpansionList', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const expansionList = renderIntoDocument(
      <ExpansionList style={style} className={className} />
    );

    const expansionListNode = findDOMNode(expansionList);
    expect(expansionListNode.style.display).toBe(style.display);
    expect(expansionListNode.className).toContain(className);
  });

  it('adds any event listeners', () => {
    const onClick = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();
    const props = {
      onClick,
      onMouseDown,
      onMouseUp,
      onMouseOver,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
    };

    const list = renderIntoDocument(<ExpansionList {...props} />);
    const listNode = findDOMNode(list);

    Simulate.click(listNode);
    expect(onClick.mock.calls.length).toBe(1);

    Simulate.mouseDown(listNode);
    expect(onMouseDown.mock.calls.length).toBe(1);

    Simulate.mouseUp(listNode);
    expect(onMouseUp.mock.calls.length).toBe(1);

    Simulate.mouseOver(listNode);
    expect(onMouseOver.mock.calls.length).toBe(1);

    Simulate.mouseLeave(listNode);
    expect(onMouseLeave.mock.calls.length).toBe(1);

    Simulate.touchStart(listNode);
    expect(onMouseDown.mock.calls.length).toBe(1);

    Simulate.touchEnd(listNode);
    expect(onMouseDown.mock.calls.length).toBe(1);

    Simulate.touchCancel(listNode);
    expect(onMouseDown.mock.calls.length).toBe(1);
  });

  it('injects the columnWidths prop into the child component', () => {
    const list = renderIntoDocument(
      <ExpansionList>
        <ExpansionPanel label="Test" />
      </ExpansionList>
    );

    const panel = findRenderedComponentWithType(list, ExpansionPanel);

    expect(panel.props.columnWidths).toBe(list.state.columnWidths);
  });

  it('injects the focused prop into the child component', () => {
    const list = renderIntoDocument(
      <ExpansionList>
        <ExpansionPanel label="Test" />
      </ExpansionList>
    );

    const panel = findRenderedComponentWithType(list, ExpansionPanel);

    expect(panel.props.focused).toBe(false);
  });
});
