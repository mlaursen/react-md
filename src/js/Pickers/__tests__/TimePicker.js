/* eslint-env jest */
jest.unmock('../TimePicker');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import TimePicker from '../TimePicker';
import TimePickerHeader from '../TimePickerHeader';
import ClockFace from '../ClockFace';
import DateTimeFormat from '../../utils/DateUtils/DateTimeFormat';
import DialogFooter from '../../Dialogs/DialogFooter';

const threeFiftyFive = new Date(2016, 3, 15, 3, 55);
const PROPS = {
  okLabel: 'Ok',
  okPrimary: true,
  onOkClick: jest.fn(),
  cancelLabel: 'Cancel',
  cancelPrimary: true,
  onCancelClick: jest.fn(),
  DateTimeFormat,
  locales: 'en-US',
  setTimeMode: jest.fn(),
  setTempTime: jest.fn(),
  timeMode: 'hour',
  tempTime: threeFiftyFive,
  hours: '3',
  minutes: ':55',
  timePeriod: 'AM',
};

describe('TimePicker', () => {
  it('merges className and style', () => {
    const props = Object.assign({}, PROPS, {
      style: { background: 'black' },
      className: 'test',
    });

    const timePicker = renderIntoDocument(<TimePicker {...props} />);

    const timePickerNode = findDOMNode(timePicker);
    expect(timePickerNode.style.background).toBe(props.style.background);
    expect(timePickerNode.className).toContain(props.className);
  });

  it('renders the TimePickerHeader component with the correct props', () => {
    const picker = renderIntoDocument(<TimePicker {...PROPS} />);
    const header = findRenderedComponentWithType(picker, TimePickerHeader);
    expect(header.props.tempTime).toEqual(PROPS.tempTime);
    expect(header.props.timeMode).toBe(PROPS.timeMode);
    expect(header.props.setTempTime).toBe(PROPS.setTempTime);
    expect(header.props.hours).toBe(PROPS.hours);
    expect(header.props.minutes).toBe(PROPS.minutes);
    expect(header.props.timePeriod).toBe(PROPS.timePeriod);
  });

  it('renders a ClockFace component with the correct props', () => {
    const picker = renderIntoDocument(<TimePicker {...PROPS} />);
    const face = findRenderedComponentWithType(picker, ClockFace);
    expect(face.props.timePeriod).toBe(PROPS.timePeriod);
    expect(face.props.onChange).toBe(picker._updateTime);
    expect(face.props.minutes).toBe(false);
    // Really an int version of the hours
    expect(face.props.time).toBeDefined();
  });

  it('renders the DialogFooter component with an array of actions from the ok and cancel props', () => {
    const picker = renderIntoDocument(<TimePicker {...PROPS} />);
    const actions = findRenderedComponentWithType(picker, DialogFooter).props.actions;
    expect(actions.length).toBe(2);

    const [cancel, ok] = actions;
    expect(cancel.onClick).toBe(PROPS.onCancelClick);
    expect(cancel.primary).toBe(PROPS.cancelPrimary);
    expect(cancel.secondary).toBe(!PROPS.cancelPrimary);
    expect(cancel.label).toBe(PROPS.cancelLabel);
    expect(ok.onClick).toBe(PROPS.onOkClick);
    expect(ok.primary).toBe(PROPS.okPrimary);
    expect(ok.secondary).toBe(!PROPS.okPrimary);
    expect(ok.label).toBe(PROPS.okLabel);
  });

  it('updates the hours for the time when _updateTime is called and the timeMode is hours', () => {
    const props = Object.assign({}, PROPS, { setTempTime: jest.fn() });
    const picker = renderIntoDocument(<TimePicker {...props} />);
    picker._updateTime(2);
    expect(props.setTempTime.mock.calls.length).toBe(1);
    expect(props.setTempTime.mock.calls[0][0]).toEqual(new Date(2016, 3, 15, 2, 55));
  });

  it('updates the minutes for the time when _updateTime is called and the timeMode is hours', () => {
    const props = Object.assign({}, PROPS, { setTempTime: jest.fn(), timeMode: 'minute' });
    const picker = renderIntoDocument(<TimePicker {...props} />);
    picker._updateTime(2);
    expect(props.setTempTime.mock.calls.length).toBe(1);
    expect(props.setTempTime.mock.calls[0][0]).toEqual(new Date(2016, 3, 15, 3, 2));
  });
});
