/* eslint-env jest*/
import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-dom/test-utils';

import CalendarHeader from '../CalendarHeader';
import DateTimeFormat from '../../utils/DateUtils/DateTimeFormat';


describe('CalendarHeader', () => {
  function getDateTimeFormatMock() {
    return jest.fn(() => ({ format: (date) => date.toLocaleString() }));
  }

  it('renders the day of week abbreviations (using the timeZone passed as prop)', () => {
    const props = {
      DateTimeFormat: getDateTimeFormatMock(),
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIconChildren: 'a',
      nextIconChildren: 'a',
      date: new Date(),
      timeZone: 'UTC',
    };

    const header = renderIntoDocument(<CalendarHeader {...props} />);
    const dows = findRenderedDOMComponentWithClass(header, 'md-calendar-dows');
    expect(dows.childNodes.length).toBe(7);
    expect(props.DateTimeFormat).toHaveBeenCalledWith(props.locales, {
      weekday: CalendarHeader.defaultProps.weekdayFormat,
      timeZone: props.timeZone,
    });
  });

  it('should change order of the day of week abbreviations when "firstDayOfWeek" property is not 0', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIconChildren: 'a',
      nextIconChildren: 'a',
      date: new Date(),
      firstDayOfWeek: 3,
      timeZone: 'America/Los_Angeles',
    };

    const header = renderIntoDocument(<CalendarHeader {...props} />);
    const weekday = scryRenderedDOMComponentsWithClass(header, 'md-calendar-dow')[0];
    expect(weekday.innerHTML).toBe('W');
  });

  it('formats the date with a month and year', () => {
    const props = {
      DateTimeFormat: getDateTimeFormatMock(),
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIconChildren: 'a',
      nextIconChildren: 'a',
      date: new Date(),
      timeZone: 'America/Los_Angeles',
    };

    renderIntoDocument(<CalendarHeader {...props} />);
    // first call is from generateDows
    const formatCall = props.DateTimeFormat.mock.calls[1];
    expect(formatCall[0]).toBe(props.locales);
    expect(formatCall[1]).toEqual({ month: 'long', year: 'numeric', timeZone: props.timeZone });
  });

  it('should use "titleClassName" property', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      date: new Date(),
      titleClassName: 'test-title-class',
      timeZone: 'UTC',
    };

    const header = renderIntoDocument(<CalendarHeader {...props} />);
    const title = findRenderedDOMComponentWithClass(header, 'md-title');
    expect(title.className).toMatch(props.titleClassName);
  });

  it('formats the date with options specified in "titleFormat" property', () => {
    const props = {
      DateTimeFormat: getDateTimeFormatMock(),
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIconChildren: 'a',
      nextIconChildren: 'a',
      date: new Date(),
      titleFormat: { month: 'numeric', year: '2-digit' },
      timeZone: 'America/New_York',
    };

    renderIntoDocument(<CalendarHeader {...props} />);
    // first call is from generateDows
    const formatCall = props.DateTimeFormat.mock.calls[1];
    expect(formatCall[0]).toBe(props.locales);
    expect(formatCall[1]).toEqual({ ...props.titleFormat, timeZone: props.timeZone });
  });

  it('should use "weekdayClassName" property', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      date: new Date(),
      titleClassName: 'test-title-class',
      weekdayClassName: 'test-weekday-class',
      timeZone: 'UTC',
    };

    const header = renderIntoDocument(<CalendarHeader {...props} />);
    const weekday = scryRenderedDOMComponentsWithClass(header, 'md-calendar-dow')[0];
    expect(weekday.className).toMatch(props.weekdayClassName);
  });

  it('formats a weekday using value specified in "weekdayFormat" property', () => {
    const props = {
      DateTimeFormat: getDateTimeFormatMock(),
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIconChildren: 'a',
      nextIconChildren: 'a',
      date: new Date(),
      weekdayFormat: 'short',
      timeZone: 'America/New_York',
    };

    renderIntoDocument(<CalendarHeader {...props} />);
    const formatCall = props.DateTimeFormat.mock.calls[0];
    expect(formatCall[0]).toBe(props.locales);
    expect(formatCall[1]).toEqual({ weekday: props.weekdayFormat, timeZone: props.timeZone });
  });
});
