/* eslint-disable new-cap */
import React, { PureComponent, PropTypes } from 'react';

import CalendarMonth from './CalendarMonth';
import SwipeableView from '../SwipeableViews';
import CalendarHeader from './CalendarHeader';

export default class DatePickerCalendar extends PureComponent {
  static propTypes = {
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
    onSwipeChange: PropTypes.func.isRequired,
    transitionName: PropTypes.string.isRequired,
  };

  render() {
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
      onSwipeChange,
      transitionName,
    } = this.props;

    return (
      <section className="md-picker-content md-calendar">
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
        />
        <SwipeableView
          onChange={onSwipeChange}
          transitionName={transitionName}
          transitionEnterTimeout={150}
          transitionLeave={false}
        >
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
        </SwipeableView>
      </section>
    );
  }
}
