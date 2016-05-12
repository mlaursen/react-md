/*eslint-env jest*/
jest.unmock('../Card');
jest.unmock('../CardActions');
jest.unmock('../CardTitle');
jest.unmock('../CardExpander');
jest.unmock('../CardText');
jest.unmock('../../Transitions');
jest.unmock('../../Transitions/Height');
jest.unmock('../../Buttons');
jest.unmock('../../Buttons/IconButton');
jest.unmock('../../FontIcons');
jest.unmock('../../FontIcons/FontIcon');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import Card from '../Card';
import CardActions from '../CardActions';
import CardTitle from '../CardTitle';
import CardText from '../CardText';
import CardExpander from '../CardExpander';
import Height from '../../Transitions/Height';

describe('Card', () => {
  it('merges className and style correctly', () => {
    const style = { display: 'block' };
    const className = 'test';
    const card = renderIntoDocument(
      <Card className={className} style={style} />
    );

    const cardNode = findDOMNode(card);

    expect(cardNode.style.display).toBe(style.display);
    expect(cardNode.classList.contains(className)).toBe(true);
  });

  it('adds the raise className unless disabled', () => {
    let card = renderIntoDocument(<Card />);
    let cardNode = findDOMNode(card);
    expect(cardNode.className).toBe('md-card raise');

    card = renderIntoDocument(<Card raise={false} />);
    cardNode = findDOMNode(card);
    expect(cardNode.className).toBe('md-card');
  });

  it('allows for normal event listeners to be passed to the card', () => {
    const onClick = jest.genMockFunction();
    const onMouseDown = jest.genMockFunction();
    const onMouseUp = jest.genMockFunction();
    const onMouseOver = jest.genMockFunction();
    const onMouseLeave = jest.genMockFunction();
    const onTouchStart = jest.genMockFunction();
    const onTouchEnd = jest.genMockFunction();
    const onTouchCancel = jest.genMockFunction();

    const card = renderIntoDocument(
      <Card
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      />
    );

    const cardNode = findDOMNode(card);
    Simulate.click(cardNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(cardNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(cardNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(cardNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(cardNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(cardNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(cardNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(cardNode);
    expect(onTouchCancel).toBeCalled();
  });

  it('injects a card expander into the CardActions compoennt if the prop isExpander is true', () => {
    const card = renderIntoDocument(
      <Card>
        <CardActions isExpander={true} />
      </Card>
    );

    const toggleNode = findRenderedComponentWithType(card, CardExpander);
    expect(toggleNode).toBeDefined();

  });

  it('injects a card expander into the CardTitle component if the prop isExpander is true', () => {
    const card = renderIntoDocument(
      <Card>
        <CardTitle title="Hello" isExpander={true} />
      </Card>
    );

    const toggleNode = findRenderedComponentWithType(card, CardExpander);
    expect(toggleNode).toBeDefined();
  });

  it('hides a any component after an expander if the card is not expanded', () => {
    const card = renderIntoDocument(
      <Card>
        <CardActions isExpander={true} />
        <CardText expandable={true}>Hello, World</CardText>
      </Card>
    );

    const text = scryRenderedComponentsWithType(card, CardText);
    expect(text.length).toBe(0);
  });

  it('wraps a child with the height transition if there is an expander and the card is expanded', () => {
    const card = renderIntoDocument(
      <Card initiallyExpanded={true}>
        <CardActions isExpander={true} />
        <CardText expandable={true}>Hello, World</CardText>
      </Card>
    );

    const height = scryRenderedComponentsWithType(card, Height);
    expect(height.length).toBe(1);
  });

  it('will still display any component that does not have expandabe set to true', () => {
    const card = renderIntoDocument(
      <Card>
        <CardActions isExpander={true} />
        <CardText>Hello, World</CardText>
        <CardText expandable={true}>Goodbye, World</CardText>
      </Card>
    );

    const cards = scryRenderedDOMComponentsWithClass(card, 'md-card-text');
    expect(cards.length).toBe(1);
    expect(cards[0].textContent).toBe('Hello, World');
  });
});
