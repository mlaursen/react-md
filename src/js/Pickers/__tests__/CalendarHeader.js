/* eslint-env jest*/
jest.unmock('../CalendarHeader');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import CalendarHeader from '../CalendarHeader';

describe('CalendarHeader', () => {
  it('renders the day of week abbreviations', () => {
    const DateTimeFormat = require('../../utils/DateUtils/DateTimeFormat');

    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIcon: 'a',
      nextIcon: 'a',
      date: new Date(),
    };

    const header = renderIntoDocument(<CalendarHeader {...props} />);
    const dows = findRenderedDOMComponentWithClass(header, 'md-calendar-dows');
    expect(dows.childNodes.length).toBe(7);
  });

  it('formats the date with a month and year', () => {
    const DateTimeFormat = require('../../utils/DateUtils/DateTimeFormat');

    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIcon: 'a',
      nextIcon: 'a',
      date: new Date(),
    };

    renderIntoDocument(<CalendarHeader {...props} />);
    // first call is from generateDows
    expect(DateTimeFormat.mock.calls[1][0]).toBe(props.locales);
    expect(DateTimeFormat.mock.calls[1][1]).toEqual({ month: 'long', year: 'numeric' });
  });
});
