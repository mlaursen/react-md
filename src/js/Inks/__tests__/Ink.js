/* eslint-env jest*/
/* eslint-disable react/prop-types*/
jest.unmock('../injectInk');
jest.unmock('../../constants/keyCodes');

import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import injectInk from '../injectInk';
import InkTransition from '../InkTransition';
import { LEFT_MOUSE, RIGHT_MOUSE } from '../../constants/keyCodes';

class Test extends React.Component {
  render() {
    const { ink, children, ...props } = this.props;
    return <button {...props}>{ink}{children}</button>;
  }
}
const InkTest = injectInk(Test);


describe('injectInk', () => {
  it('injects an ink prop into a React component', () => {
    const inkTest = renderIntoDocument(
      <InkTest>Hello!</InkTest>
    );

    const testComp = findRenderedComponentWithType(inkTest, Test);
    expect(testComp.props.ink).toBeDefined();
  });

  it('does not inject an ink if the component is disabled or the ink is disabled by a prop', () => {
    const disabled = renderIntoDocument(
      <InkTest disabled>Hello!</InkTest>
    );

    const disabledComp = findRenderedComponentWithType(disabled, Test);
    expect(disabledComp.props.ink).not.toBeDefined();

    const inkDisabled = renderIntoDocument(
      <InkTest inkDisabled>Hello!</InkTest>
    );

    const inkDisabledComp = findRenderedComponentWithType(inkDisabled, Test);
    expect(inkDisabledComp.props.ink).not.toBeDefined();
  });

  it('allows for the touch, click, and focus event listeners to be passed down', () => {
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseLeave = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchMove = jest.fn();
    const onTouchCancel = jest.fn();
    const onTouchEnd = jest.fn();

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

    expect(onMouseDown.mock.calls.length).toBe(1);
    expect(onMouseUp.mock.calls.length).toBe(1);
    expect(onMouseLeave.mock.calls.length).toBe(1);
    expect(onFocus.mock.calls.length).toBe(1);
    expect(onBlur.mock.calls.length).toBe(1);
    expect(onTouchStart.mock.calls.length).toBe(1);
    expect(onTouchMove.mock.calls.length).toBe(1);
    expect(onTouchCancel.mock.calls.length).toBe(1);
    expect(onTouchEnd.mock.calls.length).toBe(1);
  });

  it('does not create an ink when the right mouse button is clicked or control clicked', () => {
    const inkTest = renderIntoDocument(
      <InkTest>Hello</InkTest>
    );

    const button = findRenderedDOMComponentWithTag(inkTest, 'button');
    let inks = scryRenderedDOMComponentsWithClass(inkTest, 'md-ink');
    expect(inks.length).toBe(0);

    Simulate.mouseDown(button, { button: RIGHT_MOUSE });
    Simulate.mouseDown(button, { button: LEFT_MOUSE, ctrlKey: true });

    inks = scryRenderedComponentsWithType(inkTest, InkTransition);
    expect(inks.length).toBe(0);
  });

  it('creates an ink on left mouse down', () => {
    const inkTest = renderIntoDocument(
      <InkTest>Hello</InkTest>
    );

    const button = findRenderedDOMComponentWithTag(inkTest, 'button');
    let inks = scryRenderedComponentsWithType(inkTest, InkTransition);
    expect(inks.length).toBe(0);

    Simulate.mouseDown(button, { button: LEFT_MOUSE });

    inks = scryRenderedComponentsWithType(inkTest, InkTransition);
    expect(inks.length).toBe(1);
  });

  it('creates an ink on touch start', () => {
    const inkTest = renderIntoDocument(
      <InkTest>Hello</InkTest>
    );

    const button = findRenderedDOMComponentWithTag(inkTest, 'button');
    let inks = scryRenderedComponentsWithType(inkTest, InkTransition);
    expect(inks.length).toBe(0);

    Simulate.touchStart(button, { changedTouches: [{}] });
    jest.runOnlyPendingTimers();

    inks = scryRenderedComponentsWithType(inkTest, InkTransition);
    expect(inks.length).toBe(1);
  });

  it('creates an ink on focus and removes on blur', () => {
    const inkTest = renderIntoDocument(
      <InkTest>Hello</InkTest>
    );

    const button = findRenderedDOMComponentWithTag(inkTest, 'button');
    let inks = scryRenderedComponentsWithType(inkTest, InkTransition);
    expect(inks.length).toBe(0);

    Simulate.focus(button);

    inks = scryRenderedComponentsWithType(inkTest, InkTransition);
    expect(inks.length).toBe(1);

    Simulate.blur(button);

    inks = scryRenderedComponentsWithType(inkTest, InkTransition);
    expect(inks.length).toBe(0);
  });
});
