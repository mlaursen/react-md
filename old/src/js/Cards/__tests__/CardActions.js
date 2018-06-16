/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';

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
    const actions = shallow(<CardActions />, { iconChildren: 'woop' });
    expect(actions.find(CardExpander).length).toBe(0);
    actions.setProps({ expander: true });

    expect(actions.find(CardExpander).length).toBe(1);
  });
});
