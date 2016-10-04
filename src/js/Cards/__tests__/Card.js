/* eslint-env jest */
jest.unmock('../Card');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
} from 'react-addons-test-utils';

import Card from '../Card';

describe('Card', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
    };

    const card = renderIntoDocument(<Card {...props} />);

    const cardNode = findDOMNode(card);
    expect(cardNode.style.background).toBe(props.style.background);
    expect(cardNode.className).toContain(props.className);
  });

  it('passes event listeners correctly', () => {
    const onClick = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();

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
});
