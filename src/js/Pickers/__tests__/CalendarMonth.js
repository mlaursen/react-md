/* eslint-env jest*/
/* eslint-disable global-require */
jest.unmock('../CalendarMonth');
jest.unmock('../../utils/dates');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import CalendarDate from '../CalendarDate';
import CalendarMonth from '../CalendarMonth';

describe('CalendarMonth', () => {
  it('merges className and style', () => {
    const DateTimeFormat = require('../__mocks__/DateTimeFormat');
    const style = { display: 'block' };
    const className = 'test';
    const props = {
      style,
      className,
      calendarDate: new Date(),
      calendarTempDate: new Date(),
      onCalendarDateClick: jest.fn(),
      DateTimeFormat,
      locales: 'en-US',
    };
    const calendarMonth = renderIntoDocument(<CalendarMonth {...props} />);

    const calendarMonthNode = findDOMNode(calendarMonth);
    expect(calendarMonthNode.style.display).toBe(style.display);
    expect(calendarMonthNode.classList.contains(className)).toBe(true);
  });

  it('renders the number of days in a month', () => {
    const DateTimeFormat = require('../__mocks__/DateTimeFormat');
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(2016, 3, 12),
      calendarTempDate: new Date(2016, 3, 12),
      onCalendarDateClick: jest.fn(),
    };

    const calendarMonth = renderIntoDocument(<CalendarMonth {...props} />);
    const days = scryRenderedComponentsWithType(calendarMonth, CalendarDate);
    expect(days.length).toBe(30);
    expect(days[11].props.className).toContain('active');
  });
});
