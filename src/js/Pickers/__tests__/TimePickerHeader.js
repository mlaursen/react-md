/* eslint-env jest*/
jest.unmock('../TimePickerHeader');
jest.unmock('../PickerControl');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import TimePickerHeader from '../TimePickerHeader';
import PickerControl from '../PickerControl';
import TimePeriods from '../TimePeriods';

describe('TimePickerHeader', () => {
  it('renders a picker control for the hours', () => {
    const props = {
      tempTime: new Date(2016, 3, 5, 5, 15),
      timeMode: 'hour',
      setTimeMode: jest.fn(),
      setTempTime: jest.fn(),
      hours: '5',
      minutes: ':15',
      timePeriod: 'AM',
    };

    const header = renderIntoDocument(<TimePickerHeader {...props} />);
    const hour = scryRenderedComponentsWithType(header, PickerControl)[0];
    const hourNode = findDOMNode(hour);

    expect(hour.props.active).toBe(true);
    expect(hourNode.textContent).toBe(props.hours);
  });

  it('renders a picker control for the minutes', () => {
    const props = {
      tempTime: new Date(2016, 3, 5, 5, 15),
      timeMode: 'hour',
      setTimeMode: jest.fn(),
      setTempTime: jest.fn(),
      hours: '5',
      minutes: ':15',
      timePeriod: 'AM',
    };

    const header = renderIntoDocument(<TimePickerHeader {...props} />);
    const minute = scryRenderedComponentsWithType(header, PickerControl)[1];
    const minuteNode = findDOMNode(minute);

    expect(minute.props.active).toBe(false);
    expect(minuteNode.textContent).toBe(props.minutes);
  });

  it('renders the TimePeriods component if there is a time period', () => {
    const props = {
      tempTime: new Date(2016, 3, 5, 5, 15),
      timeMode: 'hour',
      setTimeMode: jest.fn(),
      setTempTime: jest.fn(),
      hours: '5',
      minutes: ':15',
      timePeriod: 'AM',
    };

    let header = renderIntoDocument(<TimePickerHeader {...props} />);
    let periods = scryRenderedComponentsWithType(header, TimePeriods);

    expect(periods.length).toBe(1);
    expect(periods[0].props.tempTime).toBe(props.tempTime);
    expect(periods[0].props.setTempTime).toBe(props.setTempTime);
    expect(periods[0].props.timePeriod).toBe(props.timePeriod);

    delete props.timePeriod;
    header = renderIntoDocument(<TimePickerHeader {...props} />);
    periods = scryRenderedComponentsWithType(header, TimePeriods);

    expect(periods.length).toBe(0);
  });

  it('calls the setTimeMode function when a picker control is clicked', () => {
    const props = {
      tempTime: new Date(2016, 3, 5, 5, 15),
      timeMode: 'hour',
      setTimeMode: jest.fn(),
      setTempTime: jest.fn(),
      hours: '5',
      minutes: ':15',
      timePeriod: 'AM',
    };

    const header = renderIntoDocument(<TimePickerHeader {...props} />);
    const periods = scryRenderedComponentsWithType(header, PickerControl);
    const am = findDOMNode(periods[0]);
    const pm = findDOMNode(periods[1]);

    Simulate.click(am);
    expect(props.setTimeMode.mock.calls.length).toBe(1);

    Simulate.click(pm);
    expect(props.setTimeMode.mock.calls.length).toBe(2);
  });
});
