/* eslint-env jest*/
jest.unmock('../ClockHand');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import ClockHand from '../ClockHand';

describe('ClockHand', () => {
  it('positions the hand from the given coordinates', () => {
    const hand = renderIntoDocument(
      <ClockHand coords={136} time={1} minutes={false} />
    );

    const { left, top } = findDOMNode(hand).style;
    expect(left).toBe('136px');
    expect(top).toBe('136px');
  });

  it('adds the className inner-hour if the time is on a 24 hour clock', () => {
    let hand = renderIntoDocument(
      <ClockHand coords={136} time={1} minutes={false} />
    );

    let className = findDOMNode(hand).className;
    expect(className).toContain('md-clock-hand');
    expect(className).not.toContain('inner');

    hand = renderIntoDocument(
      <ClockHand coords={136} time={13} minutes={false} />
    );

    className = findDOMNode(hand).className;
    expect(className).toContain('md-clock-hand');
    expect(className).toContain('inner');

    hand = renderIntoDocument(
      <ClockHand coords={136} time={24} minutes={false} />
    );

    className = findDOMNode(hand).className;
    expect(className).toContain('md-clock-hand');
    expect(className).toContain('inner');

    hand = renderIntoDocument(
      <ClockHand coords={136} time={1} minutes={false} />
    );

    className = findDOMNode(hand).className;
    expect(className).toContain('md-clock-hand');
    expect(className).not.toContain('inner');
  });

  it('adds the className minute-hover when the hand is on a minute that is not divisible by 5', () => {
    let hand = renderIntoDocument(
      <ClockHand coords={136} time={0} minutes />
    );

    let className = findDOMNode(hand).className;
    expect(className).toContain('md-clock-hand');
    expect(className).not.toContain('minute-hover');

    hand = renderIntoDocument(
      <ClockHand coords={136} time={2} minutes />
    );

    className = findDOMNode(hand).className;
    expect(className).toContain('md-clock-hand');
    expect(className).toContain('minute-hover');

    hand = renderIntoDocument(
      <ClockHand coords={136} time={59} minutes />
    );

    className = findDOMNode(hand).className;
    expect(className).toContain('md-clock-hand');
    expect(className).toContain('minute-hover');

    hand = renderIntoDocument(
      <ClockHand coords={136} time={30} minutes />
    );

    className = findDOMNode(hand).className;
    expect(className).toContain('md-clock-hand');
    expect(className).not.toContain('minute-hover');
  });

  it('sets the transform style to the correct degrees for a time', () => {
    let hand = renderIntoDocument(<ClockHand coords={136} time={3} minutes={false} />);
    let { transform } = findDOMNode(hand).style;

    expect(transform).toBe('rotate3d(0, 0, 1, 0deg)');

    hand = renderIntoDocument(<ClockHand coords={136} time={2} minutes={false} />);
    transform = findDOMNode(hand).style.transform;

    expect(transform).toBe('rotate3d(0, 0, 1, -30deg)');
  });
});
