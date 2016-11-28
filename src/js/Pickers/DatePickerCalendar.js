import React, { PureComponent, PropTypes } from 'react';

import CalendarMonth from './CalendarMonth';
import CalendarHeader from './CalendarHeader';

export default class DatePickerCalendar extends PureComponent {
  static propTypes = {
    previousIconChildren: PropTypes.node,
    previousIconClassName: PropTypes.string,
    onPreviousClick: PropTypes.func.isRequired,
    nextIconChildren: PropTypes.node,
    nextIconClassName: PropTypes.string,
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

  render() {
    const {
      previousIconChildren,
      previousIconClassName,
      onPreviousClick,
      nextIconChildren,
      nextIconClassName,
      onNextClick,
      calendarDate,
      calendarTempDate,
      onCalendarDateClick,
      DateTimeFormat,
      locales,
      minDate,
      maxDate,
    } = this.props;

    return (
      <section className="md-picker-content md-picker-content--calendar">
        <CalendarHeader
          date={calendarDate}
          minDate={minDate}
          maxDate={maxDate}
          DateTimeFormat={DateTimeFormat}
          locales={locales}
          onPreviousClick={onPreviousClick}
          previousIconChildren={previousIconChildren}
          previousIconClassName={previousIconClassName}
          onNextClick={onNextClick}
          nextIconChildren={nextIconChildren}
          nextIconClassName={nextIconClassName}
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
        />
      </section>
    );
  }
}
