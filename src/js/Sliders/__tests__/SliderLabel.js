/* eslint-env jest */
jest.unmock('../SliderLabel');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import SliderLabel from '../SliderLabel';

describe('SliderLabel', () => {
  it('returns null if there are no children', () => {
    let label = renderIntoDocument(<SliderLabel htmlFor="d">Hello</SliderLabel>);
    let labelNode = findDOMNode(label);
    expect(labelNode).not.toBe(null);

    label = renderIntoDocument(<SliderLabel />);
    labelNode = findDOMNode(label);
    expect(labelNode).toBe(null);
  });
});
