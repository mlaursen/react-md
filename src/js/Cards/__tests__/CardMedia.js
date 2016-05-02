/*eslint-env jest*/
jest.unmock('../CardMedia');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import CardMedia from '../CardMedia';

describe('CardMedia', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const media = renderIntoDocument(
      <CardMedia className={className} style={style} />
    );

    const mediaNode = findDOMNode(media);
    expect(mediaNode.style.display).toBe(style.display);
    expect(mediaNode.classList.contains(className)).toBe(true);
  });

  it('allows for normal event listeners to be passed to the media component', () => {
    const onClick = jest.genMockFunction();
    const onMouseDown = jest.genMockFunction();
    const onMouseUp = jest.genMockFunction();
    const onMouseOver = jest.genMockFunction();
    const onMouseLeave = jest.genMockFunction();
    const onTouchStart = jest.genMockFunction();
    const onTouchEnd = jest.genMockFunction();
    const onTouchCancel = jest.genMockFunction();

    const media = renderIntoDocument(
      <CardMedia
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

    const mediaNode = findDOMNode(media);
    Simulate.click(mediaNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(mediaNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(mediaNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(mediaNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(mediaNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(mediaNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(mediaNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(mediaNode);
    expect(onTouchCancel).toBeCalled();
  });

  it('forces an aspect ratio unless the force aspect prop is set to false', () => {
    const className = 'md-media-' + CardMedia.aspect.wide;
    let media = renderIntoDocument(<CardMedia />);
    let mediaNode = findDOMNode(media);
    expect(mediaNode.classList.contains(className)).toBe(true);

    media = renderIntoDocument(<CardMedia forceAspect={false} />);
    mediaNode = findDOMNode(media);
    expect(mediaNode.classList.contains(className)).toBe(false);
  });

  it('allows for an overlay over the media', () => {
    const src = 'test.jpg';
    const overlay = <p>Hello</p>;
    const media = renderIntoDocument(
      <CardMedia overlay={overlay}>
        <img src={src} />
      </CardMedia>
    );

    const overlayNode = scryRenderedDOMComponentsWithClass(media, 'md-card-media-overlay');
    expect(overlayNode.length).toBe(1);
    expect(overlayNode[0].textContent).toBe('Hello');
  });
});
