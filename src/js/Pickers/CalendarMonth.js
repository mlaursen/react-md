import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { getDayOfWeek, addDate, stripTime, getLastDay } from '../utils';

const CalendarMonth = ({ calendarDate, calendarTempDate, onCalendarDateClick, minDate, maxDate, DateTimeFormat, locales }) => {
  let days = [];
  let currentDate = stripTime(getDayOfWeek(new Date(calendarDate).setDate(1), 0));
  const endDate = stripTime(getDayOfWeek(getLastDay(calendarDate), 6));
  const activeDate = stripTime(new Date(calendarTempDate));
  const today = stripTime(new Date());

  while(currentDate <= endDate) {
    const key = DateTimeFormat(locales).format(currentDate);
    let date;
    if(currentDate.getMonth() === calendarDate.getMonth()) {
      const isMinDateDisabled = minDate && minDate.getTime() > currentDate.getTime();
      const isMaxDateDisbaled = maxDate && maxDate.getTime() < currentDate.getTime();
      date = (
        <button
          type="button"
          key={key}
          className={classnames('md-calendar-date', {
            'today': currentDate.getTime() === today.getTime(),
            'active': currentDate.getTime() === activeDate.getTime(),
          })}
          onClick={onCalendarDateClick.bind(this, new Date(currentDate))}
          disabled={isMinDateDisabled || isMaxDateDisbaled}
          >
          <span className="date">{DateTimeFormat(locales, { day: 'numeric' }).format(currentDate)}</span>
        </button>
      );
    } else {
      date = <div key={key} className="md-calendar-date-placeholder" />;
    }

    days.push(date);
    currentDate = addDate(currentDate, 1, 'D');
  }

  return (
    <section className="md-calendar-month">
      {days}
    </section>
  );
};

CalendarMonth.propTypes = {
  calendarDate: PropTypes.instanceOf(Date).isRequired,
  calendarTempDate: PropTypes.instanceOf(Date).isRequired,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onCalendarDateClick: PropTypes.func.isRequired,
  DateTimeFormat: PropTypes.func.isRequired,
  locales: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default CalendarMonth;
