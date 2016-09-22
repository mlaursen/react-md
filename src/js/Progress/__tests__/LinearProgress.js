/* eslint-env jest*/
jest.unmock('../LinearProgress');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import LinearProgress from '../LinearProgress';

describe('LinearProgress', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const progress = renderIntoDocument(
      <LinearProgress id="test" style={style} className={className} />
    );

    const progressNode = findDOMNode(progress);
    expect(progressNode.style.display).toBe(style.display);
    expect(progressNode.classList.contains(className)).toBe(true);
  });

  it('converts to a determinate progress if there is a value', () => {
    const progress = renderIntoDocument(
      <LinearProgress id="test" value={0} />
    );

    const node = findDOMNode(progress).childNodes[0];
    expect(node.className).toContain('determinate');
  });

  it('updates the progress width based on the current value', () => {
    let value = 12;
    let progress = renderIntoDocument(
      <LinearProgress id="test" value={value} />
    );

    let progressNode = findRenderedDOMComponentWithClass(progress, 'md-progress--linear-determinate');
    expect(progressNode.style.width).toBe(`${value}%`);

    value = 0;
    progress = renderIntoDocument(
      <LinearProgress id="test" value={value} />
    );

    progressNode = findRenderedDOMComponentWithClass(progress, 'md-progress--linear-determinate');
    expect(progressNode.style.width).toBe(`${value}%`);
  });
});
