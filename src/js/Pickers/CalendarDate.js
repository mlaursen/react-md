/* eslint-disable new-cap */
import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * This component renders a selectable date in the `CalendarMonth` component.
 */
export default class CalendarDate extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    date: PropTypes.instanceOf(Date).isRequired,
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = this._getFormattedDate(props);
    this._handleClick = this._handleClick.bind(this);
  }

  componentWillUpdate(nextProps) {
    const { DateTimeFormat, locales, date } = this.props;
    if (DateTimeFormat !== nextProps.DateTimeFormat || locales !== nextProps.locales || date !== nextProps.date) {
      this.setState(this._getFormattedDate(nextProps));
    }
  }

  _getFormattedDate({ DateTimeFormat, locales, date }) {
    return {
      date: DateTimeFormat(locales, { day: 'numeric' }).format(date),
    };
  }

  _handleClick(e) {
    this.props.onClick(new Date(this.props.date), e);
  }

  render() {
    const { date } = this.state;
    const { disabled, className } = this.props;
    return (
      <button
        type="button"
        className={cn('md-calendar-date', className)}
        onClick={this._handleClick}
        disabled={disabled}
      >
        <span className="date">{date}</span>
      </button>
    );
  }
}
