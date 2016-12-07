/* eslint-env jest*/
jest.unmock('../PickerControl');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
} from 'react-addons-test-utils';

import PickerControl from '../PickerControl';

describe('PickerControl', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const pickerControl = renderIntoDocument(
      <PickerControl
        style={style}
        className={className}
        active={false}
        onClick={jest.fn()}
      >
        A
      </PickerControl>
    );

    const pickerControlNode = findDOMNode(pickerControl);
    expect(pickerControlNode.style.display).toBe(style.display);
    expect(pickerControlNode.classList.contains(className)).toBe(true);
  });

  it('calls the onClick function when clicked', () => {
    const onClick = jest.fn();
    const pickerControl = renderIntoDocument(
      <PickerControl active={false} onClick={onClick}>A</PickerControl>
    );

    const pickerControlNode = findDOMNode(pickerControl);
    Simulate.click(pickerControlNode);
    expect(onClick.mock.calls.length).toBe(1);
  });
});
