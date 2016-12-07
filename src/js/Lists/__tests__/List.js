/* eslint-env jest */
jest.unmock('../List');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import List from '../List';

describe('List', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
    };

    const list = renderIntoDocument(<List {...props} />);

    const listNode = findDOMNode(list);
    expect(listNode.style.background).toBe(props.style.background);
    expect(listNode.className).toContain(props.className);
  });
});
