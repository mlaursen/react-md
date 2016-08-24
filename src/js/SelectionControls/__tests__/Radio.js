/* eslint-env jest*/
jest.unmock('../Radio');
jest.unmock('../ControlContainer');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import Radio from '../Radio';

describe('Radio', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const radio = renderIntoDocument(
      <Radio style={style} className={className} value="A" />
    );

    const radioNode = findDOMNode(radio);
    expect(radioNode.style.display).toBe(style.display);
    expect(radioNode.classList.contains(className)).toBe(true);
  });

  it('calls the onChange function prop with the current value and the event', () => {
    const onChange = jest.fn();
    const radio = renderIntoDocument(<Radio onChange={onChange} value="A" />);

    const input = findRenderedDOMComponentWithTag(radio, 'input');
    Simulate.change(input, { target: { checked: true } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe('A');
  });
});
