/* eslint-env jest*/
jest.unmock('../Year');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
} from 'react-addons-test-utils';

import Year from '../Year';

describe('Year', () => {
  it('calls the onClick function when clicked', () => {
    const onClick = jest.fn();
    const year = renderIntoDocument(
      <Year year={2000} onClick={onClick} active={false} />
    );

    const yearNode = findDOMNode(year);
    Simulate.click(yearNode);
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('renders the year as children', () => {
    const year = renderIntoDocument(
      <Year year={2000} onClick={jest.fn()} active={false} />
    );

    const yearNode = findDOMNode(year);
    expect(yearNode.textContent).toBe('2000');
  });
});
