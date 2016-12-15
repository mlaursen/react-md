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
    active: PropTypes.bool,
    today: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = this._getFormattedDate(props);
    this.state.desktopActive = false;
    this._handleClick = this._handleClick.bind(this);
    this._setActive = this._setActive.bind(this);
    this._setInactive = this._setInactive.bind(this);
    this._setFocus = this._setFocus.bind(this);
  }

  componentWillUpdate(nextProps) {
    const { DateTimeFormat, locales, date } = this.props;
    if (DateTimeFormat !== nextProps.DateTimeFormat || locales !== nextProps.locales || date !== nextProps.date) {
      this.setState(this._getFormattedDate(nextProps));
    }
  }

  _setFocus(btn) {
    if (btn && this.props.active) {
      btn.focus();
    }
  }

  _getFormattedDate({ DateTimeFormat, locales, date }) {
    return {
      date: new DateTimeFormat(locales, { day: 'numeric' }).format(date),
    };
  }

  _handleClick(e) {
    this.props.onClick(new Date(this.props.date), e);
  }

  _setActive() {
    if (!this.props.disabled) {
      this.setState({ desktopActive: true });
    }
  }

  _setInactive() {
    if (!this.props.disabled) {
      this.setState({ desktopActive: false });
    }
  }

  render() {
    const { date, desktopActive } = this.state;
    const { disabled, active, today, className } = this.props;

    const fullyActive = today && !active && !desktopActive;
    return (
      <button
        type="button"
        ref={this._setFocus}
        onFocus={this._setActive}
        onBlur={this._setInactive}
        onMouseOver={this._setActive}
        onMouseLeave={this._setInactive}
        className={cn('md-btn md-calendar-date md-calendar-date--btn', {
          'md-text--disabled': disabled,
          'md-pointer--hover': !disabled,
          'md-text--theme-primary': fullyActive,
          'md-calendar-date--btn-active': active || desktopActive,
        }, className)}
        onClick={this._handleClick}
        disabled={disabled}
      >
        <span
          className={cn('md-calendar-date--date', {
            'md-picker-text--active': active || desktopActive,
            'md-font-bold': fullyActive,
          })}
        >
          {date}
        </span>
      </button>
    );
  }
}
