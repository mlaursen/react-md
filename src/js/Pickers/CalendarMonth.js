import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import addDate from '../utils/DateUtils/addDate';
import stripTime from '../utils/DateUtils/stripTime';
import getLastDay from '../utils/DateUtils/getLastDay';
import getDayOfWeek from '../utils/DateUtils/getDayOfWeek';

import CalendarDate from './CalendarDate';

/**
 * This component renders a month for the calendar view of the `DatePicker`.
 */
export default class CalendarMonth extends PureComponent {
  static propTypes = {
    /**
     * A className to apply.
     */
    className: PropTypes.string,

    /**
     * The current selected date of the calendar. This is
     * the date after hitting the Ok button or `value` || `defaultValue`.
     */
    calendarDate: PropTypes.instanceOf(Date).isRequired,

    /**
     * The current selected date of the calendar before verifying
     * the new date.
     */
    calendarTempDate: PropTypes.instanceOf(Date).isRequired,

    /**
     * An optional min date for the calendar. This will disable any
     * dates that come before this date in the month.
     */
    minDate: PropTypes.instanceOf(Date),

    /**
     * An optional max date for the calendar. This will disable any
     * dates that come after this date in the month.
     */
    maxDate: PropTypes.instanceOf(Date),

    /**
     * A function to call that will select a new date.
     */
    onCalendarDateClick: PropTypes.func.isRequired,
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  };

  render() {
    const {
      calendarDate,
      calendarTempDate,
      onCalendarDateClick,
      minDate,
      maxDate,
      DateTimeFormat,
      locales,
      className,
      ...props
    } = this.props;

    const days = [];
    let currentDate = stripTime(getDayOfWeek(new Date(calendarDate).setDate(1), 0));
    const endDate = stripTime(getDayOfWeek(getLastDay(calendarDate), 6));
    const activeDate = stripTime(new Date(calendarTempDate));
    const today = stripTime(new Date());

    while (currentDate <= endDate) {
      const key = `${currentDate.getMonth()}-${currentDate.getDate()}`;

      let date;
      if (currentDate.getMonth() === calendarDate.getMonth()) {
        const time = currentDate.getTime();
        const isMinDateDisabled = minDate && minDate.getTime() > time;
        const isMaxDateDisbaled = maxDate && maxDate.getTime() < time;
        date = (
          <CalendarDate
            key={key}
            today={time === today.getTime()}
            active={time === activeDate.getTime()}
            disabled={isMinDateDisabled || isMaxDateDisbaled}
            onClick={onCalendarDateClick}
            date={currentDate}
            DateTimeFormat={DateTimeFormat}
            locales={locales}
          />
        );
      } else {
        date = <div key={key} className="md-calendar-date" />;
      }

      days.push(date);
      currentDate = addDate(currentDate, 1, 'D');
    }

    return (
      <div className={cn('md-calendar-month', className)} {...props}>
        {days}
      </div>
    );
  }
}
