/*eslint-env jest*/
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

  it('passes all remaining props to the divider', () => {
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
});
