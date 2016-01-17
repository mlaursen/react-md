import React, { PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';

const stripTime = (date) => date.hour(0).minute(0).second(0).millisecond(0);

/**
 * Jan 17 2016 -> Dec 27 2015
 * May 1 2016 -> May 1 2016 -- It starts on a Sunday
 *
 * Strips all time from the date and gets the current
 * date for the start of week.
 * @return A moment object with all time stripped
 */
function getCalendarStart(date) {
  return stripTime(date.clone().date(1).day(0));
}

function getCalendarEnd(date) {
  return stripTime(date.clone().endOf('month').day(6));
}

const Month = ({ currentMonth, selectedDate, onCalendarDateClick }) => {
  let days = [];
  let currentDate = getCalendarStart(currentMonth);
  const endDate = getCalendarEnd(currentMonth);
  const activeDate = stripTime(selectedDate.clone());
  const today = stripTime(moment());

  while(currentDate.isSameOrBefore(endDate)) {
    const key = currentDate.format('YYYY-MM-DD');
    let date;
    if(currentDate.month() === currentMonth.month()) {
      date = (
        <button
          type="button"
          key={key}
          className={classnames('md-calendar-date', {
            'today': currentDate.isSame(today),
            'active': currentDate.isSame(activeDate),
          })}
          onClick={onCalendarDateClick.bind(this, currentDate.clone())}
          >
          <span className="date">{currentDate.format('D')}</span>
        </button>
      );
    } else {
      date = <div key={key} className="md-calendar-date-placeholder" />;
    }

    days.push(date);
    currentDate = currentDate.add(1, 'd');
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
