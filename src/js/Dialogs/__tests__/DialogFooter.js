/* eslint-env jest */
jest.unmock('../DialogFooter');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import DialogFooter from '../DialogFooter';

const PROPS = { actions: [{ label: 'a' }] };

describe('DialogFooter', () => {
  it('merges className and style', () => {
    const props = Object.assign({}, PROPS, {
      style: { background: 'black' },
      className: 'test',
    });

    const dialogFooter = renderIntoDocument(<DialogFooter {...props} />);

    const dialogFooterNode = findDOMNode(dialogFooter);
    expect(dialogFooterNode.style.background).toBe(props.style.background);
    expect(dialogFooterNode.className).toContain(props.className);
  });

  it('renders as null if there are no actions', () => {
    const footer = renderIntoDocument(<DialogFooter />);
    const node = findDOMNode(footer);
    expect(node).toBe(null);
  });
});
