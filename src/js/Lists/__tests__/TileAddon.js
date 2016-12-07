/* eslint-env jest */
jest.unmock('../TileAddon');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import TileAddon from '../TileAddon';

describe('TileAddon', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
      icon: 'a',
    };

    const tileAddon = renderIntoDocument(<TileAddon {...props} />);

    const tileAddonNode = findDOMNode(tileAddon);
    expect(tileAddonNode.style.background).toBe(props.style.background);
    expect(tileAddonNode.className).toContain(props.className);
  });

  it('returns null if an icon or avatar is not specified', () => {
    const addon = renderIntoDocument(<TileAddon />);
    const addonNode = findDOMNode(addon);
    expect(addonNode).toBe(null);
  });
});
