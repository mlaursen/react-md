import React, { PropTypes } from 'react';

import { PickerControl } from '../Pickers';

const DatePickerHeader = ({ DateTimeFormat, locales, changeCalendarMode, calendarMode, calendarTempDate }) => {
  const time = new DateTimeFormat(locales, { hour: 'numeric', minute: '2-digit' }).format(calendarTempDate);
  let [hour, minute, ...others] = time.split(/(?=[^0-9])/);
  let timePeriod;
  if(others.length) {
    timePeriod = others.join('').trim();
  }
  return (
    <header className="md-picker-header">
      <PickerControl onClick={changeCalendarMode.bind(this, 'hour')} active={calendarMode === 'hour'}>
        <h4 className="md-display-3">
          {hour}
        </h4>
      </PickerControl>
      <PickerControl onClick={changeCalendarMode.bind(this, 'minute')} active={calendarMode === 'minute'}>
        <h4 className="md-display-3">
          {minute}
        </h4>
      </PickerControl>
      {timePeriod &&
      <div className="md-time-periods">
        <PickerControl onClick={() => {}} active={timePeriod === 'AM'}>
          <h6 className="md-subtitle">AM</h6>
        </PickerControl>
        <PickerControl onClick={() => {}} active={timePeriod === 'PM'}>
          <h6 className="md-subtitle">PM</h6>
        </PickerControl>
      </div>
      }
    </header>
  );
};

DatePickerHeader.propTypes = {
  DateTimeFormat: PropTypes.func.isRequired,
  locales: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  calendarTempDate: PropTypes.instanceOf(Date).isRequired,
  calendarMode: PropTypes.oneOf(['hour', 'minute']).isRequired,
  changeCalendarMode: PropTypes.func.isRequired,
};

export default DatePickerHeader;
