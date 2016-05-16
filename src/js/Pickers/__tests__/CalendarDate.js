/*eslint-env jest*/
jest.unmock('../CalendarDate');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
} from 'react-addons-test-utils';

import CalendarDate from '../CalendarDate';

describe('CalendarDate', () => {
  it('calls the onClick prop with the date prop when not disabled', () => {
    const DateTimeFormat = require('../__mocks__/DateTimeFormat');
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      date: new Date(2016, 1, 1),
      disabled: false,
      onClick: jest.genMockFunction(),
      index: 0,
    };

    let date = renderIntoDocument(<CalendarDate {...props} />);
    let dateNode = findDOMNode(date);
    Simulate.click(dateNode);
    expect(props.onClick.mock.calls.length).toBe(1);

    const newProps = Object.assign({}, props, { disabled: true });
    date = renderIntoDocument(<CalendarDate {...newProps} />);
    dateNode = findDOMNode(date);
    Simulate.click(dateNode);
    expect(props.onClick.mock.calls.length).toBe(1);
  });

  it('formats the date as the state', () => {
    const DateTimeFormat = require('../__mocks__/DateTimeFormat');
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      date: new Date(2016, 1, 1),
      disabled: false,
      onClick: jest.genMockFunction(),
      index: 0,
    };

    const date = renderIntoDocument(<CalendarDate {...props} />);
    expect(DateTimeFormat.mock.calls.length).toBe(1);
    expect(DateTimeFormat.mock.calls[0][0]).toBe(props.locales);
    expect(DateTimeFormat.mock.calls[0][1]).toEqual({ day: 'numeric' });
    expect(date.state.date).toBe('');
  });
});
