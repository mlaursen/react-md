/* eslint-env jest*/
import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import DatePicker from '../DatePicker';
import DatePickerHeader from '../DatePickerHeader';
import DatePickerCalendar from '../DatePickerCalendar';
import YearPicker from '../YearPicker';
import DialogFooter from '../../Dialogs/DialogFooter';

import DateTimeFormat from '../../utils/DateUtils/DateTimeFormat';

jest.mock('../../utils/DateUtils/DateTimeFormat');

describe('DatePicker', () => {
  it('renders a DatePickerHeader and a DialogFooter', () => {
    const props = {
      className: 'a',
      okLabel: 'ok',
      okPrimary: false,
      onOkClick: jest.fn(),
      cancelLabel: 'cancel',
      cancelPrimary: false,
      onCancelClick: jest.fn(),
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(),
      calendarTempDate: new Date(),
      calendarMode: 'calendar',
      changeCalendarMode: jest.fn(),
      onSwipeChange: jest.fn(),
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      onCalendarDateClick: jest.fn(),
      nextIconChildren: 'a',
      previousIconChildren: 'a',
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const headers = scryRenderedComponentsWithType(picker, DatePickerHeader);
    expect(headers.length).toBe(1);

    const footers = scryRenderedComponentsWithType(picker, DialogFooter);
    expect(footers.length).toBe(1);
  });

  it('renders a calendar when the calendarMode is calendar', () => {
    const props = {
      className: 'a',
      okLabel: 'ok',
      okPrimary: false,
      onOkClick: jest.fn(),
      cancelLabel: 'cancel',
      cancelPrimary: false,
      onCancelClick: jest.fn(),
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(),
      calendarTempDate: new Date(),
      calendarMode: 'calendar',
      changeCalendarMode: jest.fn(),
      onSwipeChange: jest.fn(),
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      onCalendarDateClick: jest.fn(),
      onCalendarYearClick: jest.fn(),
      nextIconChildren: 'a',
      previousIconChildren: 'a',
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const calendars = scryRenderedComponentsWithType(picker, DatePickerCalendar);
    const years = scryRenderedComponentsWithType(picker, YearPicker);
    expect(calendars.length).toBe(1);
    expect(years.length).toBe(0);
  });

  it('renders a year picker when the calendarMode is year', () => {
    const props = {
      className: 'a',
      okLabel: 'ok',
      okPrimary: false,
      onOkClick: jest.fn(),
      cancelLabel: 'cancel',
      cancelPrimary: false,
      onCancelClick: jest.fn(),
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(),
      calendarTempDate: new Date(),
      calendarMode: 'year',
      changeCalendarMode: jest.fn(),
      onSwipeChange: jest.fn(),
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      onCalendarDateClick: jest.fn(),
      onCalendarYearClick: jest.fn(),
      nextIconChildren: 'a',
      previousIconChildren: 'a',
      yearsDisplayed: 30,
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const calendars = scryRenderedComponentsWithType(picker, DatePickerCalendar);
    const years = scryRenderedComponentsWithType(picker, YearPicker);
    expect(calendars.length).toBe(0);
    expect(years.length).toBe(1);
  });
});
