/* eslint-env jest*/
/* eslint-disable global-require,max-len */
jest.unmock('../DatePickerContainer');
jest.unmock('../DatePicker');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import DatePickerContainer from '../DatePickerContainer';

describe('DatePickerContainer', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const pickerStyle = { background: 'black' };
    const pickerClassName = 'picker-test';
    const datePickerContainer = renderIntoDocument(
      <DatePickerContainer
        id="test"
        style={style}
        className={className}
        pickerStyle={pickerStyle}
        pickerClassName={pickerClassName}
        locales="en-US"
      />
    );

    datePickerContainer.setState({ isOpen: true });

    const datePickerContainerNode = findDOMNode(datePickerContainer);
    expect(datePickerContainerNode.style.display).toBe(style.display);
    expect(datePickerContainerNode.className).toContain(className);
  });

  it('allows for null, a Date object or a formatted string as the value prop', () => {
    const DateTimeFormat = require('intl').DateTimeFormat;
    const stringValue = '3/17/2017';
    let container = renderIntoDocument(
      <DatePickerContainer id="test" value={stringValue} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    let textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe(stringValue);

    const dateValue = new Date(2017, 2, 17);
    container = renderIntoDocument(
      <DatePickerContainer id="test" value={dateValue} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe(stringValue);

    container = renderIntoDocument(
      <DatePickerContainer id="test" value={null} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe('');
  });

  it('allows for null, a Date object or a formatted string as the defaultValue prop', () => {
    const DateTimeFormat = require('intl').DateTimeFormat;
    const stringValue = '3/17/2017';
    let container = renderIntoDocument(
      <DatePickerContainer id="test" defaultValue={stringValue} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    let textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe(stringValue);

    const dateValue = new Date(2017, 2, 17);
    container = renderIntoDocument(
      <DatePickerContainer id="test" defaultValue={dateValue} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe(stringValue);

    container = renderIntoDocument(
      <DatePickerContainer id="test" defaultValue={null} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe('');
  });

  it('when the ok button is clicked, the onChange prop is called with the formatted date string, the new date object, and the event', () => {
    const defaultValue = '3/17/2016';
    const DateTimeFormat = jest.fn(() => ({ format: () => defaultValue }));
    const event = { target: 'a' };
    const onChange = jest.fn();
    const container = renderIntoDocument(
      <DatePickerContainer
        id="test"
        locales="en-US"
        onChange={onChange}
        defaultValue={defaultValue}
        DateTimeFormat={DateTimeFormat}
      />
    );

    container._handleOkClick(event);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe(defaultValue);
    expect(onChange.mock.calls[0][1]).toEqual(new Date(defaultValue));
    expect(onChange.mock.calls[0][2]).toEqual(event);
  });

  it('calls the onChange prop with the new formatted date string and the new date object when the autoOk prop is true and a new date is selected.', () => {
    const onChange = jest.fn();
    const defaultValue = '3/17/2016';
    const DateTimeFormat = jest.fn(() => ({ format: () => defaultValue }));

    let container = renderIntoDocument(
      <DatePickerContainer
        id="test"
        locales="en-US"
        onChange={onChange}
        defaultValue={defaultValue}
        DateTimeFormat={DateTimeFormat}
      />
    );

    let tempDate = new Date(2016, 2, 15);
    container._setCalendarTempDate(tempDate);
    expect(onChange.mock.calls.length).toBe(0);
    expect(container.state.calendarTempDate).toEqual(tempDate);

    container = renderIntoDocument(
      <DatePickerContainer
        id="test"
        locales="en-US"
        onChange={onChange}
        defaultValue={defaultValue}
        DateTimeFormat={DateTimeFormat}
        autoOk
      />
    );

    tempDate = new Date(2016, 2, 18);
    container._setCalendarTempDate(tempDate);
    expect(onChange.mock.calls.length).toBe(1);
    expect(container.state.calendarTempDate).toEqual(tempDate);
    expect(onChange.mock.calls[0][0]).toBe(defaultValue);
    expect(onChange.mock.calls[0][1]).toEqual(tempDate);
  });

  it('allows for an initial calendar date as a string', () => {
    const initialCalendarDateStr = '3/17/2016';
    const initialCalendarDate = new Date(initialCalendarDateStr);
    const props = {
      locales: 'en-US',
      initialCalendarDate: initialCalendarDateStr,
      id: 'test',
    };

    const container = renderIntoDocument(<DatePickerContainer {...props} />);

    expect(container.state.calendarDate).toEqual(initialCalendarDate);
    expect(container.state.calendarTempDate).toEqual(initialCalendarDate);
  });

  it('allows for an initial calendar date as a Date object', () => {
    const initialCalendarDate = new Date(2016, 2, 18);
    const props = { locales: 'en-US', initialCalendarDate, id: 'test' };

    const container = renderIntoDocument(<DatePickerContainer {...props} />);

    expect(container.state.calendarDate).toEqual(initialCalendarDate);
    expect(container.state.calendarTempDate).toEqual(initialCalendarDate);
  });

  it('modifies the initial state\'s calendarDate if the min date is greater than the calendarDate', () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);

    const props = { minDate, locales: 'en-US', id: 'test' };
    const container = renderIntoDocument(<DatePickerContainer {...props} />);

    expect(container.state.calendarDate).toEqual(minDate);
    expect(container.state.calendarTempDate).toEqual(minDate);
  });

  it('modifies the initial state\'s calendarDate if the max date is less than the calendarDate', () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 2);

    const props = { maxDate, locales: 'en-US', id: 'test' };
    const container = renderIntoDocument(<DatePickerContainer {...props} />);

    expect(container.state.calendarDate).toEqual(maxDate);
    expect(container.state.calendarTempDate).toEqual(maxDate);
  });

  // Modifies the calendar date when the min or max date change from componentWillReceiveProps...
  // but not sure how to test lifecycle
});
