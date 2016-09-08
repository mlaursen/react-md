/* eslint-disable new-cap */
import React, { PureComponent, PropTypes } from 'react';

import Button from '../Buttons';
import { isMonthBefore, getDayOfWeek, addDate } from '../utils/dates';

/**
 * This component renders the controls for a `DatePicker`'s Calendar.
 * This will render a next and previous month button along with the
 * current month/year. It also renders the abbreviiations for the days
 * of the week.
 */
export default class CalendarHeader extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    date: PropTypes.instanceOf(Date).isRequired,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    previousIcon: PropTypes.node.isRequired,
    onPreviousClick: PropTypes.func.isRequired,
    nextIcon: PropTypes.node.isRequired,
    onNextClick: PropTypes.func.isRequired,
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = this._generateDows(props);
  }

  componentWillReceiveProps(nextProps) {
    const { DateTimeFormat, locales } = this.props;
    if (DateTimeFormat !== nextProps.DateTimeFormat || locales !== nextProps.locales) {
      this.setState(this._generateDows(nextProps));
    }
  }

  _generateDows({ DateTimeFormat, locales, date } = this.props) {
    const sunday = getDayOfWeek(date, 0);
    const formatter = DateTimeFormat(locales, { weekday: 'narrow' });
    const dows = [];
    for (let i = 0; i < 7; i++) {
      const dow = formatter.format(addDate(sunday, i, 'D'));
      dows.push(<h4 className="dow" key={i}>{dow}</h4>);
    }

    return { dows };
  }

  render() {
    const { dows } = this.state;
    const {
      date,
      minDate,
      maxDate,
      onPreviousClick,
      previousIcon,
      onNextClick,
      nextIcon,
      DateTimeFormat,
      locales,
    } = this.props;

    const isPreviousDisabled = isMonthBefore(minDate, date);
    const isNextDisabled = isMonthBefore(date, maxDate);
    return (
      <header className="md-calendar-header">
        <div className="md-calendar-controls">
          <Button icon onClick={onPreviousClick} disabled={isPreviousDisabled}>{previousIcon}</Button>
          <h4 className="md-subtitle">
            {DateTimeFormat(locales, { month: 'long', year: 'numeric' }).format(date)}
          </h4>
          <Button icon onClick={onNextClick} disabled={isNextDisabled}>{nextIcon}</Button>
        </div>
        <div className="md-dows">
          {dows}
        </div>
      </header>
    );
  }
}
