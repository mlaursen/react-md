/* eslint-env jest*/
import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-dom/test-utils';

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

  it('should use "progressClassName" property', () => {
    const progressClassName = 'enhanced-progress-bar';
    const progress = renderIntoDocument(
      <LinearProgress id="test" value={1} progressClassName={progressClassName} />
    );

    const progressNode = findRenderedDOMComponentWithClass(progress, 'md-progress--linear-active');
    expect(progressNode.classList.contains(progressClassName)).toBe(true);
  });

  it('should run function specified in "progressClassName" property to get progress className', () => {
    const value = 7;
    const baseclassName = 'progress-value-';
    const progressClassName = (progressValue) => `${baseclassName}${progressValue}`;
    const progress = renderIntoDocument(
      <LinearProgress id="test" value={value} progressClassName={progressClassName} />
    );

    const progressNode = findRenderedDOMComponentWithClass(progress, 'md-progress--linear-active');
    expect(progressNode.classList.contains(`${baseclassName}${value}`)).toBe(true);
  });

  it('should use "progressStyle" property', () => {
    const value = 2;
    const progressStyle = { height: '10px' };
    const progress = renderIntoDocument(
      <LinearProgress id="test" value={value} progressStyle={progressStyle} />
    );

    const progressNodeStyle = findRenderedDOMComponentWithClass(progress, 'md-progress--linear-active').style;
    expect(progressNodeStyle.height).toBe(progressStyle.height);
    expect(progressNodeStyle.width).toBe(`${value}%`);
  });

  it('should run function specified in "progressStyle" property to get progress style', () => {
    const value = 8;
    const width = '3px';
    const progressStyle = (progressValue) => ({
      height: `${progressValue}%`,
      width,
    });
    const progress = renderIntoDocument(
      <LinearProgress id="test" value={value} progressStyle={progressStyle} />
    );

    const progressNodeStyle = findRenderedDOMComponentWithClass(progress, 'md-progress--linear-active').style;
    expect(progressNodeStyle.height).toBe(`${value}%`);
    expect(progressNodeStyle.width).toBe(width);
  });
});
