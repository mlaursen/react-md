/* eslint-env jest*/
import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import CalendarHeader from '../CalendarHeader';
import DateTimeFormat from '../../utils/DateUtils/DateTimeFormat';

jest.mock('../../utils/DateUtils/DateTimeFormat');


describe('CalendarHeader', () => {
  it('renders the day of week abbreviations', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIconChildren: 'a',
      nextIconChildren: 'a',
      date: new Date(),
    };

    const header = renderIntoDocument(<CalendarHeader {...props} />);
    const dows = findRenderedDOMComponentWithClass(header, 'md-calendar-dows');
    expect(dows.childNodes.length).toBe(7);
  });

  it('formats the date with a month and year', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIconChildren: 'a',
      nextIconChildren: 'a',
      date: new Date(),
    };

    renderIntoDocument(<CalendarHeader {...props} />);
    // first call is from generateDows
    expect(DateTimeFormat.mock.calls[1][0]).toBe(props.locales);
    expect(DateTimeFormat.mock.calls[1][1]).toEqual({ month: 'long', year: 'numeric' });
  });
});
