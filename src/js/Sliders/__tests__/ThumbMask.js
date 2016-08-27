/* eslint-env jest */
jest.unmock('../ThumbMask');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
} from 'react-addons-test-utils';

import ThumbMask from '../ThumbMask';

describe('ThumbMask', () => {
  it('merges className and style', () => {
    const props = {
      style: { display: 'block' },
      className: 'test',
      thumbLeft: '',
    };
    const mask = renderIntoDocument(<ThumbMask {...props} />);
    const maskNode = findDOMNode(mask);
    expect(maskNode.style.display).toEqual(props.style.display);
    expect(maskNode.className).toContain(props.className);
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

    const props = {
      onClick,
      onMouseUp,
      onMouseDown,
      onMouseOver,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      thumbLeft: '',
    };

    const mask = renderIntoDocument(
      <ThumbMask {...props} />
    );
    const maskNode = findDOMNode(mask);

    Simulate.click(maskNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(maskNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(maskNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(maskNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(maskNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(maskNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(maskNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(maskNode);
    expect(onTouchCancel).toBeCalled();
  });
});
