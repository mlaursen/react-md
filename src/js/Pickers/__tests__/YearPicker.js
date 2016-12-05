/* eslint-env jest*/
jest.unmock('../YearPicker');

import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import YearPicker from '../YearPicker';
import Year from '../Year';

// Can't do the query selector stuff
YearPicker.prototype._setContainer = jest.fn();

describe('YearPicker', () => {
  it('renders the number of years from yearsDisplayed', () => {
    const props = {
      calendarTempDate: new Date(2016, 1, 1),
      onCalendarYearClick: jest.fn(),
      yearsDisplayed: 100,
    };

    let yearPicker = renderIntoDocument(<YearPicker {...props} />);
    let years = scryRenderedComponentsWithType(yearPicker, Year);

    expect(years.length).toBe(props.yearsDisplayed);

    props.yearsDisplayed = 5;
    yearPicker = renderIntoDocument(<YearPicker {...props} />);
    years = scryRenderedComponentsWithType(yearPicker, Year);

    expect(years.length).toBe(props.yearsDisplayed);
  });

  it('renders the number of years from yearsDisplayed starting with the minDate', () => {
    const props = {
      minDate: new Date(2016, 1, 15),
      calendarTempDate: new Date(2016, 1, 1),
      onCalendarYearClick: jest.fn(),
      yearsDisplayed: 100,
    };

    const yearPicker = renderIntoDocument(<YearPicker {...props} />);
    const years = scryRenderedComponentsWithType(yearPicker, Year);

    // Even numbers have one more
    expect(years.length).toBe(props.yearsDisplayed);
    expect(years[0].props.year).toBe(props.minDate.getFullYear());
    expect(years[props.yearsDisplayed - 1].props.year)
      .toBe(props.minDate.getFullYear() + props.yearsDisplayed - 1);
  });

  it('renders the number of years from yearsDisplayed ending with the maxDate', () => {
    const props = {
      maxDate: new Date(2016, 1, 15),
      calendarTempDate: new Date(2016, 1, 1),
      onCalendarYearClick: jest.fn(),
      yearsDisplayed: 100,
    };

    const yearPicker = renderIntoDocument(<YearPicker {...props} />);
    const years = scryRenderedComponentsWithType(yearPicker, Year);

    // Even numbers have one more
    expect(years.length).toBe(props.yearsDisplayed);
    expect(years[props.yearsDisplayed - 1].props.year).toBe(props.maxDate.getFullYear());
    expect(years[0].props.year).toBe(props.maxDate.getFullYear() - props.yearsDisplayed + 1);
  });

  it('only renders years between the min and max dates', () => {
    const props = {
      minDate: new Date(2012),
      maxDate: new Date(2015),
      calendarTempDate: new Date(2012, 1, 1),
      onCalendarYearClick: jest.fn(),
      yearsDisplayed: 100,
    };

    const yearPicker = renderIntoDocument(<YearPicker {...props} />);
    const years = scryRenderedComponentsWithType(yearPicker, Year);
    expect(years.length).toBe(props.maxDate.getFullYear() - props.minDate.getFullYear() + 1);

    expect(years[0].props.year).toBe(props.minDate.getFullYear());
    expect(years[years.length - 1].props.year).toBe(props.maxDate.getFullYear());
  });
});
