import React, { PropTypes } from 'react';

import { PickerControl } from '../Pickers';

const DatePickerHeader = ({ DateTimeFormat, locales, changeCalendarMode, calendarMode, calendarTempDate }) => {
  return (
    <header className="md-picker-header">
      <PickerControl onClick={changeCalendarMode.bind(this, 'year')} active={calendarMode === 'year'}>
        <h6 className="md-subtitle">
          {DateTimeFormat(locales, { year: 'numeric' }).format(calendarTempDate)}
        </h6>
      </PickerControl>
      <PickerControl onClick={changeCalendarMode.bind(this, 'calendar')} active={calendarMode === 'calendar'}>
        <h4 className="md-display-1">
          {DateTimeFormat(locales, { weekday: 'short' }).format(calendarTempDate)},&nbsp;
        </h4>
        <h4 className="md-display-1">
          {DateTimeFormat(locales, { month: 'short', day: '2-digit' }).format(calendarTempDate)}
        </h4>
      </PickerControl>
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
  calendarMode: PropTypes.oneOf(['calendar', 'year']).isRequired,
  changeCalendarMode: PropTypes.func.isRequired,
};

export default DatePickerHeader;
