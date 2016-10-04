/* eslint-env jest */
jest.unmock('../CardTitle');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import CardTitle from '../CardTitle';
import CardTitleBlock from '../CardTitleBlock';

describe('CardTitle', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
      title: 'Woop',
    };

    const cardTitle = renderIntoDocument(<CardTitle {...props} />);

    const cardTitleNode = findDOMNode(cardTitle);
    expect(cardTitleNode.style.background).toBe(props.style.background);
    expect(cardTitleNode.className).toContain(props.className);
  });

  it('renders the CardTitleBlock with the correct props', () => {
    const props = { title: 'Woop', id: 'boop', subtitle: 'noop' };
    const title = renderIntoDocument(<CardTitle {...props} />);
    const blocks = scryRenderedComponentsWithType(title, CardTitleBlock);
    expect(blocks.length).toBe(1);

    const bProps = blocks[0].props;
    expect(bProps.id).toBe(props.id);
    expect(bProps.title).toBe(props.title);
    expect(bProps.subtitle).toBe(props.subtitle);
  });
});
