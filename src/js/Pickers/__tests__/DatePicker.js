/* eslint-env jest*/
/* eslint-disable global-require */
jest.unmock('../DatePicker');

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

describe('DatePicker', () => {
  it('renders a DatePickerHeader and a DialogFooter', () => {
    const DateTimeFormat = require('../../utils/DateUtils/DateTimeFormat');
    const props = {
      className: 'a',
      okLabel: 'a',
      okPrimary: false,
      onOkClick: jest.fn(),
      cancelLabel: 'a',
      cancelPrimary: false,
      onCancelClick: jest.fn(),
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(),
      calendarTempDate: new Date(),
      calendarMode: 'calendar',
      changeCalendarMode: jest.fn(),
      onSwipeChange: jest.fn(),
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const headers = scryRenderedComponentsWithType(picker, DatePickerHeader);
    expect(headers.length).toBe(1);

    const footers = scryRenderedComponentsWithType(picker, DialogFooter);
    expect(footers.length).toBe(1);
  });

  it('renders a calendar when the calendarMode is calendar', () => {
    const DateTimeFormat = require('../../utils/DateUtils/DateTimeFormat');
    const props = {
      className: 'a',
      okLabel: 'a',
      okPrimary: false,
      onOkClick: jest.fn(),
      cancelLabel: 'a',
      cancelPrimary: false,
      onCancelClick: jest.fn(),
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(),
      calendarTempDate: new Date(),
      calendarMode: 'calendar',
      changeCalendarMode: jest.fn(),
      onSwipeChange: jest.fn(),
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const calendars = scryRenderedComponentsWithType(picker, DatePickerCalendar);
    const years = scryRenderedComponentsWithType(picker, YearPicker);
    expect(calendars.length).toBe(1);
    expect(years.length).toBe(0);
  });

  it('renders a year picker when the calendarMode is year', () => {
    const DateTimeFormat = require('../../utils/DateUtils/DateTimeFormat');
    const props = {
      className: 'a',
      okLabel: 'a',
      okPrimary: false,
      onOkClick: jest.fn(),
      cancelLabel: 'a',
      cancelPrimary: false,
      onCancelClick: jest.fn(),
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(),
      calendarTempDate: new Date(),
      calendarMode: 'year',
      changeCalendarMode: jest.fn(),
      onSwipeChange: jest.fn(),
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const calendars = scryRenderedComponentsWithType(picker, DatePickerCalendar);
    const years = scryRenderedComponentsWithType(picker, YearPicker);
    expect(calendars.length).toBe(0);
    expect(years.length).toBe(1);
  });
});
