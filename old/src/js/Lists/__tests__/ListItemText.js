/* eslint-env jest */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';

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
