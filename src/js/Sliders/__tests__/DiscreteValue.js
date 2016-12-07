/* eslint-env jest */
jest.unmock('../DiscreteValue');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
} from 'react-addons-test-utils';

import DiscreteValue from '../DiscreteValue';

describe('DiscreteValue', () => {
  it('returns null when not not discrete or not active', () => {
    const props = { value: 3, thumbLeft: '', valuePrecision: 0 };

    let value = renderIntoDocument(<DiscreteValue {...props} />);
    expect(findDOMNode(value)).toBe(null);

    props.discrete = true;
    value = renderIntoDocument(<DiscreteValue {...props} />);
    expect(findDOMNode(value)).toBe(null);

    props.active = true;
    value = renderIntoDocument(<DiscreteValue {...props} />);
    expect(findDOMNode(value)).not.toBe(null);
  });

  it('merges style and className', () => {
    const props = {
      value: 3,
      thumbLeft: '8px',
      discrete: true,
      active: true,
      style: { display: 'block' },
      className: 'test',
      valuePrecision: 0,
    };

    const value = renderIntoDocument(<DiscreteValue {...props} />);
    const valueNode = findDOMNode(value);

    expect(valueNode.style.display).toBe(props.style.display);
    expect(valueNode.className).toContain(props.className);
  });

  it('passes the event listeners correctly', () => {
    const onClick = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();
    const onKeyUp = jest.fn();
    const onKeyDown = jest.fn();

    const props = {
      onClick,
      onMouseUp,
      onMouseDown,
      onMouseOver,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      onKeyUp,
      onKeyDown,
      discrete: true,
      active: true,
      value: 3,
      thumbLeft: '',
      valuePrecision: 0,
    };

    const discreteValue = renderIntoDocument(
      <DiscreteValue {...props} />
    );
    const discreteValueNode = findDOMNode(discreteValue);

    Simulate.click(discreteValueNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(discreteValueNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(discreteValueNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(discreteValueNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(discreteValueNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(discreteValueNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(discreteValueNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(discreteValueNode);
    expect(onTouchCancel).toBeCalled();

    Simulate.keyUp(discreteValueNode);
    expect(onKeyUp).toBeCalled();

    Simulate.keyDown(discreteValueNode);
    expect(onKeyDown).toBeCalled();
  });
});
