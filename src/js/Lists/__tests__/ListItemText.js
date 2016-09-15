/* eslint-env jest */
jest.unmock('../ListItemText');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import ListItemText from '../ListItemText';

describe('ListItemText', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
      primaryText: 'woop',
    };

    const listItemText = renderIntoDocument(<ListItemText {...props} />);

    const listItemTextNode = findDOMNode(listItemText);
    expect(listItemTextNode.style.background).toBe(props.style.background);
    expect(listItemTextNode.className).toContain(props.className);
  });
});
