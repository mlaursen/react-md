/* eslint-env jest*/
/* eslint-disable react/prop-types*/
jest.unmock('../injectInk');
jest.unmock('../../constants/keyCodes');

import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import injectInk from '../injectInk';

class Test extends React.Component {
  render() {
    const { children, ...props } = this.props;
    return <button {...props}>{children}</button>;
  }
}
const InkTest = injectInk(Test);


describe('injectInk', () => {
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

    const inkTest = renderIntoDocument(
      <InkTest
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
      </InkTest>
    );

    const testNode = findRenderedDOMComponentWithTag(inkTest, 'button');
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
