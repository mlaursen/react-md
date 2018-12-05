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
     * An optional function to provide class for each date in calendar.
     */
    getDateClassName: PropTypes.func,

    /**
     * An optional function to render each date component.
     */
    dateRenderer: PropTypes.func,

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
      getDateClassName,
      dateRenderer,
      outerDateClassName,
      titleClassName,
      titleFormat,
      weekdayClassName,
      weekdayFormat,
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
          getDateClassName={getDateClassName}
          dateRenderer={dateRenderer}
          outerDateClassName={outerDateClassName}
        />
      </section>
    );
  }
}
