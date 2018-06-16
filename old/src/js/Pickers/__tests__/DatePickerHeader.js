/* eslint-env jest*/
import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-dom/test-utils';

import DatePickerHeader from '../DatePickerHeader';
import PickerControl from '../PickerControl';

import DateTimeFormat from '../../utils/DateUtils/DateTimeFormat';

jest.mock('../../utils/DateUtils/DateTimeFormat');

describe('DatePickerHeader', () => {
  it('merges className', () => {
    const props = {
      className: 'test-header-class',
      calendarTempDate: new Date(2016, 1, 1),
      locales: 'en-US',
      changeCalendarMode: jest.fn(),
      calendarMode: 'year',
      DateTimeFormat,
    };

    const header = renderIntoDocument(<DatePickerHeader {...props} />);
    const node = findDOMNode(header);
    expect(node.classList.contains(props.className)).toBe(true);
  });

  it('displays a picker control for selecting the year and a picker control for selecting the calendar', () => {
    const props = {
      changeCalendarMode: jest.fn(),
      DateTimeFormat,
      locales: 'en-US',
      calendarTempDate: new Date(2016, 1, 1),
      calendarMode: 'year',
    };

    const header = renderIntoDocument(<DatePickerHeader {...props} />);
    const controls = scryRenderedComponentsWithType(header, PickerControl);
    expect(controls.length).toBe(2);

    const [year, calendar] = controls;
    expect(year.props.onClick).toBe(header._selectYear);
    expect(calendar.props.onClick).toBe(header._selectCalendar);
  });

  it('formats the calendar temp date', () => {
    const props = {
      calendarTempDate: new Date(2016, 1, 1),
      locales: 'en-US',
      changeCalendarMode: jest.fn(),
      calendarMode: 'year',
      DateTimeFormat,
    };

    const header = renderIntoDocument(<DatePickerHeader {...props} />);

    const [time, weekday, date] = DateTimeFormat.mock.calls;
    expect(time[0]).toBe(props.locales);
    expect(time[1]).toEqual({ year: 'numeric' });

    expect(weekday[0]).toBe(props.locales);
    expect(weekday[1]).toEqual({ weekday: 'short' });

    expect(date[0]).toBe(props.locales);
    expect(date[1]).toEqual({ month: 'short', day: '2-digit' });

    expect(header.state.year).toBe('');
    expect(header.state.weekday).toBe('');
    expect(header.state.date).toBe('');
  });
});
