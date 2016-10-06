/* eslint-env jest */
jest.unmock('../TimePickerContainer');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import TimePickerContainer from '../TimePickerContainer';
import TextField from '../../TextFields';

describe('TimePickerContainer', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
      id: 'test',
    };

    const timePickerContainer = renderIntoDocument(<TimePickerContainer {...props} />);

    const timePickerContainerNode = findDOMNode(timePickerContainer);
    expect(timePickerContainerNode.style.background).toBe(props.style.background);
    expect(timePickerContainerNode.className).toContain(props.className);
  });

  it('renders a TextField witht he correct props', () => {
    const props = {
      id: 'test',
      disabled: false,
      label: 'Woop',
      placeholder: 'Noop',
      fullWidth: false,
      lineDirection: 'center',
    };

    const picker = renderIntoDocument(<TimePickerContainer {...props} />);
    const field = findRenderedComponentWithType(picker, TextField);
    expect(field.props.id).toBe(props.id);
    expect(field.props.disabled).toBe(props.disabled);
    expect(field.props.label).toBe(props.label);
    expect(field.props.placeholder).toBe(props.placeholder);
    expect(field.props.readOnly).toBe(true);
    expect(field.props.fullWidth).toBe(props.fullWidth);
    expect(field.props.lineDirection).toBe(props.lineDirection);
  });

  it('calls the onChange prop when the ok button is clicked', () => {
    const props = {
      id: 'test',
      onChange: jest.fn(),
      defaultValue: new Date(2016, 3, 15, 3, 55),
    };

    const picker = renderIntoDocument(<TimePickerContainer {...props} />);
    const event = { target: { value: '3:55' } };
    picker._handleOkClick(event);

    expect(props.onChange.mock.calls.length).toBe(1);
    // a string of '3:55'
    expect(props.onChange.mock.calls[0][0]).toBeDefined();
    expect(props.onChange.mock.calls[0][1]).toEqual(props.defaultValue);
    expect(props.onChange.mock.calls[0][2]).toEqual(event);
  });

  it('calls the onOpenToggle prop when the open state is changed', () => {
    const props = {
      id: 'test',
      onOpenToggle: jest.fn(),
    };
    const picker = renderIntoDocument(<TimePickerContainer {...props} />);
    const event = { target: { value: '3:55' } };
    picker._toggleOpen(event);
    expect(props.onOpenToggle.mock.calls.length).toBe(1);
    expect(props.onOpenToggle.mock.calls[0][0]).toBe(true);
    expect(props.onOpenToggle.mock.calls[0][1]).toEqual(event);

    picker._handleOkClick(event);
    expect(props.onOpenToggle.mock.calls.length).toBe(2);
    expect(props.onOpenToggle.mock.calls[1][0]).toBe(false);
    expect(props.onOpenToggle.mock.calls[1][1]).toEqual(event);

    picker._handleCancelClick(event);
    expect(props.onOpenToggle.mock.calls.length).toBe(3);
    expect(props.onOpenToggle.mock.calls[2][0]).toBe(false);
    expect(props.onOpenToggle.mock.calls[2][1]).toEqual(event);
  });
});
