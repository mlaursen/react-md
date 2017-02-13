/* eslint-env jest*/
jest.unmock('../FontIcon');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';

import FontIcon from '../FontIcon';

describe('FontIcon', () => {
  it('applies a className and an iconClassName', () => {
    const icon = renderIntoDocument(<FontIcon className="test" iconClassName="fa fa-github" />);
    const iconNode = findDOMNode(icon);

    expect(iconNode.classList.contains('test')).toBe(true);
    expect(iconNode.classList.contains('fa')).toBe(true);
    expect(iconNode.classList.contains('fa-github')).toBe(true);
  });

  it('passes all remaining props to the font icon', () => {
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
      <FontIcon
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

  it('should set the width and height to 24 if the forceSize prop is enabled', () => {
    const icon = renderIntoDocument(<FontIcon forceSize />);
    const style = findDOMNode(icon).style;
    const expected = '24px';
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
  });

  it('should only set the fontSize when forceFontSize is enabled', () => {
    let icon = renderIntoDocument(<FontIcon forceSize />);
    let style = findDOMNode(icon).style;
    const expected = '24px';
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
    expect(style.fontSize).toBe('');

    icon = renderIntoDocument(<FontIcon forceSize forceFontSize />);
    style = findDOMNode(icon).style;
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
    expect(style.fontSize).toBe(expected);
  });

  it('should set the width and height to the provided forceSize value', () => {
    const icon = renderIntoDocument(<FontIcon forceSize={16} />);
    const style = findDOMNode(icon).style;
    const expected = '16px';
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
  });

  it('should only set the fontSize to the provided forceSize value when forceFontSize is enabled', () => {
    const size = 16;
    let icon = renderIntoDocument(<FontIcon forceSize={size} />);
    let style = findDOMNode(icon).style;
    const expected = `${size}px`;
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
    expect(style.fontSize).toBe('');

    icon = renderIntoDocument(<FontIcon forceSize={size} forceFontSize />);
    style = findDOMNode(icon).style;
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
    expect(style.fontSize).toBe(expected);
  });

  it('should prefer the style prop values over the forceSize styles', () => {
    const props = {
      style: { width: 16, height: 22, fontSize: 8 },
      forceSize: true,
      forceFontSize: true,
    };

    const icon = renderIntoDocument(<FontIcon {...props} />);
    const style = findDOMNode(icon).style;
    expect(style.fontSize).toBe('8px');
    expect(style.height).toBe('22px');
    expect(style.width).toBe('16px');
  });
});
