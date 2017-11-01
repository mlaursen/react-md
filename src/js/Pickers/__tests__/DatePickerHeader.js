/* eslint-env jest*/
import React from 'react';
import { mount } from 'enzyme';

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
      timeZone: 'UTC',
      DateTimeFormat,
    };

    const header = mount(<DatePickerHeader {...props} />);
    expect(header.prop('className')).toContain(props.className);
  });

  it('displays a picker control for selecting the year and a picker control for selecting the calendar', () => {
    const props = {
      changeCalendarMode: jest.fn(),
      DateTimeFormat,
      locales: 'en-US',
      calendarTempDate: new Date(2016, 1, 1),
      calendarMode: 'year',
      timeZone: 'UTC',
    };

    const header = mount(<DatePickerHeader {...props} />);
    const controls = header.find(PickerControl);
    expect(controls.length).toBe(2);

    const [year, calendar] = controls;
    expect(year.props.onClick).toBe(header.instance()._selectYear);
    expect(calendar.props.onClick).toBe(header.instance()._selectCalendar);
  });

  it('formats the calendar temp date', () => {
    const props = {
      calendarTempDate: new Date(2016, 1, 1),
      locales: 'en-US',
      changeCalendarMode: jest.fn(),
      calendarMode: 'year',
      timeZone: 'UTC',
      DateTimeFormat,
    };

    const header = mount(<DatePickerHeader {...props} />);
    const timeZone = header.prop('timeZone');
    expect(timeZone).toEqual(props.timeZone);

    const [time, weekday, date] = DateTimeFormat.mock.calls;
    expect(time[0]).toBe(props.locales);
    expect(time[1]).toEqual({ year: 'numeric', timeZone });

    expect(weekday[0]).toBe(props.locales);
    expect(weekday[1]).toEqual({ weekday: 'short', timeZone });

    expect(date[0]).toBe(props.locales);
    expect(date[1]).toEqual({ month: 'short', day: '2-digit', timeZone });

    expect(header.state('year')).toBe('');
    expect(header.state('weekday')).toBe('');
    expect(header.state('date')).toBe('');
  });
});
