/* eslint-env jest */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';

import InkContainer from '../InkContainer';

describe('InkContainer', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
    };

    const inkContainer = renderIntoDocument(<InkContainer {...props} />);

    const inkContainerNode = findDOMNode(inkContainer);
    expect(inkContainerNode.style.background).toBe(props.style.background);
    expect(inkContainerNode.className).toContain(props.className);
  });
});
