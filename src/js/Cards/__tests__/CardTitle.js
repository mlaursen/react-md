/*eslint-env jest*/
jest.unmock('../Card');
jest.unmock('../CardTitle');
jest.unmock('../../Avatars/Avatar.js');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import Card from '../Card';
import CardTitle from '../CardTitle';
import Avatar from '../../Avatars/Avatar';

describe('CardTitle', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const card = renderIntoDocument(
      <Card>
        <CardTitle title="Test" className={className} style={style} />
      </Card>
    );

    const titleNode = findRenderedDOMComponentWithClass(card, 'md-card-title');
    expect(titleNode.style.display).toBe(style.display);
    expect(titleNode.classList.contains(className)).toBe(true);
  });

  it('allows for normal event listeners to be passed to the title component', () => {
    const onClick = jest.genMockFunction();
    const onMouseDown = jest.genMockFunction();
    const onMouseUp = jest.genMockFunction();
    const onMouseOver = jest.genMockFunction();
    const onMouseLeave = jest.genMockFunction();
    const onTouchStart = jest.genMockFunction();
    const onTouchEnd = jest.genMockFunction();
    const onTouchCancel = jest.genMockFunction();

    const card = renderIntoDocument(
      <Card>
        <CardTitle
          title="Test"
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchCancel}
        />
      </Card>
    );

    const titleNode = findRenderedDOMComponentWithClass(card, 'md-card-title');
    Simulate.click(titleNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(titleNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(titleNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(titleNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(titleNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(titleNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(titleNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(titleNode);
    expect(onTouchCancel).toBeCalled();
  });

  it('renders a title and an optional subtitle', () => {
    const card = renderIntoDocument(
      <Card>
        <CardTitle title="Test" subtitle="Test 2" />
      </Card>
    );

    const title = findRenderedDOMComponentWithClass(card, 'md-headline');
    const subtitle = findRenderedDOMComponentWithClass(card, 'md-subheader');
    expect(title.textContent).toBe('Test');
    expect(subtitle.textContent).toBe('Test 2');
  });

  it('renders an optional avatar before the titles', () => {
    const card = renderIntoDocument(
      <Card>
        <CardTitle
          avatar={<Avatar>C</Avatar>}
          title="Test"
        />
      </Card>
    );

    const children = findDOMNode(card).childNodes[0].childNodes;
    expect(children[0].classList.contains('md-avatar')).toBe(true);
    expect(children[1].textContent).toBe('Test');
  });

  it('renders any additional children after the titles', () => {
    const card = renderIntoDocument(
      <Card>
        <CardTitle title="test">
          <button className="test">Test Button</button>
        </CardTitle>
      </Card>
    );

    const children = findDOMNode(card).childNodes[0].childNodes;
    expect(children[0].textContent).toBe('test');
    expect(children[1].textContent).toBe('Test Button');
  });

  it('updates the className to include title-large if there is an avatar', () => {
    let card = renderIntoDocument(
      <Card>
        <CardTitle title="Test" />
      </Card>
    );

    let titleNode = findRenderedDOMComponentWithClass(card, 'md-card-title');
    expect(titleNode.classList.contains('title-large')).toBe(false);

    card = renderIntoDocument(
      <Card>
        <CardTitle title="Test" avatar={<Avatar>C</Avatar>} />
      </Card>
    );

    titleNode = findRenderedDOMComponentWithClass(card, 'md-card-title');
    expect(titleNode.classList.contains('title-large')).toBe(true);
  });

  it('updates the className to include card-expander if it is an expander', () => {
    const card = renderIntoDocument(
      <Card>
        <CardTitle title="Test" isExpander={true} />
      </Card>
    );

    const titleNode = findRenderedDOMComponentWithClass(card, 'md-card-title');
    expect(titleNode.classList.contains('card-expander')).toBe(true);
  });
});
