/* eslint-env jest */
jest.unmock('../CardTitleBlock');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import CardTitleBlock from '../CardTitleBlock';

describe('CardTitleBlock', () => {
  it('renders an h2 tag if there is no subtitle', () => {
    const title = renderIntoDocument(<CardTitleBlock title="Woop" />);
    const node = findDOMNode(title);
    expect(node.tagName).toBe('H2');
  });

  it('renders an h2 tag and an h3 tag if there is a subtitle', () => {
    const props = { title: 'Woop', subtitle: 'Boop' };
    const title = renderIntoDocument(<CardTitleBlock {...props} />);
    const h2s = scryRenderedDOMComponentsWithTag(title, 'h2');
    const h3s = scryRenderedDOMComponentsWithTag(title, 'h3');
    expect(h2s.length).toBe(1);
    expect(h3s.length).toBe(1);
  });
});
