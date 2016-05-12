/*eslint-env jest*/
jest.unmock('../CircularProgress');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
} from 'react-addons-test-utils';

import CircularProgress from '../CircularProgress';

describe('CircularProgress', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const circularProgress = renderIntoDocument(
      <CircularProgress style={style} className={className} />
    );

    const circularProgressNode = findDOMNode(circularProgress);
    expect(circularProgressNode.style.display).toBe(style.display);
    expect(circularProgressNode.classList.contains(className)).toBe(true);
  });

  it('converts to a determinate progress if there is a value', () => {
    const progress = renderIntoDocument(
      <CircularProgress value={0} />
    );

    const progressNode = findDOMNode(progress);
    expect(progressNode.classList.contains('determinate')).toBe(true);
  });

  it('combines the existing transform style in a determinate circular progress', () => {
    const style = {
      WebkitTransform: 'transform3d(0, 22px, 0)',
      MozTransform: 'transform3d(0, 22px, 0)',
      transform: 'transform3d(0, 22px, 0)',
    };

    const progress = renderIntoDocument(
      <CircularProgress style={style} value={2} />
    );

    const progressNode = findDOMNode(progress);
    expect(progressNode.style.WebkitTransform).toContain(style.WebkitTransform);
    expect(progressNode.style.MozTransform).toContain(style.MozTransform);
    expect(progressNode.style.transform).toContain(style.transform);
  });

  it('allows the circular progress to be scaled', () => {
    const baseSize = 24;
    const scale = 1.5;
    const progress = renderIntoDocument(
      <CircularProgress scale={scale} />
    );

    const expected = (baseSize * scale) + '';
    const progressNode = findDOMNode(progress);
    expect(progressNode.getAttribute('width')).toBe(expected);
    expect(progressNode.getAttribute('height')).toBe(expected);
  });
});
