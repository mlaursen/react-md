/* eslint-env jest*/
/* eslint-disable global-require */
jest.unmock('../CalendarHeader');

import React from 'react';
import {
  renderIntoDocument,
// scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import CalendarHeader from '../CalendarHeader';
// import Button from '../../Buttons';

describe('CalendarHeader', () => {
  it('renders the day of week abbreviations', () => {
    const DateTimeFormat = require('../__mocks__/DateTimeFormat');

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
    const dows = findRenderedDOMComponentWithClass(header, 'md-dows');
    expect(dows.childNodes.length).toBe(7);
  });

  it('formats the date with a month and year', () => {
    const DateTimeFormat = require('../__mocks__/DateTimeFormat');

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
    expect(DateTimeFormat.mock.calls.length).toBe(2);
    // first call is from generateDows
    expect(DateTimeFormat.mock.calls[1][0]).toBe(props.locales);
    expect(DateTimeFormat.mock.calls[1][1]).toEqual({ month: 'long', year: 'numeric' });
  });

  // it('renders a next and previous icon button', () => {
  //   const DateTimeFormat = require('../__mocks__/DateTimeFormat');

  //   const props = {
  //     DateTimeFormat,
  //     locales: 'en-US',
  //     onPreviousClick: jest.fn(),
  //     onNextClick: jest.fn(),
  //     previousIcon: 'a',
  //     nextIcon: 'a',
  //     date: new Date(),
  //   };

  //   const header = renderIntoDocument(<CalendarHeader {...props} />);
  //   const iconBtns = scryRenderedComponentsWithType(header, Button);
  //   expect(iconBtns.length).toBe(2);
  //   expect(iconBtns[0].props.onClick).toBe(props.onPreviousClick);
  //   expect(iconBtns[0].props.children).toBe(props.previousIcon);
  //   expect(iconBtns[1].props.onClick).toBe(props.onNextClick);
  //   expect(iconBtns[1].props.children).toBe(props.nextIcon);
  // });
});
