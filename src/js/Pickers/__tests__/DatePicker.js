/* eslint-env jest*/
import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
} from 'react-dom/test-utils';
import { mount } from 'enzyme';

import DatePicker from '../DatePicker';
import DatePickerHeader from '../DatePickerHeader';
import DatePickerCalendar from '../DatePickerCalendar';
import YearPicker from '../YearPicker';
import DialogFooter from '../../Dialogs/DialogFooter';
import FontIcon from '../../FontIcons/FontIcon';

import DateTimeFormat from '../../utils/DateUtils/DateTimeFormat';

jest.mock('../../utils/DateUtils/DateTimeFormat');

const PROPS = {
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
  nextIcon: <FontIcon>a</FontIcon>,
  previousIcon: <FontIcon>a</FontIcon>,
  yearsDisplayed: 30,
  timeZone: 'UTC',
};

describe('DatePicker', () => {
  it('renders a DatePickerHeader and a DialogFooter', () => {
    const props = {
      ...PROPS,
      className: 'a',
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const headers = scryRenderedComponentsWithType(picker, DatePickerHeader);
    expect(headers.length).toBe(1);

    const footers = scryRenderedComponentsWithType(picker, DialogFooter);
    expect(footers.length).toBe(1);
  });

  it('passes props.timeZone to rendered child components', () => {
    const wrapper = mount(<DatePicker {...PROPS} />);

    // test timeZone in header
    const header = wrapper.find('DatePickerHeader');
    expect(header.prop('timeZone')).toEqual(PROPS.timeZone);

    // test timeZone in calendar
    wrapper.setProps({ calendarMode: 'calendar' });
    const picker = wrapper.find('DatePickerCalendar');
    expect(picker.prop('timeZone')).toEqual(PROPS.timeZone);
  });

  it('renders a calendar when the calendarMode is calendar', () => {
    const props = {
      ...PROPS,
      calendarMode: 'calendar',
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const calendars = scryRenderedComponentsWithType(picker, DatePickerCalendar);
    const years = scryRenderedComponentsWithType(picker, YearPicker);
    expect(calendars.length).toBe(1);
    expect(years.length).toBe(0);
  });

  it('renders a year picker when the calendarMode is year', () => {
    const props = {
      ...PROPS,
      calendarMode: 'year',
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const calendars = scryRenderedComponentsWithType(picker, DatePickerCalendar);
    const years = scryRenderedComponentsWithType(picker, YearPicker);
    expect(calendars.length).toBe(0);
    expect(years.length).toBe(1);
  });

  it('should use "contentClassName" property', () => {
    const props = {
      ...PROPS,
      contentClassName: 'additional-content-class',
    };

    const picker = renderIntoDocument(<DatePicker {...props} />);
    const contentContainer = findRenderedDOMComponentWithClass(picker, 'md-picker-content-container');
    expect(contentContainer.classList.contains(props.contentClassName)).toBe(true);
  });
});
