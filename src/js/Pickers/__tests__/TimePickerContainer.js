/*eslint-env jest*/
jest.unmock('../TimePickerContainer');
jest.unmock('../../utils/dates');


import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import TimePickerContainer from '../TimePickerContainer';
import TimePicker from '../TimePicker';
import TransitionGroup from 'react-addons-transition-group';

describe('TimePickerContainer', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const pickerStyle = { background: 'red' };
    const pickerClassName = 'picker-test';
    const container = renderIntoDocument(
      <TimePickerContainer
        style={style}
        className={className}
        pickerStyle={pickerStyle}
        pickerClassName={pickerClassName}
        locales="en-US"
        initiallyOpen={true}
      />
    );

    const containerNode = findDOMNode(container);
    const picker = findRenderedComponentWithType(container, TimePicker);
    expect(containerNode.style.display).toBe(style.display);
    expect(containerNode.className).toContain(className);

    expect(picker.props.style).toEqual(pickerStyle);
    expect(picker.props.className).toContain(pickerClassName);
  });

  it('renders a transition group if displayed inline', () => {
    let container = renderIntoDocument(
      <TimePickerContainer inline={true} locales="en-US" />
    );

    let transitions = scryRenderedComponentsWithType(container, TransitionGroup);
    expect(transitions.length).toBe(1);

    container = renderIntoDocument(
      <TimePickerContainer inline={false} locales="en-US" />
    );

    transitions = scryRenderedComponentsWithType(container, TransitionGroup);
    expect(transitions.length).toBe(0);
  });

  it('passes the correct props to the TimePicker when open', () => {
    let container = renderIntoDocument(<TimePickerContainer locales="en-US" />);
    let pickers = scryRenderedComponentsWithType(container, TimePicker);
    expect(pickers.length).toBe(0);

    container = renderIntoDocument(<TimePickerContainer initiallyOpen={true} locales="en-US" />);
    pickers = scryRenderedComponentsWithType(container, TimePicker);
    expect(pickers.length).toBe(1);

    const { props } = pickers[0];
    expect(props.onOkClick).toBe(container.handleOkClick);
    expect(props.okLabel).toBe(TimePickerContainer.defaultProps.okLabel);
    expect(props.okPrimary).toBe(TimePickerContainer.defaultProps.okPrimary);
    expect(props.onCancelClick).toBe(container.handleCancelClick);
    expect(props.cancelLabel).toBe(TimePickerContainer.defaultProps.cancelLabel);
    expect(props.cancelPrimary).toBe(TimePickerContainer.defaultProps.cancelPrimary);
    expect(props.setTimeMode).toBe(container.setTimeMode);
    expect(props.setTempTime).toBe(container.setTempTime);
    expect(props.tempTime).toBe(container.state.tempTime);
    expect(props.timeMode).toBe(container.state.timeMode);
    expect(props.hours).toBe(container.state.hours);
    expect(props.minutes).toBe(container.state.minutes);
    expect(props.timePeriod).toBe(container.state.timePeriod);
  });

  it('can be a controlled component for the value', () => {
    const props = {
      onChange: jest.fn(),
      value: new Date(2016, 3, 15, 3, 15),
      locales: 'en-US',
    };

    const container = renderIntoDocument(<TimePickerContainer {...props} />);
    const event = { button: 2 };
    container.handleOkClick(event);
    expect(props.onChange.mock.calls.length).toBe(1);
    expect(props.onChange.mock.calls[0][0]).toBe('3:15 AM');
    expect(props.onChange.mock.calls[0][1]).toEqual(new Date(2016, 3, 15, 3, 15));
    expect(props.onChange.mock.calls[0][2]).toEqual(event);
  });
});
