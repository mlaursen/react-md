/* eslint-env jest*/
import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
} from 'react-dom/test-utils';

import CalendarDate from '../CalendarDate';
import DateTimeFormat from '../../utils/DateUtils/DateTimeFormat';

jest.mock('../../utils/DateUtils/DateTimeFormat');

describe('CalendarDate', () => {
  it('merges className', () => {
    const props = {
      className: 'test-calendar-date-class',
      DateTimeFormat,
      locales: 'en-US',
      date: new Date(2016, 1, 1),
      disabled: false,
      onClick: jest.fn(),
    };

    const date = renderIntoDocument(<CalendarDate {...props} />);
    const node = findDOMNode(date);
    const button = node.children[0];
    expect(button.classList.contains(props.className)).toBe(true);
  });

  it('calls the onClick prop with the date prop when not disabled', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      date: new Date(2016, 1, 1),
      disabled: false,
      onClick: jest.fn(),
    };

    let date = renderIntoDocument(<CalendarDate {...props} />);
    let dateNode = findDOMNode(date);
    let button = dateNode.children[0];
    Simulate.click(button);
    expect(props.onClick.mock.calls.length).toBe(1);

    const newProps = Object.assign({}, props, { disabled: true });
    date = renderIntoDocument(<CalendarDate {...newProps} />);
    dateNode = findDOMNode(date);
    button = dateNode.children[0];
    Simulate.click(button);
    expect(props.onClick.mock.calls.length).toBe(1);
  });

  it('formats the date as the state', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      date: new Date(2016, 1, 1),
      disabled: false,
      onClick: jest.fn(),
    };

    const date = renderIntoDocument(<CalendarDate {...props} />);
    expect(date.state.date).toBe('');
  });
});
