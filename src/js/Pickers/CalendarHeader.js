import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

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
    /**
     * An optional className to apply to the title.
     */
    titleClassName: PropTypes.string,
    /**
     * The DateTimeFormat options to apply to format the title.
     */
    titleFormat: PropTypes.shape({
      era: PropTypes.oneOf(['narrow', 'short', 'long']),
      year: PropTypes.oneOf(['numeric', '2-digit']),
      month: PropTypes.oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
    }),
    /**
     * An optional className to apply to a weekday.
     */
    weekdayClassName: PropTypes.string,
    /**
     * The DateTimeFormat option to apply to format a weekday.
     */
    weekdayFormat: PropTypes.oneOf(['narrow', 'short', 'long']),
  };

  static defaultProps = {
    titleFormat: { month: 'long', year: 'numeric' },
    weekdayFormat: 'narrow',
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

  _createState({ DateTimeFormat, locales, date, titleFormat, weekdayClassName, weekdayFormat } = this.props) {
    const sunday = getDayOfWeek(date, 0);
    const formatter = new DateTimeFormat(locales, { weekday: weekdayFormat });
    const dows = [];
    for (let i = 0; i < 7; i++) {
      const dow = formatter.format(addDate(sunday, i, 'D'));
      dows.push(
        <h4 className={cn('md-calendar-date md-text--disabled md-calendar-dow', weekdayClassName)} key={i}>
          {dow}
        </h4>
      );
    }

    return {
      dows,
      title: new DateTimeFormat(locales, titleFormat).format(date),
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
      titleClassName,
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
          <h4 className={cn('md-title', titleClassName)}>{title}</h4>
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
