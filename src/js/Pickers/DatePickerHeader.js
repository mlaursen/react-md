import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PickerControl from './PickerControl';

/**
 * The `DatePickerHeader` component is the component that holds the
 * current year and the current date. It allows the user to switch
 * between calendar and year picker mode.
 */
export default class DatePickerHeader extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = this.getFormattedDate(props);
  }

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

  componentWillReceiveProps(nextProps) {
    const { DateTimeFormat, locales, calendarTempDate, changeCalendarMode } = this.props;
    if(DateTimeFormat !== nextProps.DateTimeFormat
      || locales !== nextProps.locales
      || calendarTempDate !== nextProps.calendarTempDate
      || changeCalendarMode !== nextProps.changeCalendarMode) {
      this.setState(this.getFormattedDate(nextProps));
    }
  }

  getFormattedDate = ({ DateTimeFormat, locales, calendarTempDate }) => {
    return {
      year: DateTimeFormat(locales, { year: 'numeric' }).format(calendarTempDate),
      weekday: DateTimeFormat(locales, { weekday: 'short' }).format(calendarTempDate),
      date: DateTimeFormat(locales, { month: 'short', day: '2-digit' }).format(calendarTempDate),
    };
  };

  selectYear = (e) => {
    this.props.changeCalendarMode('year', e);
  };

  selectCalendar = (e) => {
    this.props.changeCalendarMode('calendar', e);
  };

  render() {
    const { year, weekday, date } = this.state;
    const { calendarMode } = this.props;
    return (
      <header className="md-picker-header">
        <PickerControl onClick={this.selectYear} active={calendarMode === 'year'}>
          <h6 className="md-subtitle">{year}</h6>
        </PickerControl>
        <PickerControl onClick={this.selectCalendar} active={calendarMode === 'calendar'}>
          <h4 className="md-display-1">{weekday + ','}&nbsp;</h4>
          <h4 className="md-display-1">{date}</h4>
        </PickerControl>
      </header>
    );
  }
}
