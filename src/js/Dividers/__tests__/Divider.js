/* eslint-env jest*/
jest.unmock('../Divider');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';

import Divider from '../Divider';

describe('Divider', () => {
  it('updates the className with inset or vertical', () => {
    let divider = renderIntoDocument(<Divider />);

    let dividerNode = findDOMNode(divider);

    expect(dividerNode.className).toBe('md-divider');

    divider = renderIntoDocument(<Divider inset />);
    dividerNode = findDOMNode(divider);

    expect(dividerNode.classList.contains('inset')).toBe(true);
    expect(dividerNode.classList.contains('vertical')).toBe(false);

    divider = renderIntoDocument(<Divider inset vertical />);
    dividerNode = findDOMNode(divider);

    expect(dividerNode.classList.contains('inset')).toBe(true);
    expect(dividerNode.classList.contains('vertical')).toBe(true);

    divider = renderIntoDocument(<Divider vertical />);
    dividerNode = findDOMNode(divider);

    expect(dividerNode.classList.contains('inset')).toBe(false);
    expect(dividerNode.classList.contains('vertical')).toBe(true);
  });

  it('passes all remaining props to the divider', () => {
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();
    const style = { display: 'block' };

    const divider = renderIntoDocument(
      <Divider
        style={style}
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

    const dividerNode = findDOMNode(divider);
    expect(dividerNode.style.display).toBe(style.display);

    Simulate.click(dividerNode);
    expect(onClick).toBeCalled();

    Simulate.focus(dividerNode);
    expect(onFocus).toBeCalled();

    Simulate.blur(dividerNode);
    expect(onBlur).toBeCalled();

    Simulate.mouseOver(dividerNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(dividerNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(dividerNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(dividerNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(dividerNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(dividerNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(dividerNode);
    expect(onTouchCancel).toBeCalled();
  });
});
