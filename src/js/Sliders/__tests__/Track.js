/* eslint-env jest */
jest.unmock('../Track');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import Track from '../Track';
import TrackFill from '../TrackFill';
import Thumb from '../Thumb';
import ThumbMask from '../ThumbMask';
import DiscreteValue from '../DiscreteValue';

const PROPS = {
  thumbLeft: '',
  value: 100,
  trackFillWidth: '100%',
  onThumbKeyDown: jest.fn(),
  onThumbKeyUp: jest.fn(),
  onThumbFocus: jest.fn(),
  valuePrecision: 0,
};

describe('Track', () => {
  it('merges className and style', () => {
    const props = Object.assign({}, PROPS, {
      style: { display: 'block' },
      className: 'test',
    });
    const track = renderIntoDocument(<Track {...props} />);
    const trackNode = findDOMNode(track);
    expect(trackNode.style.display).toBe(props.style.display);
    expect(trackNode.className).toContain(props.className);
  });

  it('renders the TrackFill component', () => {
    const track = renderIntoDocument(<Track {...PROPS} />);

    const fills = scryRenderedComponentsWithType(track, TrackFill);
    expect(fills.length).toBe(1);
  });

  it('renders the Thumb component', () => {
    const track = renderIntoDocument(<Track {...PROPS} />);

    const thumbs = scryRenderedComponentsWithType(track, Thumb);
    expect(thumbs.length).toBe(1);
  });

  it('renders the DiscreteValue component', () => {
    const track = renderIntoDocument(<Track {...PROPS} />);

    const values = scryRenderedComponentsWithType(track, DiscreteValue);
    expect(values.length).toBe(1);
  });

  it('renders the ThumbMask component', () => {
    const track = renderIntoDocument(<Track {...PROPS} />);

    const masks = scryRenderedComponentsWithType(track, ThumbMask);
    expect(masks.length).toBe(1);
  });

  it('renders discrete ticks when discrete, not disabled, and the discreteTicks prop is st', () => {
    const props = Object.assign({}, PROPS, {
      discrete: true,
      step: 10,
      tickWidth: 6,
      scale: 10,
      discreteTicks: 10,
    });

    let track = renderIntoDocument(<Track {...props} />);
    let ticks = scryRenderedDOMComponentsWithClass(track, 'md-slider-discrete-tick');

    expect(ticks.length).toBe(11);

    props.disabled = true;
    track = renderIntoDocument(<Track {...props} />);
    ticks = scryRenderedDOMComponentsWithClass(track, 'md-slider-discrete-tick');
    expect(ticks.length).toBe(0);

    props.disabled = false;
    props.discrete = false;
    track = renderIntoDocument(<Track {...props} />);
    ticks = scryRenderedDOMComponentsWithClass(track, 'md-slider-discrete-tick');
    expect(ticks.length).toBe(0);
  });
});
