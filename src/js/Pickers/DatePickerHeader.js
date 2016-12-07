/* eslint-disable new-cap */
import React, { PureComponent, PropTypes } from 'react';

import PickerControl from './PickerControl';

/**
 * The `DatePickerHeader` component is the component that holds the
 * current year and the current date. It allows the user to switch
 * between calendar and year picker mode.
 */
export default class DatePickerHeader extends PureComponent {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    calendarTempDate: PropTypes.instanceOf(Date).isRequired,
    calendarMode: PropTypes.oneOf(['calendar', 'year']).isRequired,
    changeCalendarMode: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = this._getFormattedDate(props);
    this._selectYear = this._selectYear.bind(this);
    this._selectCalendar = this._selectCalendar.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { DateTimeFormat, locales, calendarTempDate, changeCalendarMode } = this.props;
    if (DateTimeFormat !== nextProps.DateTimeFormat
      || locales !== nextProps.locales
      || calendarTempDate !== nextProps.calendarTempDate
      || changeCalendarMode !== nextProps.changeCalendarMode) {
      this.setState(this._getFormattedDate(nextProps));
    }
  }

  _getFormattedDate({ DateTimeFormat, locales, calendarTempDate }) {
    return {
      year: DateTimeFormat(locales, { year: 'numeric' }).format(calendarTempDate),
      weekday: DateTimeFormat(locales, { weekday: 'short' }).format(calendarTempDate),
      date: DateTimeFormat(locales, { month: 'short', day: '2-digit' }).format(calendarTempDate),
    };
  }

  _selectYear(e) {
    this.props.changeCalendarMode('year', e);
  }

  _selectCalendar(e) {
    this.props.changeCalendarMode('calendar', e);
  }

  render() {
    const { year, weekday, date } = this.state;
    const { calendarMode } = this.props;
    return (
      <header className="md-picker-header">
        <PickerControl onClick={this._selectYear} active={calendarMode === 'year'}>
          <h6 className="md-subheading-1">{year}</h6>
        </PickerControl>
        <PickerControl onClick={this._selectCalendar} active={calendarMode === 'calendar'}>
          <h4 className="md-display-1">{`${weekday},`}&nbsp;</h4>
          <h4 className="md-display-1">{date}</h4>
        </PickerControl>
      </header>
    );
  }
}
