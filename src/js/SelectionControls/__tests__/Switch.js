/* eslint-env jest*/
jest.unmock('../Switch');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import Switch from '../Switch';

describe('Switch', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const switchR = renderIntoDocument(
      <Switch style={style} className={className} />
    );

    const switchNode = findDOMNode(switchR);
    expect(switchNode.style.display).toBe(style.display);
    expect(switchNode.classList.contains(className)).toBe(true);
  });

  it('calls the onChange function with the next toggled state and the click event', () => {
    const onChange = jest.fn();
    const switchR = renderIntoDocument(<Switch onChange={onChange} />);

    const switchInput = findRenderedDOMComponentWithTag(switchR, 'input');
    Simulate.change(switchInput, { target: { checked: true } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe(true);
    expect(onChange.mock.calls[0][1]).toBeDefined();
  });
});
