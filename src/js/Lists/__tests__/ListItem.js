/* eslint-env jest */
jest.unmock('../ListItem');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { mount } from 'enzyme';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-dom/test-utils';

import ListItem from '../ListItem';
import AccessibleFakeInkedButton from '../../Helpers/AccessibleFakeInkedButton';

describe('ListItem', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
      tileStyle: { background: 'red' },
      tileClassName: 'womba-juice',
      primaryText: 'Woop',
    };

    const listItem = renderIntoDocument(<ListItem {...props} />);
    const listItemNode = findDOMNode(listItem);
    const btn = findRenderedComponentWithType(listItem, AccessibleFakeInkedButton);

    expect(listItemNode.style.background).toBe(props.style.background);
    expect(listItemNode.className).toContain(props.className);
    expect(btn.props.style).toEqual(props.tileStyle);
    expect(btn.props.className).toContain(props.tileClassName);
  });

  it('passes event listeners to the AccessibleFakeInkedButton', () => {
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onDoubleClick = jest.fn();
    const onTouchMove = jest.fn();
    const onTouchCancel = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const props = {
      primaryText: 'Test',
      onMouseDown,
      onMouseUp,
      onDoubleClick,
      onTouchMove,
      onTouchCancel,
      onFocus,
      onBlur,
    };

    const item = renderIntoDocument(<ListItem {...props} />);
    const btn = findRenderedComponentWithType(item, AccessibleFakeInkedButton);
    expect(btn.props.onMouseDown).toBe(props.onMouseDown);
    expect(btn.props.onMouseUp).toBe(props.onMouseUp);
    expect(btn.props.onDoubleClick).toBe(props.onDoubleClick);
    expect(btn.props.onTouchMove).toBe(props.onTouchMove);
    expect(btn.props.onTouchCancel).toBe(props.onTouchCancel);
    expect(btn.props.onFocus).toBe(props.onFocus);
    expect(btn.props.onBlur).toBe(props.onBlur);
  });

  it('calls the onClick prop when _handleClick is called', () => {
    const props = { primaryText: 'Test', onClick: jest.fn() };
    const item = renderIntoDocument(<ListItem {...props} />);
    const clickEvent = { target: {} };
    item._handleClick(clickEvent);

    expect(props.onClick.mock.calls.length).toBe(1);
    expect(props.onClick.mock.calls[0][0]).toEqual(clickEvent);
  });

  it('calls the onMouseOver prop when _handleMouseOver is called', () => {
    const props = { primaryText: 'Test', onMouseOver: jest.fn() };
    const item = renderIntoDocument(<ListItem {...props} />);
    const mouseEvent = { target: {} };
    item._handleMouseOver(mouseEvent);

    expect(props.onMouseOver.mock.calls.length).toBe(1);
    expect(props.onMouseOver.mock.calls[0][0]).toEqual(mouseEvent);
  });

  it('calls the onMouseLeave prop when _handleMouseLeave is called', () => {
    const props = { primaryText: 'Test', onMouseLeave: jest.fn() };
    const item = renderIntoDocument(<ListItem {...props} />);
    const mouseEvent = { target: {} };
    item._handleMouseLeave(mouseEvent);

    expect(props.onMouseLeave.mock.calls.length).toBe(1);
    expect(props.onMouseLeave.mock.calls[0][0]).toEqual(mouseEvent);
  });

  it('calls the onTouchStart prop when _handleTouchStart is called', () => {
    const props = { primaryText: 'Test', onTouchStart: jest.fn() };
    const item = renderIntoDocument(<ListItem {...props} />);
    const touchEvent = { target: {} };
    item._handleTouchStart(touchEvent);

    expect(props.onTouchStart.mock.calls.length).toBe(1);
    expect(props.onTouchStart.mock.calls[0][0]).toEqual(touchEvent);
  });

  it('calls the onTouchEnd prop when _handleTouchEnd is called', () => {
    const props = { primaryText: 'Test', onTouchEnd: jest.fn() };
    const item = renderIntoDocument(<ListItem {...props} />);
    const touchEvent = { target: {} };
    item._handleTouchEnd(touchEvent);

    expect(props.onTouchEnd.mock.calls.length).toBe(1);
    expect(props.onTouchEnd.mock.calls[0][0]).toEqual(touchEvent);
  });

  it('calls the onKeyDown prop when _handleKeyDown is called', () => {
    const props = { primaryText: 'Test', onKeyDown: jest.fn() };
    const item = renderIntoDocument(<ListItem {...props} />);
    const keyEvent = { target: {} };
    item._handleKeyDown(keyEvent);

    expect(props.onKeyDown.mock.calls.length).toBe(1);
    expect(props.onKeyDown.mock.calls[0][0]).toEqual(keyEvent);
  });

  it('calls the onKeyUp prop when _handleKeyUp is called', () => {
    const props = { primaryText: 'Test', onKeyUp: jest.fn() };
    const item = renderIntoDocument(<ListItem {...props} />);
    const keyEvent = { target: {} };
    item._handleKeyUp(keyEvent);

    expect(props.onKeyUp.mock.calls.length).toBe(1);
    expect(props.onKeyUp.mock.calls[0][0]).toEqual(keyEvent);
  });

  it('should correctly apply the itemProps and tileProps props', () => {
    const console = global.console;
    global.console = {
      ...console,
      error: (e) => {
        // don't care about unknown props for the newly added one
        if (!e.match(/Unknown prop/)) {
          console.error(e);
        }
      },
    };
    const otherProp = 'other-prop';
    const itemProps = { onClick: jest.fn() };
    const tileProps = { onMouseDown: jest.fn() };
    const item = mount(
      <ListItem
        primaryText="Test"
        itemProps={itemProps}
        tileProps={tileProps}
        otherProp={otherProp}
        passPropsToItem={false}
      />
    );
    let li = item.find('li');
    let button = item.find(AccessibleFakeInkedButton);
    expect(li.props().onClick).toBe(itemProps.onClick);
    expect(button.props().onMouseDown).toBe(tileProps.onMouseDown);
    expect(button.props().otherProp).toBe('other-prop');

    item.setProps({ passPropsToItem: true });
    li = item.find('li');
    button = item.find(AccessibleFakeInkedButton);
    expect(li.props().onClick).toBe(itemProps.onClick);
    expect(li.props().otherProp).toBe('other-prop');
    expect(button.props().onMouseDown).toBe(tileProps.onMouseDown);

    global.console = console;
  });
});
