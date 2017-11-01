import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import CalendarMonth from './CalendarMonth';
import CalendarHeader from './CalendarHeader';

export default class DatePickerCalendar extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    previousIcon: PropTypes.element,
    onPreviousClick: PropTypes.func.isRequired,
    nextIcon: PropTypes.element,
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

    /**
     * The first day of week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
     */
    firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),

    /**
     * True if weekends are to be greyed out.
     */
    disableWeekEnds: PropTypes.bool,

    /**
     * True if dates from adjacent months should be shown.
     */
    showAllDays: PropTypes.bool,
    disableOuterDates: PropTypes.bool,

    /**
     * An optional className to apply to a date in calendar.
     */
    dateClassName: PropTypes.string,

    /**
     * An optional className to apply to a date from an adjacent month.
     */
    outerDateClassName: PropTypes.string,

    /**
     * An optional className to apply to the title in calendar header.
     */
    titleClassName: PropTypes.string,

    /**
     * The DateTimeFormat options to apply to format the title in calendar header.
     */
    titleFormat: PropTypes.shape({
      era: PropTypes.oneOf(['narrow', 'short', 'long']),
      year: PropTypes.oneOf(['numeric', '2-digit']),
      month: PropTypes.oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
    }),

    /**
     * An optional className to apply to a weekday in calendar header.
     */
    weekdayClassName: PropTypes.string,

    /**
     * The DateTimeFormat option to apply to format a weekday in calendar header.
     */
    weekdayFormat: PropTypes.oneOf(['narrow', 'short', 'long']),

    /**
     * The timeZone to be used in all formatting operations.
     * For a full list of possible timeZone values check https://www.iana.org/time-zones.
     */
    timeZone: PropTypes.string.isRequired,
  };

  render() {
    const {
      className,
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
      firstDayOfWeek,
      disableWeekEnds,
      showAllDays,
      disableOuterDates,
      dateClassName,
      outerDateClassName,
      titleClassName,
      titleFormat,
      weekdayClassName,
      weekdayFormat,
      timeZone,
    } = this.props;

    return (
      <section className={cn('md-picker-content md-picker-content--calendar', className)}>
        <CalendarHeader
          date={calendarDate}
          minDate={minDate}
          maxDate={maxDate}
          DateTimeFormat={DateTimeFormat}
          locales={locales}
          onPreviousClick={onPreviousClick}
          previousIcon={previousIcon}
          onNextClick={onNextClick}
          nextIcon={nextIcon}
          firstDayOfWeek={firstDayOfWeek}
          titleClassName={titleClassName}
          titleFormat={titleFormat}
          weekdayClassName={weekdayClassName}
          weekdayFormat={weekdayFormat}
          timeZone={timeZone}
        />
        <CalendarMonth
          key={new DateTimeFormat(locales).format(calendarDate)}
          calendarDate={calendarDate}
          calendarTempDate={calendarTempDate}
          onCalendarDateClick={onCalendarDateClick}
          minDate={minDate}
          maxDate={maxDate}
          DateTimeFormat={DateTimeFormat}
          locales={locales}
          firstDayOfWeek={firstDayOfWeek}
          disableWeekEnds={disableWeekEnds}
          showAllDays={showAllDays}
          disableOuterDates={disableOuterDates}
          dateClassName={dateClassName}
          outerDateClassName={outerDateClassName}
          timeZone={timeZone}
        />
      </section>
    );
  }
}
