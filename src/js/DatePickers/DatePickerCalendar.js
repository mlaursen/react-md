import React, { PropTypes } from 'react';

import { IconButton } from '../Buttons';
import { isMonthBefore } from '../utils';
import CalendarMonth from './CalendarMonth';

const DatePickerCalendar = (props) => {
  const {
    previousIcon,
    onPreviousClick,
    nextIcon,
    onNextClick,
    calendarDate,
    calendarTempDate,
    onCalendarDateClick,
    DateTimeFormat,
    locales,
    minDate,
    maxDate,
  } = props;

  const dows = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dow, i) => (
    <h4 className="dow" key={`dow-${dow}-${i}`}>{dow}</h4>
  ));

  const isPreviousDisabled = isMonthBefore(minDate, calendarDate);
  const isNextDisabled = isMonthBefore(calendarDate, maxDate);
  return (
    <section className="md-picker-content md-calendar">
      <header className="md-calendar-header">
        <div className="md-calendar-controls">
          <IconButton onClick={onPreviousClick} disabled={isPreviousDisabled}>{previousIcon}</IconButton>
          <h4 className="md-subtitle">
            {DateTimeFormat(locales, { month: 'long', year: 'numeric' }).format(calendarDate)}
          </h4>
          <IconButton onClick={onNextClick} disabled={isNextDisabled}>{nextIcon}</IconButton>
        </div>
        <div className="md-dows">
          {dows}
        </div>
      </header>
      <CalendarMonth
        key={DateTimeFormat(locales).format(calendarDate)}
        calendarDate={calendarDate}
        calendarTempDate={calendarTempDate}
        onCalendarDateClick={onCalendarDateClick}
        minDate={minDate}
        maxDate={maxDate}
        DateTimeFormat={DateTimeFormat}
        locales={locales}
      />
    </section>
  );
};

DatePickerCalendar.propTypes = {
  previousIcon: PropTypes.node.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  nextIcon: PropTypes.node.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onCalendarDateClick: PropTypes.func.isRequired,
  calendarDate: PropTypes.instanceOf(Date).isRequired,
  calendarTempDate: PropTypes.instanceOf(Date).isRequired,
  DateTimeFormat: PropTypes.func.isRequired,
  locales: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
};

export default DatePickerCalendar;
