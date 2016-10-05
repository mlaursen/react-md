/* eslint-env jest*/
/* eslint-disable max-len */
jest.unmock('../TimePeriods');

import React from 'react';
import {
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

  it('passes the setAM and setPM functions correctly to the time periods', () => {
    const props = { tempTime: new Date(), setTempTime: jest.fn(), timePeriod: 'AM' };
    const periods = renderIntoDocument(<TimePeriods {...props} />);
    const [am, pm] = scryRenderedComponentsWithType(periods, PickerControl);

    expect(am.props.onClick).toBe(periods._setAM);
    expect(pm.props.onClick).toBe(periods._setPM);
  });

  it('does not call the setTempTime prop when the AM control is clicked and the current period is AM', () => {
    const props = { tempTime: new Date(), setTempTime: jest.fn(), timePeriod: 'AM' };
    const periods = renderIntoDocument(<TimePeriods {...props} />);

    periods._setAM();
    expect(props.setTempTime.mock.calls.length).toBe(0);
  });

  it('does not call the setTempTime prop when the PM control is clicked and the current period is PM', () => {
    const props = { tempTime: new Date(), setTempTime: jest.fn(), timePeriod: 'PM' };
    const periods = renderIntoDocument(<TimePeriods {...props} />);

    periods._setPM();
    expect(props.setTempTime.mock.calls.length).toBe(0);
  });
});
