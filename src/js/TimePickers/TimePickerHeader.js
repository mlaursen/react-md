import React, { PropTypes } from 'react';

import { PickerControl } from '../Pickers';
import { getTimeString, addHours, subtractHours } from '../utils';

const TimePickerHeader = ({ DateTimeFormat, locales, setTimeMode, setTempTime, timeMode, tempTime }) => {
  const time = getTimeString(DateTimeFormat, locales, tempTime);
  let [hour, minute, ...others] = time.split(/(?=[^0-9])/);
  let timePeriod;
  if(others.length) {
    timePeriod = others.join('').trim();
  }
  return (
    <header className="md-picker-header">
      <PickerControl onClick={setTimeMode.bind(this, 'hour')} active={timeMode === 'hour'}>
        <h4 className="md-display-3">
          {hour}
        </h4>
      </PickerControl>
      <PickerControl onClick={setTimeMode.bind(this, 'minute')} active={timeMode === 'minute'}>
        <h4 className="md-display-3">
          {minute}
        </h4>
      </PickerControl>
      {timePeriod &&
      <div className="md-time-periods">
        <PickerControl onClick={() => setTempTime(addHours(tempTime, 12))} active={timePeriod === 'AM'}>
          <h6 className="md-subtitle">AM</h6>
        </PickerControl>
        <PickerControl onClick={() => setTempTime(subtractHours(tempTime, 12))} active={timePeriod === 'PM'}>
          <h6 className="md-subtitle">PM</h6>
        </PickerControl>
      </div>
      }
    </header>
  );
};

TimePickerHeader.propTypes = {
  DateTimeFormat: PropTypes.func.isRequired,
  locales: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  tempTime: PropTypes.instanceOf(Date).isRequired,
  timeMode: PropTypes.oneOf(['hour', 'minute']).isRequired,
  setTimeMode: PropTypes.func.isRequired,
  setTempTime: PropTypes.func.isRequired,
};

export default TimePickerHeader;
