/* eslint-env jest*/
jest.unmock('../ClockFace');

import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import ClockFace from '../ClockFace';
import ClockTime from '../ClockTime';
import ClockHand from '../ClockHand';

describe('ClockFace', () => {
  it('renders a 12 hour clock if there is a time period prop and is not displayed in minutes', () => {
    const onChange = jest.fn();
    const face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onChange={onChange} timePeriod="AM" />
    );

    const times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times.length).toBe(12);
  });

  it('renders a 24 hour clock if there is not a time period prop and is not displayed in minutes', () => {
    const onChange = jest.fn();
    const face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onChange={onChange} />
    );

    const times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times.length).toBe(24);
  });

  it('renders minutes in 5 minute increments starting from 0', () => {
    const onChange = jest.fn();
    let face = renderIntoDocument(
      <ClockFace time={3} minutes onChange={onChange} />
    );

    let times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times.length).toBe(60 / 5);

    face = renderIntoDocument(
      <ClockFace time={3} minutes onChange={onChange} timePeriod="AM" />
    );

    times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times.length).toBe(60 / 5);
  });

  it('sets the prop active for the correct time', () => {
    const onChange = jest.fn();
    let face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onChange={onChange} />
    );

    let times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times[2].props.active).toBe(true);

    face = renderIntoDocument(
      <ClockFace time={3} minutes={false} onChange={onChange} timePeriod="AM" />
    );

    times = scryRenderedComponentsWithType(face, ClockTime);
    expect(times[2].props.active).toBe(true);
  });

  it('renders a clock hand component', () => {
    const props = {
      onChange: jest.fn(),
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
});
