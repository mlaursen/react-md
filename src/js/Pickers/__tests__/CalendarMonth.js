/* eslint-env jest*/
import React from 'react';
import { shallow } from 'enzyme';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-dom/test-utils';

import CalendarDate from '../CalendarDate';
import CalendarMonth from '../CalendarMonth';
import DateTimeFormat from '../../utils/DateUtils/DateTimeFormat';


describe('CalendarMonth', () => {
  it('merges className and style', () => {
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
      timeZone: 'UTC',
    };
    const calendarMonth = renderIntoDocument(<CalendarMonth {...props} />);

    const calendarMonthNode = findDOMNode(calendarMonth);
    expect(calendarMonthNode.style.display).toBe(style.display);
    expect(calendarMonthNode.classList.contains(className)).toBe(true);
  });

  it('renders the number of days in a month', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(2016, 3, 12),
      calendarTempDate: new Date(2016, 3, 12),
      onCalendarDateClick: jest.fn(),
      timeZone: 'UTC',
    };

    const calendarMonth = renderIntoDocument(<CalendarMonth {...props} />);
    const days = scryRenderedComponentsWithType(calendarMonth, CalendarDate);
    expect(days.length).toBe(30);
    expect(days[11].props.active).toBe(true);
    expect(days[11].props.timeZone).toEqual(props.timeZone);
  });

  it('renders days from adjacent months', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(2017, 8, 29),
      calendarTempDate: new Date(2017, 8, 29),
      onCalendarDateClick: jest.fn(),
      firstDayOfWeek: 1,
      showAllDays: true,
      timeZone: 'UTC',
    };

    const calendarMonth = renderIntoDocument(<CalendarMonth {...props} />);
    const days = scryRenderedComponentsWithType(calendarMonth, CalendarDate);
    expect(days.length).toBe(35);
    expect(days[32].props.active).toBe(true);
    expect(days[11].props.timeZone).toEqual(props.timeZone);
  });

  it('should disable days from the other months when showAllDays and disableOuterDates is enabled', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(2017, 8, 29),
      calendarTempDate: new Date(2017, 8, 29),
      onCalendarDateClick: jest.fn(),
      firstDayOfWeek: 1,
      showAllDays: true,
      disableOuterDates: true,
      timeZone: 'UTC',
    };
    const month = shallow(<CalendarMonth {...props} />);
    const days = month.find(CalendarDate);
    expect(days.length).toBe(35);
    // 30 days in september and shows 1 day of october and 4 days of november
    expect(days.filter({ disabled: true }).length).toBe(5);
  });

  it('should change days order when "firstDayOfWeek" property is not 0', () => {
    function checkEmptyDayNode(node) {
      expect(node.nodeName).toBe('DIV');
      expect(node.innerHTML).toBe('');
    }

    function checkDayNode(node) {
      expect(node.nodeName).toBe('BUTTON');
    }

    const props = {
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(2017, 6, 1),
      calendarTempDate: new Date(2017, 6, 1),
      onCalendarDateClick: jest.fn(),
      firstDayOfWeek: 5,
      timeZone: 'UTC',
    };

    let header = renderIntoDocument(<CalendarMonth {...props} />);
    let days = scryRenderedDOMComponentsWithClass(header, 'md-calendar-date');
    expect(days.length).toBeGreaterThan(27);
    checkEmptyDayNode(days[0]);
    checkDayNode(days[1]);

    props.calendarDate = new Date(2017, 4, 1);
    props.calendarTempDate = new Date(2017, 4, 1);
    props.firstDayOfWeek = 4;

    header = renderIntoDocument(<CalendarMonth {...props} />);
    days = scryRenderedDOMComponentsWithClass(header, 'md-calendar-date');
    expect(days.length).toBeGreaterThan(27);
    checkEmptyDayNode(days[0]);
    checkEmptyDayNode(days[3]);
    checkDayNode(days[4]);
  });
});
