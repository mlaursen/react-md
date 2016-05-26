/*eslint-env jest*/
jest.unmock('../TimePeriods');
jest.unmock('../PickerControl');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import TimePeriods from '../TimePeriods';
import PickerControl from '../PickerControl';

describe('TimePeriods', () => {
  it('displays a picker control component for AM and PM', () => {
    const setTempTime = jest.fn();
    const periods = renderIntoDocument(
      <TimePeriods tempTime={new Date()} setTempTime={setTempTime} timePeriod="AM" />
    );

    const controls = scryRenderedComponentsWithType(periods, PickerControl);
    expect(controls.length).toBe(2);
  });

  it('calls the setTempTime prop with 12 hours added when the AM control is clicked if the time period is not active', () => {
    const props = {
      setTempTime: jest.fn(),
      tempTime: new Date(2016, 3, 5, 12),
      timePeriod: 'PM',
    };

    let periods = renderIntoDocument(<TimePeriods {...props} />);
    let am = findDOMNode(scryRenderedComponentsWithType(periods, PickerControl)[0]);
    Simulate.click(am);
    expect(props.setTempTime.mock.calls.length).toBe(1);

    props.timePeriod = 'AM';
    periods = renderIntoDocument(<TimePeriods {...props} />);
    am = findDOMNode(scryRenderedComponentsWithType(periods, PickerControl)[0]);
    Simulate.click(am);
    expect(props.setTempTime.mock.calls.length).toBe(1);
  });
});
