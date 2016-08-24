/* eslint-env jest*/
jest.unmock('../TimePicker');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import TimePicker from '../TimePicker';
import DateTimeFormat from '../__mocks__/DateTimeFormat';
import TimePickerHeader from '../TimePickerHeader';
import PickerFooter from '../PickerFooter';
import ClockFace from '../ClockFace';

const commonProps = {
  className: 'a',
  okLabel: 'Ok',
  okPrimary: false,
  onOkClick: jest.fn(),
  cancelLabel: 'Cancel',
  cancelPrimary: false,
  onCancelClick: jest.fn(),
  DateTimeFormat,
  locales: 'en-US',
  setTimeMode: jest.fn(),
  setTempTime: jest.fn(),
  timeMode: 'hour',
  tempTime: new Date(2016, 3, 15, 3, 55),
  hours: '3',
  minutes: ':55',
  timePeriod: 'AM',
};

describe('TimePicker', () => {
  it('renders the TimePickerHeader component with the correct props', () => {
    const props = Object.assign({}, commonProps);
    const picker = renderIntoDocument(<TimePicker {...props} />);
    const header = findRenderedComponentWithType(picker, TimePickerHeader);

    expect(header.props.tempTime).toEqual(props.tempTime);
    expect(header.props.timeMode).toBe(props.timeMode);
    expect(header.props.setTimeMode).toBe(props.setTimeMode);
    expect(header.props.setTempTime).toBe(props.setTempTime);
    expect(header.props.hours).toBe(props.hours);
    expect(header.props.minutes).toBe(props.minutes);
    expect(header.props.timePeriod).toBe(props.timePeriod);
  });

  it('renders the PickerFooter component with the correct props', () => {
    const props = Object.assign({}, commonProps);
    const picker = renderIntoDocument(<TimePicker {...props} />);
    const footer = findRenderedComponentWithType(picker, PickerFooter);

    expect(footer.props.okLabel).toEqual(props.okLabel);
    expect(footer.props.okPrimary).toBe(props.okPrimary);
    expect(footer.props.onOkClick).toBe(props.onOkClick);
    expect(footer.props.onOkClick).toBe(props.onOkClick);
    expect(footer.props.cancelLabel).toBe(props.cancelLabel);
    expect(footer.props.cancelPrimary).toBe(props.cancelPrimary);
    expect(footer.props.onCancelClick).toBe(props.onCancelClick);
  });

  it('renders the ClockFace component with the correct props depending on the timeMode', () => {
    let props = Object.assign({}, commonProps);
    let picker = renderIntoDocument(<TimePicker {...props} />);
    let face = findRenderedComponentWithType(picker, ClockFace);

    expect(face.props.time).toBe(3);
    expect(face.props.minutes).toBe(false);
    expect(face.props.onClick).toBe(picker._updateTime);
    expect(face.props.timePeriod).toBe(props.timePeriod);

    props = Object.assign({}, commonProps, { timeMode: 'minute' });
    picker = renderIntoDocument(<TimePicker {...props} />);
    face = findRenderedComponentWithType(picker, ClockFace);

    expect(face.props.time).toBe(55);
    expect(face.props.minutes).toBe(true);
    expect(face.props.onClick).toBe(picker._updateTime);
    expect(face.props.timePeriod).toBe(props.timePeriod);
  });

  it('calls the setTempTime function with a new updated date object of the new time', () => {
    const props = Object.assign({}, commonProps, { setTempTime: jest.fn() });
    let picker = renderIntoDocument(<TimePicker {...props} />);

    picker._updateTime(11);
    expect(props.setTempTime.mock.calls.length).toBe(1);
    expect(props.setTempTime.mock.calls[0][0]).toEqual(new Date(2016, 3, 15, 11, 55));

    props.timeMode = 'minute';
    picker = renderIntoDocument(<TimePicker {...props} />);

    picker._updateTime(32);
    expect(props.setTempTime.mock.calls.length).toBe(2);
    expect(props.setTempTime.mock.calls[1][0]).toEqual(new Date(2016, 3, 15, 3, 32));
  });

  it('calls the setTempTime function with the correct hour to adjust for 12 hour clocks', () => {
    const props = Object.assign({}, commonProps, {
      setTempTime: jest.fn(),
      // 3 PM
      tempTime: new Date(2016, 3, 15, 15, 55),
      timePeriod: 'PM',
    });
    let picker = renderIntoDocument(<TimePicker {...props} />);

    picker._updateTime(12);
    expect(props.setTempTime.mock.calls.length).toBe(1);
    expect(props.setTempTime.mock.calls[0][0]).toEqual(new Date(2016, 3, 15, 12, 55));

    picker._updateTime(5);
    expect(props.setTempTime.mock.calls.length).toBe(2);
    expect(props.setTempTime.mock.calls[1][0]).toEqual(new Date(2016, 3, 15, 17, 55));

    props.timePeriod = 'AM';
    props.tempTime = new Date(2016, 3, 15, 3, 55);
    picker = renderIntoDocument(<TimePicker {...props} />);

    picker._updateTime(12);
    expect(props.setTempTime.mock.calls.length).toBe(3);
    expect(props.setTempTime.mock.calls[2][0]).toEqual(new Date(2016, 3, 15, 0, 55));

    picker._updateTime(5);
    expect(props.setTempTime.mock.calls.length).toBe(4);
    expect(props.setTempTime.mock.calls[3][0]).toEqual(new Date(2016, 3, 15, 5, 55));
  });

  it('calls the setTempTime function with the correct hour for a 24 hour clock', () => {
    const props = Object.assign({}, commonProps, {
      setTempTime: jest.fn(),
      tempTime: new Date(2016, 3, 15, 15, 55),
    });
    delete props.timePeriod;

    const picker = renderIntoDocument(<TimePicker {...props} />);
    picker._updateTime(22);
    expect(props.setTempTime.mock.calls.length).toBe(1);
    expect(props.setTempTime.mock.calls[0][0]).toEqual(new Date(2016, 3, 15, 22, 55));
  });
});
