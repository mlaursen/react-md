import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { getDayOfWeek, addDate, stripTime, getLastDay } from '../utils/dates';
import CalendarDate from './CalendarDate';

/**
 * This component renders a month for the calendar view of the `DatePicker`.
 */
export default class CalendarMonth extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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
      ...props,
    } = this.props;

    const days = [];
    let currentDate = stripTime(getDayOfWeek(new Date(calendarDate).setDate(1), 0));
    const endDate = stripTime(getDayOfWeek(getLastDay(calendarDate), 6));
    const activeDate = stripTime(new Date(calendarTempDate));
    const today = stripTime(new Date());

    while(currentDate <= endDate) {
      const key = currentDate.getMonth() + '-' + currentDate.getDate();
      let date;
      if(currentDate.getMonth() === calendarDate.getMonth()) {
        const isMinDateDisabled = minDate && minDate.getTime() > currentDate.getTime();
        const isMaxDateDisbaled = maxDate && maxDate.getTime() < currentDate.getTime();
        date = (
          <CalendarDate
            key={key}
            className={classnames({
              'today': currentDate.getTime() === today.getTime(),
              'active': currentDate.getTime() === activeDate.getTime(),
            })}
            disabled={isMinDateDisabled || isMaxDateDisbaled}
            onClick={onCalendarDateClick}
            date={currentDate}
            DateTimeFormat={DateTimeFormat}
            locales={locales}
          />
        );
      } else {
        date = <div key={key} className="md-calendar-date-placeholder" />;
      }

      days.push(date);
      currentDate = addDate(currentDate, 1, 'D');
    }

    return (
      <div className={classnames('md-calendar-month', className)} {...props}>
        {days}
      </div>
    );
  }
}
