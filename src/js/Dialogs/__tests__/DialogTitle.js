/* eslint-env jest */
jest.unmock('../DialogTitle');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import DialogTitle from '../DialogTitle';

describe('DialogTitle', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
      children: 'woop',
    };

    const dialogTitle = renderIntoDocument(<DialogTitle {...props} />);

    const dialogTitleNode = findDOMNode(dialogTitle);
    expect(dialogTitleNode.style.background).toBe(props.style.background);
    expect(dialogTitleNode.className).toContain(props.className);
  });

  it('renders as null if there are no chldren', () => {
    const title = renderIntoDocument(<DialogTitle />);
    const node = findDOMNode(title);
    expect(node).toBe(null);
  });
});
