/*eslint-env jest*/
jest.unmock('../DatePicker');

import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import DatePicker from '../DatePicker';
import DatePickerHeader from '../DatePickerHeader';
import PickerFooter from '../PickerFooter';
import DatePickerCalendar from '../DatePickerCalendar';
import YearPicker from '../YearPicker';

describe('DatePicker', () => {
  it('renders a DatePickerHeader and a PickerFooter', () => {
    const DateTimeFormat = require('../__mocks__/DateTimeFormat');
    const props = {
      className: 'a',
      okLabel: 'a',
      okPrimary: false,
      onOkClick: jest.genMockFunction(),
      cancelLabel: 'a',
      cancelPrimary: false,
      onCancelClick: jest.genMockFunction(),
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(),
      calendarTempDate: new Date(),
      calendarMode: 'calendar',
      changeCalendarMode: jest.genMockFunction(),
      onSwipeChange: jest.genMockFunction(),
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const headers = scryRenderedComponentsWithType(picker, DatePickerHeader);
    expect(headers.length).toBe(1);

    const footers = scryRenderedComponentsWithType(picker, PickerFooter);
    expect(footers.length).toBe(1);
  });

  it('renders a calendar when the calendarMode is calendar', () => {
    const DateTimeFormat = require('../__mocks__/DateTimeFormat');
    const props = {
      className: 'a',
      okLabel: 'a',
      okPrimary: false,
      onOkClick: jest.genMockFunction(),
      cancelLabel: 'a',
      cancelPrimary: false,
      onCancelClick: jest.genMockFunction(),
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(),
      calendarTempDate: new Date(),
      calendarMode: 'calendar',
      changeCalendarMode: jest.genMockFunction(),
      onSwipeChange: jest.genMockFunction(),
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const calendars = scryRenderedComponentsWithType(picker, DatePickerCalendar);
    const years = scryRenderedComponentsWithType(picker, YearPicker);
    expect(calendars.length).toBe(1);
    expect(years.length).toBe(0);
  });

  it('renders a year picker when the calendarMode is year', () => {
    const DateTimeFormat = require('../__mocks__/DateTimeFormat');
    const props = {
      className: 'a',
      okLabel: 'a',
      okPrimary: false,
      onOkClick: jest.genMockFunction(),
      cancelLabel: 'a',
      cancelPrimary: false,
      onCancelClick: jest.genMockFunction(),
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(),
      calendarTempDate: new Date(),
      calendarMode: 'year',
      changeCalendarMode: jest.genMockFunction(),
      onSwipeChange: jest.genMockFunction(),
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const calendars = scryRenderedComponentsWithType(picker, DatePickerCalendar);
    const years = scryRenderedComponentsWithType(picker, YearPicker);
    expect(calendars.length).toBe(0);
    expect(years.length).toBe(1);
  });
});
