import React, { PropTypes } from 'react';

import PickerControl from './PickerControl';
import { addHours, subtractHours } from '../utils/dates';

const TimePickerHeader = ({ setTimeMode, setTempTime, timeMode, tempTime, hours, minutes, timePeriod }) => {
  return (
    <header className="md-picker-header">
      <PickerControl onClick={setTimeMode.bind(this, 'hour')} active={timeMode === 'hour'}>
        <h4 className="md-display-3">
          {hours}
        </h4>
      </PickerControl>
      <PickerControl onClick={setTimeMode.bind(this, 'minute')} active={timeMode === 'minute'}>
        <h4 className="md-display-3">
          {minutes}
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
  tempTime: PropTypes.instanceOf(Date).isRequired,
  timeMode: PropTypes.oneOf(['hour', 'minute']).isRequired,
  setTimeMode: PropTypes.func.isRequired,
  setTempTime: PropTypes.func.isRequired,
  hours: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  timePeriod: PropTypes.string,
};

export default TimePickerHeader;
