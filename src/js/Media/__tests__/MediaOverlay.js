/* eslint-env jest */
jest.unmock('../MediaOverlay');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import MediaOverlay from '../MediaOverlay';

describe('MediaOverlay', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
    };

    const mediaOverlay = renderIntoDocument(<MediaOverlay {...props} />);

    const mediaOverlayNode = findDOMNode(mediaOverlay);
    expect(mediaOverlayNode.style.background).toBe(props.style.background);
    expect(mediaOverlayNode.className).toContain(props.className);
  });
});
