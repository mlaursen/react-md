/* eslint-env jest */
jest.unmock('../Ink');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import Ink from '../Ink';

describe('Ink', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
      left: 0,
      top: 0,
      size: 0,
      transitionOverlap: 0,
      transitionEnterTimeout: 0,
      transitionLeaveTimeout: 0,
    };

    const ink = renderIntoDocument(<Ink {...props} />);

    const inkNode = findDOMNode(ink);
    expect(inkNode.style.background).toBe(props.style.background);
    expect(inkNode.className).toContain(props.className);
  });
});
