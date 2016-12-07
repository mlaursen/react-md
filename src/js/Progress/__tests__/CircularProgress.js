/* eslint-env jest */
jest.unmock('../CircularProgress');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import CircularProgress from '../CircularProgress';

describe('CircularProgress', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
      id: 'test',
    };

    const circularProgress = renderIntoDocument(<CircularProgress {...props} />);

    const circularProgressNode = findDOMNode(circularProgress);
    expect(circularProgressNode.style.background).toBe(props.style.background);
    expect(circularProgressNode.className).toContain(props.className);
  });

  it('converts to a determinate progress when the value is defined', () => {
    const props = { id: 'woop', value: 0 };
    const progress = renderIntoDocument(<CircularProgress {...props} />);

    const progressNode = findDOMNode(progress);
    expect(progressNode.className).toContain('determinate');
  });
});
