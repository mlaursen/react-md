/* eslint-env jest*/
jest.unmock('../Subheader');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
} from 'react-addons-test-utils';

import Subheader from '../Subheader';

describe('Subheader', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const subheader = renderIntoDocument(
      <Subheader style={style} className={className} primaryText="A" />
    );

    const subheaderNode = findDOMNode(subheader);
    expect(subheaderNode.style.display).toBe(style.display);
    expect(subheaderNode.classList.contains(className)).toBe(true);
  });

  it('can render as different components', () => {
    let subheader = renderIntoDocument(<Subheader primaryText="A" />);

    let subheaderNode = findDOMNode(subheader);
    expect(subheaderNode.tagName).toBe(Subheader.defaultProps.component.toUpperCase());

    subheader = renderIntoDocument(
      <Subheader primaryText="A" component="h5" />
    );

    subheaderNode = findDOMNode(subheader);
    expect(subheaderNode.tagName).toBe('H5');
  });
});
