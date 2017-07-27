/* eslint-env jest */
import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
} from 'react-dom/test-utils';

import Paper from '../Paper';

describe('Paper', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
    };

    const paper = renderIntoDocument(<Paper {...props} />);

    const paperNode = findDOMNode(paper);
    expect(paperNode.style.background).toBe(props.style.background);
    expect(paperNode.className).toContain(props.className);
  });
});
