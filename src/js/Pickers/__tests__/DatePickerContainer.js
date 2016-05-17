/*eslint-env jest*/
jest.unmock('../DatePickerContainer');
jest.unmock('../DatePicker');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import DatePickerContainer from '../DatePickerContainer';
import DatePicker from '../DatePicker';

describe('DatePickerContainer', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const pickerStyle = { background: 'black' };
    const pickerClassName = 'picker-test';
    let datePickerContainer = renderIntoDocument(
      <DatePickerContainer
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

    const pickers = scryRenderedComponentsWithType(datePickerContainer, DatePicker);
    expect(pickers.length).toBe(1);

    const picker = pickers[0];
    expect(picker.props.style).toEqual(pickerStyle);
    expect(picker.props.className).toContain(pickerClassName);
  });

  it('renders a text field that opens the date picker when clicked', () => {
    const container = renderIntoDocument(
      <DatePickerContainer locales="en-US" />
    );

    const textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(container.state.isOpen).toBe(false);

    Simulate.click(textField);
    expect(container.state.isOpen).toBe(true);
  });

  it('allows for null, a Date object or a formatted string as the value prop', () => {
    const DateTimeFormat = require('intl').DateTimeFormat;
    const stringValue = '3/17/2017';
    let container = renderIntoDocument(
      <DatePickerContainer value={stringValue} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    let textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe(stringValue);

    const dateValue = new Date(2017, 2, 17);
    container = renderIntoDocument(
      <DatePickerContainer value={dateValue} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe(stringValue);

    container = renderIntoDocument(
      <DatePickerContainer value={null} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe('');
  });

  it('allows for null, a Date object or a formatted string as the defaultValue prop', () => {
    const DateTimeFormat = require('intl').DateTimeFormat;
    const stringValue = '3/17/2017';
    let container = renderIntoDocument(
      <DatePickerContainer defaultValue={stringValue} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    let textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe(stringValue);

    const dateValue = new Date(2017, 2, 17);
    container = renderIntoDocument(
      <DatePickerContainer defaultValue={dateValue} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe(stringValue);

    container = renderIntoDocument(
      <DatePickerContainer defaultValue={null} locales="en-US" DateTimeFormat={DateTimeFormat} />
    );

    textField = findRenderedDOMComponentWithTag(container, 'input');
    expect(textField.value).toBe('');
  });

  it('when the ok button is clicked, the onChange prop is called with the formatted date string, the new date object, and the event', () => {
    const defaultValue = '3/17/2016';
    const DateTimeFormat = jest.genMockFunction().mockImplementation(() => {
      return {
        format: () => defaultValue,
      };
    });
    const event = { target: 'a' };
    const onChange = jest.genMockFunction();
    const container = renderIntoDocument(
      <DatePickerContainer
        locales="en-US"
        onChange={onChange}
        defaultValue={defaultValue}
        DateTimeFormat={DateTimeFormat}
      />
    );

    container.handleOkClick(event);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe(defaultValue);
    expect(onChange.mock.calls[0][1]).toEqual(new Date(defaultValue));
    expect(onChange.mock.calls[0][2]).toEqual(event);
  });

  it('calls the onChange prop with the new formatted date string and the new date object when the autoOk prop is true and a new date is selected.', () => {
    const onChange = jest.genMockFunction();
    const defaultValue = '3/17/2016';
    const DateTimeFormat = jest.genMockFunction().mockImplementation(() => {
      return {
        format: () => defaultValue,
      };
    });

    let container = renderIntoDocument(
      <DatePickerContainer
        locales="en-US"
        onChange={onChange}
        defaultValue={defaultValue}
        DateTimeFormat={DateTimeFormat}
      />
    );

    let tempDate = new Date(2016, 2, 15);
    container.setCalendarTempDate(tempDate);
    expect(onChange.mock.calls.length).toBe(0);
    expect(container.state.calendarTempDate).toEqual(tempDate);

    container = renderIntoDocument(
      <DatePickerContainer
        locales="en-US"
        onChange={onChange}
        defaultValue={defaultValue}
        DateTimeFormat={DateTimeFormat}
        autoOk={true}
      />
    );

    tempDate = new Date(2016, 2, 18);
    container.setCalendarTempDate(tempDate);
    expect(onChange.mock.calls.length).toBe(1);
    expect(container.state.calendarTempDate).toEqual(tempDate);
    expect(onChange.mock.calls[0][0]).toBe(defaultValue);
    expect(onChange.mock.calls[0][1]).toEqual(tempDate);
  });
});
