/* eslint-env jest */
jest.unmock('../CardActions');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import CardActions from '../CardActions';
import CardExpander from '../CardExpander';

describe('CardActions', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
    };

    const cardActions = renderIntoDocument(<CardActions {...props} />);

    const cardActionsNode = findDOMNode(cardActions);
    expect(cardActionsNode.style.background).toBe(props.style.background);
    expect(cardActionsNode.className).toContain(props.className);
  });

  it('renders the CardExpander component when the isExpander prop is true', () => {
    const props = { expander: false };
    let actions = renderIntoDocument(<CardActions {...props} />);
    let expanders = scryRenderedComponentsWithType(actions, CardExpander);
    expect(expanders.length).toBe(0);

    props.expander = true;
    actions = renderIntoDocument(<CardActions {...props} />);
    expanders = scryRenderedComponentsWithType(actions, CardExpander);
    expect(expanders.length).toBe(1);
  });
});
