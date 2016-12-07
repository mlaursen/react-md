/* eslint-env jest */
jest.unmock('../Media');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import Media from '../Media';

describe('Media', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
    };

    const media = renderIntoDocument(<Media {...props} />);

    const mediaNode = findDOMNode(media);
    expect(mediaNode.style.background).toBe(props.style.background);
    expect(mediaNode.className).toContain(props.className);
  });

  it('applies the aspect ratio class name when the forceAspect prop is true', () => {
    const props = { aspectRatio: '16-9', forceAspect: false };
    let media = renderIntoDocument(<Media {...props} />);
    let mediaNode = findDOMNode(media);
    expect(mediaNode.className).not.toContain(props.aspectRatio);

    props.forceAspect = true;
    media = renderIntoDocument(<Media {...props} />);
    mediaNode = findDOMNode(media);
    expect(mediaNode.className).toContain(props.aspectRatio);
  });
});
