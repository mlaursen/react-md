import React, { PureComponent, PropTypes } from 'react';

import isMonthBefore from '../utils/DateUtils/isMonthBefore';
import getDayOfWeek from '../utils/DateUtils/getDayOfWeek';
import addDate from '../utils/DateUtils/addDate';
import Button from '../Buttons/Button';

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
    previousIconChildren: PropTypes.node,
    previousIconClassName: PropTypes.string,
    onPreviousClick: PropTypes.func.isRequired,
    nextIconChildren: PropTypes.node,
    nextIconClassName: PropTypes.string,
    onNextClick: PropTypes.func.isRequired,
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = this._createState(props);
  }

  componentWillReceiveProps(nextProps) {
    const { DateTimeFormat, locales, date } = this.props;
    if (DateTimeFormat !== nextProps.DateTimeFormat || locales !== nextProps.locales || date !== nextProps.date) {
      this.setState(this._createState(nextProps));
    }
  }

  _createState({ DateTimeFormat, locales, date } = this.props) {
    const sunday = getDayOfWeek(date, 0);
    const formatter = new DateTimeFormat(locales, { weekday: 'narrow' });
    const dows = [];
    for (let i = 0; i < 7; i++) {
      const dow = formatter.format(addDate(sunday, i, 'D'));
      dows.push(
        <h4 className="md-calendar-date md-text--disabled md-calendar-dow" key={i}>
          {dow}
        </h4>
      );
    }

    return {
      dows,
      title: new DateTimeFormat(locales, { month: 'long', year: 'numeric' }).format(date),
    };
  }

  render() {
    const { dows, title } = this.state;
    const {
      date,
      minDate,
      maxDate,
      onPreviousClick,
      previousIconChildren,
      previousIconClassName,
      onNextClick,
      nextIconChildren,
      nextIconClassName,
    } = this.props;

    const isPreviousDisabled = isMonthBefore(minDate, date);
    const isNextDisabled = isMonthBefore(date, maxDate);
    return (
      <header className="md-calendar-header">
        <div className="md-calendar-controls">
          <Button
            icon
            onClick={onPreviousClick}
            disabled={isPreviousDisabled}
            className="md-calendar-control"
            iconClassName={previousIconClassName}
          >
            {previousIconChildren}
          </Button>
          <h4 className="md-title">{title}</h4>
          <Button
            icon
            onClick={onNextClick}
            disabled={isNextDisabled}
            className="md-calendar-control"
            iconClassName={nextIconClassName}
          >
            {nextIconChildren}
          </Button>
        </div>
        <div className="md-calendar-dows">
          {dows}
        </div>
      </header>
    );
  }
}
