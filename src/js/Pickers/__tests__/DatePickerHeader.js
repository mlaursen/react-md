/*eslint-env jest*/
jest.unmock('../DatePickerHeader');

import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import DatePickerHeader from '../DatePickerHeader';
import PickerControl from '../PickerControl';

describe('DatePickerHeader', () => {
  it('displays a picker control for selecting the year and a picker control for selecting the calendar', () => {
    const DateTimeFormat = require('../__mocks__/DateTimeFormat');

    const props = {
      changeCalendarMode: jest.genMockFunction(),
      DateTimeFormat,
      locales: 'en-US',
      calendarTempDate: new Date(2016, 1, 1),
      calendarMode: 'year',
    };

    const header = renderIntoDocument(<DatePickerHeader {...props} />);
    const controls = scryRenderedComponentsWithType(header, PickerControl);
    expect(controls.length).toBe(2);

    const [year, calendar] = controls;
    expect(year.props.onClick).toBe(header.selectYear);
    expect(calendar.props.onClick).toBe(header.selectCalendar);
  });

  it('formats the calendar temp date', () => {
    const DateTimeFormat = require('../__mocks__/DateTimeFormat');
    const props = {
      calendarTempDate: new Date(2016, 1, 1),
      locales: 'en-US',
      changeCalendarMode: jest.genMockFunction(),
      calendarMode: 'year',
      DateTimeFormat,
    };

    const header = renderIntoDocument(<DatePickerHeader {...props} />);
    expect(DateTimeFormat.mock.calls.length).toBe(3);

    const [time, weekday, date] = DateTimeFormat.mock.calls;
    expect(time[0]).toBe(props.locales);
    expect(time[1]).toEqual({ year: 'numeric' });

    expect(weekday[0]).toBe(props.locales);
    expect(weekday[1]).toEqual({ weekday: 'short' });

    expect(date[0]).toBe(props.locales);
    expect(date[1]).toEqual({ month: 'short', day: '2-digit' });

    // Mock only returns the date back.
    expect(header.state.year).toBe(props.calendarTempDate);
    expect(header.state.weekday).toBe(props.calendarTempDate);
    expect(header.state.date).toBe(props.calendarTempDate);
  });
});
