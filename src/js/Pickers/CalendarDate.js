import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import themeColors from '../utils/themeColors';

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
    active: PropTypes.bool,
    today: PropTypes.bool,
    getDateClassName: PropTypes.func,
    dateRenderer: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = { ...this._getFormattedDate(props), desktopActive: false };
  }

  componentWillReceiveProps(nextProps) {
    const { DateTimeFormat, locales, date } = this.props;
    if (DateTimeFormat !== nextProps.DateTimeFormat || locales !== nextProps.locales || date !== nextProps.date) {
      this.setState(this._getFormattedDate(nextProps));
    }
  }

  _getFormattedDate({ DateTimeFormat, locales, date }) {
    return {
      date: new DateTimeFormat(locales, { day: 'numeric' }).format(date),
    };
  }

  _setFocus = (btn) => {
    if (btn && this.props.active) {
      btn.focus();
    }
  };

  _handleClick = (e) => {
    this.props.onClick(new Date(this.props.date), e);
  };

  _setActive = () => {
    if (!this.props.disabled) {
      this.setState({ desktopActive: true });
    }
  };

  _setInactive = () => {
    if (!this.props.disabled) {
      this.setState({ desktopActive: false });
    }
  };

  render() {
    const { date, desktopActive } = this.state;
    const { disabled, active, today, className, getDateClassName, dateRenderer } = this.props;

    const fullyActive = today && !active && !desktopActive;

    const generatedClassName = getDateClassName
      ? getDateClassName(this.props.date, date)
      : null;

    return (
      <div
        role="gridcell"
        className="md-calendar-date"
        style={{ display: 'inline-block' }}
      >
        <button
          type="button"
          ref={this._setFocus}
          onFocus={this._setActive}
          onBlur={this._setInactive}
          onMouseOver={this._setActive}
          onMouseLeave={this._setInactive}
          className={cn('md-calendar-date--btn', {
            'md-calendar-date--btn-active': active || desktopActive,
            'md-pointer--hover': !disabled,
          }, themeColors({ disabled, primary: fullyActive }), 'md-btn', className, generatedClassName)}
          onClick={this._handleClick}
          disabled={disabled}
        >
          <span
            className={cn('md-calendar-date--date', {
              'md-picker-text--active': active || desktopActive,
              'md-font-bold': fullyActive,
            })}
          >
            {dateRenderer ? dateRenderer(this.props.date, date) : date}
          </span>
        </button>
      </div>
    );
  }
}
