/* eslint-env jest*/
jest.unmock('../ClockFace');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { LEFT_MOUSE, RIGHT_MOUSE } from '../../constants/keyCodes';
import ClockFace from '../ClockFace';
import ClockTime from '../ClockTime';
import ClockHand from '../ClockHand';

describe('ClockFace', () => {
  it('renders a 12 hour clock if there is a time period prop and is not displayed in minutes', () => {
    const onClick = jest.fn();
    const face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onClick={onClick} timePeriod="AM" />
    );

    const times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times.length).toBe(12);
  });

  it('renders a 24 hour clock if there is not a time period prop and is not displayed in minutes', () => {
    const onClick = jest.fn();
    const face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onClick={onClick} />
    );

    const times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times.length).toBe(24);
  });

  it('renders minutes in 5 minute increments starting from 0', () => {
    const onClick = jest.fn();
    let face = renderIntoDocument(
      <ClockFace time={3} minutes onClick={onClick} />
    );

    let times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times.length).toBe(60 / 5);

    face = renderIntoDocument(
      <ClockFace time={3} minutes onClick={onClick} timePeriod="AM" />
    );

    times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times.length).toBe(60 / 5);
  });

  it('sets the prop active for the correct time', () => {
    const onClick = jest.fn();
    let face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onClick={onClick} />
    );

    let times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times[2].props.active).toBe(true);

    face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onClick={onClick} timePeriod="AM" />
    );

    times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times[2].props.active).toBe(true);
  });

  it('renders a clock hand component', () => {
    const props = {
      onClick: jest.fn(),
      time: 3,
      minutes: true,
    };

    const face = renderIntoDocument(<ClockFace {...props} />);
    face.setState({ radius: 136 });

    const hands = scryRenderedComponentsWithType(face, ClockHand);
    expect(hands.length).toBe(1);
    const [hand] = hands;
    expect(hand.props.time).toBe(props.time);
    expect(hand.props.coords).toBe(136);
    expect(hand.props.minutes).toBe(props.minutes);
  });

  it('calls the on click prop with the selected time on mouse up', () => {
    const onClick = jest.fn();
    const face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onClick={onClick} timePeriod="A" />
    );
    face.setState({ radius: 136 });

    const faceNode = findDOMNode(face);
    // Click at 12 o'clock
    Simulate.mouseUp(faceNode, { button: LEFT_MOUSE, offsetX: 136, offsetY: 15 });
    expect(onClick.mock.calls.length).toBe(1);
    expect(onClick.mock.calls[0][0]).toBe(0);

    // Click at 3 o'clock
    Simulate.mouseUp(faceNode, { button: LEFT_MOUSE, offsetX: 272, offsetY: 136 });
    expect(onClick.mock.calls.length).toBe(2);
    expect(onClick.mock.calls[1][0]).toBe(3);
  });

  it('calls the onClick prop with the selected time on mousemove until the mouse up event', () => {
    const onClick = jest.fn();
    const face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onClick={onClick} timePeriod="A" />
    );
    face.setState({ radius: 136 });

    const faceNode = findDOMNode(face);

    Simulate.mouseMove(faceNode, { offsetX: 136, offsetY: 15 });
    expect(onClick.mock.calls.length).toBe(0);

    Simulate.mouseDown(faceNode, { button: LEFT_MOUSE });
    Simulate.mouseMove(faceNode, { offsetX: 136, offsetY: 15 });
    expect(onClick.mock.calls.length).toBe(1);

    Simulate.mouseMove(faceNode, { offsetX: 120, offsetY: 20 });
    expect(onClick.mock.calls.length).toBe(2);

    Simulate.mouseUp(faceNode, { button: LEFT_MOUSE, offsetX: 125, offsetY: 25 });
    expect(onClick.mock.calls.length).toBe(3);

    Simulate.mouseMove(faceNode, { offsetX: 130, offsetY: 30 });
    expect(onClick.mock.calls.length).toBe(3);
  });

  it('does not start listening to mousemove events if the control key was pressed on mousedown', () => {
    const onClick = jest.fn();
    const face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onClick={onClick} timePeriod="A" />
    );
    face.setState({ radius: 136 });

    const faceNode = findDOMNode(face);

    Simulate.mouseDown(faceNode, { button: LEFT_MOUSE, ctrlKey: true });
    Simulate.mouseMove(faceNode, { offsetX: 136, offsetY: 15 });
    expect(onClick.mock.calls.length).toBe(0);
  });

  it('does not start listening to mousemove events if the right mouse key was pressed on mousedown', () => {
    const onClick = jest.fn();
    const face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onClick={onClick} timePeriod="A" />
    );
    face.setState({ radius: 136 });

    const faceNode = findDOMNode(face);

    Simulate.mouseDown(faceNode, { button: RIGHT_MOUSE });
    Simulate.mouseMove(faceNode, { offsetX: 136, offsetY: 15 });
    expect(onClick.mock.calls.length).toBe(0);
  });

  it('calls the onClick prop with the selected time on touchmove until the touchend event', () => {
    const onClick = jest.fn();
    const face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onClick={onClick} timePeriod="A" />
    );
    face.setState({ radius: 136 });

    const faceNode = findDOMNode(face);

    Simulate.touchMove(faceNode, { offsetX: 136, offsetY: 15 });
    expect(onClick.mock.calls.length).toBe(0);

    Simulate.touchStart(faceNode);
    Simulate.touchMove(faceNode, { offsetX: 136, offsetY: 15 });
    expect(onClick.mock.calls.length).toBe(1);

    Simulate.touchMove(faceNode, { offsetX: 120, offsetY: 20 });
    expect(onClick.mock.calls.length).toBe(2);

    Simulate.touchEnd(faceNode, { offsetX: 125, offsetY: 25 });
    expect(onClick.mock.calls.length).toBe(3);

    Simulate.touchMove(faceNode, { offsetX: 130, offsetY: 30 });
    expect(onClick.mock.calls.length).toBe(3);
  });
});
