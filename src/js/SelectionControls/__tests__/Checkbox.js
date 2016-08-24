/* eslint-env jest*/
jest.unmock('../Checkbox');
jest.unmock('../ControlContainer');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const checkbox = renderIntoDocument(
      <Checkbox style={style} className={className} value="A" />
    );

    const checkboxNode = findDOMNode(checkbox);
    expect(checkboxNode.style.display).toBe(style.display);
    expect(checkboxNode.classList.contains(className)).toBe(true);
  });

  it('calls the onChange function prop with the next checked state and the event', () => {
    const onChange = jest.fn();
    const checkbox = renderIntoDocument(<Checkbox onChange={onChange} value="A" />);

    const input = findRenderedDOMComponentWithTag(checkbox, 'input');
    Simulate.change(input, { target: { checked: true } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe(true);
  });
});
