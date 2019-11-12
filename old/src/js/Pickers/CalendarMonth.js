import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import addDate from '../utils/dates/addDate';
import chunk from '../utils/chunk';
import getLastDay from '../utils/dates/getLastDay';
import stripTime from '../utils/dates/stripTime';
import toDayOfWeek from '../utils/dates/toDayOfWeek';

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

    /**
     * The first day of week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
     */
    firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),

    /**
     * True if weekends are to be greyed out.
     */
    disableWeekEnds: PropTypes.bool,

    /**
     * An optional className to apply to a date.
     */
    dateClassName: PropTypes.string,

    /**
     * An optional function to provide class for each date in calendar.
     */
    getDateClassName: PropTypes.func,

      /**
     * An optional function to render each date component.
     */
    dateRenderer: PropTypes.func,

    /**
     * True if dates from adjacent months should be shown.
     */
    showAllDays: PropTypes.bool,
    disableOuterDates: PropTypes.bool,

    /**
     * An optional className to apply to a date from an adjacent month.
     */
    outerDateClassName: PropTypes.string,
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  };

  static defaultProps = {
    firstDayOfWeek: 0,
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
      firstDayOfWeek,
      disableWeekEnds,
      dateClassName,
      getDateClassName,
      dateRenderer,
      showAllDays,
      outerDateClassName,
      disableOuterDates,
      ...props
    } = this.props;

    const days = [];
    const firstDay = stripTime(calendarDate);
    firstDay.setDate(1);
    const lastDay = getLastDay(calendarDate);
    let currentDate = toDayOfWeek(firstDay, 0);

    // changing with DST and different timezones gets tricky... setting
    // to noon might fix the date comparison below since it should be
    // more than the DST time difference
    let endDate = toDayOfWeek(lastDay, 6);
    endDate.setHours(12);

    const activeDateTime = stripTime(calendarTempDate).getTime();
    const todayTime = new Date().getTime();

    if (firstDayOfWeek) {
      currentDate = addDate(currentDate, firstDayOfWeek > firstDay.getDay() ? firstDayOfWeek - 7 : firstDayOfWeek, 'D');
      endDate = addDate(endDate, firstDayOfWeek > lastDay.getDay() ? firstDayOfWeek - 7 : firstDayOfWeek, 'D');
    }

    while (currentDate <= endDate) {
      const key = `${currentDate.getMonth()}-${currentDate.getDate()}`;
      const currentMonth = currentDate.getMonth() === calendarDate.getMonth();

      let date;
      if (currentMonth || showAllDays) {
        const time = currentDate.getTime();
        const isMinDateDisabled = minDate && minDate.getTime() > time;
        const isMaxDateDisabled = maxDate && maxDate.getTime() < time;
        const isWeekendDisabled = disableWeekEnds && (currentDate.getDay() === 0 || currentDate.getDay() === 6);
        const disabled = (!currentMonth && disableOuterDates)
          || isMinDateDisabled
          || isMaxDateDisabled
          || isWeekendDisabled;

        date = (
          <CalendarDate
            key={key}
            className={cn(dateClassName, { [outerDateClassName]: !currentMonth && outerDateClassName })}
            today={time === todayTime}
            getDateClassName={getDateClassName}
            dateRenderer={dateRenderer}
            active={time === activeDateTime}
            disabled={disabled}
            onClick={onCalendarDateClick}
            date={currentDate}
            DateTimeFormat={DateTimeFormat}
            locales={locales}
          />
        );
      } else {
        date = <div key={key} className="md-calendar-date" role="gridcell" />;
      }

      days.push(date);
      currentDate = addDate(currentDate, 1, 'D');
    }

    const weeks = chunk(days, 7);

    return (
      <div role="grid" className={cn('md-calendar-month', className)} {...props}>
        {weeks.map((week, i) => (
          <div key={i} role="row">
            {week}
          </div>
        ))}
      </div>
    );
  }
}
