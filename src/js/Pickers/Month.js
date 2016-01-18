import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { getDayOfWeek, addDate, stripTime, formatDate, getLastDay } from '../utils';

const Month = ({ currentMonth, selectedDate, onCalendarDateClick }) => {
  let days = [];
  let currentDate = stripTime(getDayOfWeek(new Date(currentMonth).setDate(1), 0));
  const endDate = stripTime(getDayOfWeek(getLastDay(currentMonth), 6));
  const activeDate = stripTime(new Date(selectedDate));
  const today = stripTime(new Date());

  while(currentDate <= endDate) {
    const key = formatDate(currentDate);
    let date;
    if(currentDate.getMonth() === currentMonth.getMonth()) {
      date = (
        <button
          type="button"
          key={key}
          className={classnames('md-calendar-date', {
            'today': currentDate.getTime() === today.getTime(),
            'active': currentDate.getTime() === activeDate.getTime(),
          })}
          onClick={onCalendarDateClick.bind(this, new Date(currentDate))}
          >
          <span className="date">{formatDate(currentDate, { day: 'numeric' })}</span>
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

Month.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  selectedDate: PropTypes.object.isRequired,
  onCalendarDateClick: PropTypes.func.isRequired,
};

export default Month;
