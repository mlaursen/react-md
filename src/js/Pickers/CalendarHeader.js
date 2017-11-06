import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import themeColors from '../utils/themeColors';
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
    previousIcon: PropTypes.element,
    onPreviousClick: PropTypes.func.isRequired,
    nextIcon: PropTypes.node,
    onNextClick: PropTypes.func.isRequired,
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    /**
     * The first day of week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
     */
    firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
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

    /**
     * The timeZone to be used in all formatting operations.
     * For a full list of possible timeZone values check https://www.iana.org/time-zones.
     */
    timeZone: PropTypes.string.isRequired,
  };

  static defaultProps = {
    firstDayOfWeek: 0,
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

  _createState({
    DateTimeFormat,
    locales,
    date,
    firstDayOfWeek,
    titleFormat,
    weekdayClassName,
    weekdayFormat,
    timeZone,
  } = this.props) {
    const firstDay = getDayOfWeek(date, firstDayOfWeek);
    const formatter = new DateTimeFormat(locales, { weekday: weekdayFormat, timeZone });
    const dows = [];
    for (let i = 0; i < 7; i++) {
      const dow = formatter.format(addDate(firstDay, i, 'D'));
      dows.push(
        <h4
          key={i}
          className={cn('md-calendar-date md-calendar-dow', themeColors({ disabled: true }), weekdayClassName)}
        >
          {dow}
        </h4>
      );
    }

    return {
      dows,
      title: new DateTimeFormat(locales, { ...titleFormat, timeZone }).format(date),
    };
  }

  render() {
    const { dows, title } = this.state;
    const {
      date,
      minDate,
      maxDate,
      onPreviousClick,
      previousIcon,
      onNextClick,
      nextIcon,
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
            iconEl={previousIcon}
          />
          <h4 className={cn('md-title', titleClassName)}>{title}</h4>
          <Button
            icon
            onClick={onNextClick}
            disabled={isNextDisabled}
            className="md-calendar-control"
            iconEl={nextIcon}
          />
        </div>
        <div className="md-calendar-dows">
          {dows}
        </div>
      </header>
    );
  }
}
