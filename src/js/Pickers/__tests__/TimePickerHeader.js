/* eslint-env jest*/
jest.unmock('../TimePickerHeader');

import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import TimePickerHeader from '../TimePickerHeader';
import PickerControl from '../PickerControl';
import TimePeriods from '../TimePeriods';

describe('TimePickerHeader', () => {
  it('renders a picker control for the hour and the minutes', () => {
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
    const controls = scryRenderedComponentsWithType(header, PickerControl);

    expect(controls.length).toBe(2);
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
    const [period] = periods;
    expect(period.props.tempTime).toEqual(props.tempTime);
    expect(period.props.setTempTime).toBe(props.setTempTime);
    expect(period.props.timePeriod).toBe(props.timePeriod);

    delete props.timePeriod;
    header = renderIntoDocument(<TimePickerHeader {...props} />);
    periods = scryRenderedComponentsWithType(header, TimePeriods);

    expect(periods.length).toBe(0);
  });
});
