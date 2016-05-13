/*eslint-env jest*/
jest.unmock('../Toolbar');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import Toolbar from '../Toolbar';

describe('Toolbar', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const containerStyle = { background: 'black' };
    const containerClassName = 'container-test';
    const toolbar = renderIntoDocument(
      <Toolbar
        style={style}
        className={className}
        containerStyle={containerStyle}
        containerClassName={containerClassName}
      />
    );

    const containerNode = findDOMNode(toolbar);
    const toolbarNode = findRenderedDOMComponentWithClass(toolbar, 'md-toolbar');
    expect(containerNode.style.background).toBe(containerStyle.background);
    expect(containerNode.classList.contains(containerClassName)).toBe(true);

    expect(toolbarNode.style.display).toBe(style.display);
    expect(toolbarNode.classList.contains(className)).toBe(true);
  });
});
