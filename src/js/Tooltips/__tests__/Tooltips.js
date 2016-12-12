/* eslint-env jest*/
jest.unmock('../../constants/keyCodes');
jest.unmock('../injectTooltip');

import React, { PropTypes } from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';
import injectTooltip from '../injectTooltip';


class Link extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children, ...props } = this.props;
    return <a {...props}>{children}</a>;
  }
}

const TooltipLink = injectTooltip(Link);

describe('injectTooltip', () => {
  it('it allows for al the normal event listeners to still work', () => {
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseLeave = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchMove = jest.fn();
    const onTouchCancel = jest.fn();
    const onTouchEnd = jest.fn();
    const onKeyUp = jest.fn();
    const onKeyDown = jest.fn();

    const tooltipTest = renderIntoDocument(
      <TooltipLink
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchCancel}
        onTouchEnd={onTouchEnd}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
      >
        Hello!
      </TooltipLink>
    );

    const testNode = findRenderedDOMComponentWithTag(tooltipTest, 'a');
    const event = { pageX: 0, pageY: 0 };
    const touchEvent = { changedTouches: [event] };
    Simulate.mouseDown(testNode, event);
    Simulate.mouseUp(testNode, event);
    Simulate.mouseLeave(testNode, event);
    Simulate.focus(testNode);
    Simulate.blur(testNode);
    Simulate.touchStart(testNode, touchEvent);
    Simulate.touchMove(testNode, touchEvent);
    Simulate.touchCancel(testNode, touchEvent);
    Simulate.touchEnd(testNode, touchEvent);
    Simulate.keyUp(testNode);
    Simulate.keyDown(testNode);

    expect(onMouseDown.mock.calls.length).toBe(1);
    expect(onMouseUp.mock.calls.length).toBe(1);
    expect(onMouseLeave.mock.calls.length).toBe(1);
    expect(onFocus.mock.calls.length).toBe(1);
    expect(onBlur.mock.calls.length).toBe(1);
    expect(onTouchStart.mock.calls.length).toBe(1);
    expect(onTouchMove.mock.calls.length).toBe(1);
    expect(onTouchCancel.mock.calls.length).toBe(1);
    expect(onTouchEnd.mock.calls.length).toBe(1);
    expect(onKeyUp.mock.calls.length).toBe(1);
    expect(onKeyDown.mock.calls.length).toBe(1);
  });
});
