/* eslint-env jest */
jest.unmock('../CardText');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import CardText from '../CardText';

describe('CardText', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
    };

    const cardText = renderIntoDocument(<CardText {...props} />);

    const cardTextNode = findDOMNode(cardText);
    expect(cardTextNode.style.background).toBe(props.style.background);
    expect(cardTextNode.className).toContain(props.className);
  });
});
