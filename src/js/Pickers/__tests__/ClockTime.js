/* eslint-env jest*/
jest.unmock('../ClockTime');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import ClockTime from '../ClockTime';

describe('ClockTime', () => {
  it('displays the time', () => {
    const time = renderIntoDocument(
      <ClockTime time={1} index={0} active={false} radius={120} />
    );

    const timeNode = findDOMNode(time);
    expect(timeNode.textContent).toBe('1');
  });

  it('sets top and left style properties on mount', () => {
    const time = renderIntoDocument(
      <ClockTime time={1} index={0} active={false} radius={120} />
    );

    expect(time.state.style).toBeDefined();
    expect(time.state.style).not.toBe(null);
    expect(time.state.style.top).toBeDefined();
    expect(time.state.style.left).toBeDefined();
  });
});
