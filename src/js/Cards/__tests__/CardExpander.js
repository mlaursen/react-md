/* eslint-env jest*/
jest.unmock('../CardExpander');
jest.unmock('../Card');
jest.unmock('../CardActions');
jest.unmock('../../Buttons');
jest.unmock('../../Buttons/IconButton');
jest.unmock('../../FontIcons');
jest.unmock('../../FontIcons/FontIcon');

import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import Card from '../Card';
import CardActions from '../CardActions';

describe('CardExpander', () => {
  it('allows for a customizable expander icon', () => {
    let card = renderIntoDocument(<Card><CardActions isExpander /></Card>);
    let icon = findRenderedDOMComponentWithClass(card, 'md-icon');
    expect(icon.classList.contains('material-icons')).toBe(true);
    expect(icon.textContent).toBe('keyboard_arrow_down');

    card = renderIntoDocument(
      <Card iconClassName="fa fa-github" iconChildren={null}>
        <CardActions isExpander />
      </Card>
    );

    icon = findRenderedDOMComponentWithClass(card, 'md-icon');
    expect(icon.classList.contains('fa')).toBe(true);
    expect(icon.classList.contains('fa-github')).toBe(true);
    expect(icon.textContent).toBe('');
  });

  it('allows for an optional onExpanderClick function', () => {
    const onClick = jest.fn();
    const card = renderIntoDocument(
      <Card onExpanderClick={onClick}>
        <CardActions isExpander />
      </Card>
    );

    const expander = findRenderedDOMComponentWithClass(card, 'md-icon-btn');
    Simulate.click(expander);

    expect(onClick.mock.calls.length).toBe(1);
  });
});
