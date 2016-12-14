import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import { TAB } from '../constants/keyCodes';

const CLOCK_PADDING = 4;

/**
 * The `ClockTime` component is used for positioning hours or minutes
 * in a clock. The time will be positioned based on it's given index
 * and the radius of the clock.
 */
export default class ClockTime extends PureComponent {
  static propTypes = {
    /**
     * The index of the current time to be displayed. This
     * should be a number between 1 and 24.
     */
    index: PropTypes.number.isRequired,

    /**
     * The time number to display.
     */
    time: PropTypes.number.isRequired,

    /**
     * Boolean if this time is currently selected.
     */
    active: PropTypes.bool.isRequired,

    /**
     * The radius of the clock.
     */
    radius: PropTypes.number.isRequired,

    onKeyboardFocus: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      // default size in scss
      size: 18,
    };

    this._setTime = this._setTime.bind(this);
    this._setPosition = this._setPosition.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.radius !== nextProps.radius || this.props.index !== nextProps.index) {
      this._setPosition(nextProps, this._time);
    }
  }

  _handleKeyUp(e) {
    if ((e.which || e.keyCode) === TAB) {
      this.props.onKeyboardFocus(this.props.time);
    }
  }

  _setTime(time) {
    this._time = time;
    if (time !== null) {
      this._setPosition(this.props, time);

      if (this.props.active) {
        time.focus();
      }
    }
  }

  _setPosition({ radius, index }, time) {
    // 36 is default size for the time
    const size = (time.offsetWidth || 36) / 2;
    const timeRadians = (Math.PI / 2) - index * (Math.PI / 6);
    const innerCircle = index > 12;

    const outerRadius = radius - size;
    const innerRadius = outerRadius - CLOCK_PADDING - (innerCircle ? size * 2 : 0);

    this.setState({
      style: {
        top: outerRadius - innerRadius * Math.sin(timeRadians),
        left: outerRadius + innerRadius * Math.cos(timeRadians),
      },
    });
  }

  render() {
    const { time, active } = this.props;
    return (
      <div
        ref={this._setTime}
        tabIndex={0}
        className={cn('md-clock-time md-text-no-select md-pointer--none', {
          'md-text': !active,
          'md-picker-text--active': active,
        })}
        style={this.state.style}
        onKeyUp={this._handleKeyUp}
      >
        <span className="md-clock-time-value">{time}</span>
      </div>
    );
  }
}
