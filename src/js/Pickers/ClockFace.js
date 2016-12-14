import React, { PureComponent, PropTypes } from 'react';

import isValidClick from '../utils/EventUtils/isValidClick';
import captureNextEvent from '../utils/EventUtils/captureNextEvent';
import calcTimeFromPoint from '../utils/NumberUtils/calcTimeFromPoint';
import calcPageOffset from '../utils/calcPageOffset';

import ClockTime from './ClockTime';
import ClockHand from './ClockHand';

/**
 * The `ClockFace` component is used for rendering all the clock's times
 * and the clock hand.
 */
export default class ClockFace extends PureComponent {
  static propTypes = {
    /**
     * The current time for the clock.
     */
    time: PropTypes.number.isRequired,

    /**
     * Boolean if the clock is on the minutes view.
     */
    minutes: PropTypes.bool.isRequired,

    /**
     * A function to call when a new time is selected. It gives the
     * new time value. If it is 12 o'clock, 0 will be given.
     */
    onChange: PropTypes.func.isRequired,

    /**
     * An optional time period string. This should be either AM or PM
     * if the locale uses them.
     */
    timePeriod: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = { radius: 136, moving: false };
    this._center = {};
    this._setFace = this._setFace.bind(this);
    this._calcNewTime = this._calcNewTime.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleTouchMove = this._handleTouchMove.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this._handleMouseMove);
    window.removeEventListener('mouseup', this._handleMouseMove);
    window.removeEventListener('touchmove', this._handleTouchMove);
    window.removeEventListener('touchend', this._handleTouchEnd);
  }

  _setFace(face) {
    this._face = face;

    if (face !== null) {
      const radius = face.offsetWidth / 2;
      const offset = calcPageOffset(face);
      this._center = { x: offset.left + radius, y: offset.top + radius };
      this._left = offset.left;
      this._top = offset.top;
      this.setState({ radius });
    }
  }

  _handleMouseDown(e) {
    if (!isValidClick(e)) {
      return;
    }

    window.addEventListener('mousemove', this._handleMouseMove);
    window.addEventListener('mouseup', this._handleMouseUp);
    this.setState({ moving: true });
  }

  _handleMouseMove(e) {
    if (!this.state.moving) {
      return;
    }

    e.preventDefault();
    this._calcNewTime(e);
  }

  _handleMouseUp(e) {
    if (!isValidClick(e)) {
      return;
    }

    if (this._face && !this._face.contains(e.target)) {
      captureNextEvent('click');
    }

    window.removeEventListener('mousemove', this._handleMouseMove);
    window.removeEventListener('mouseup', this._handleMouseUp);

    this._calcNewTime(e);
    this.setState({ moving: false });
  }

  _handleTouchStart() {
    captureNextEvent('mousedown');

    window.addEventListener('touchmove', this._handleTouchMove);
    window.addEventListener('touchend', this._handleTouchEnd);
    this.setState({ moving: true });
  }

  _handleTouchMove(e) {
    if (!this.state.moving) {
      return;
    }
    e.preventDefault();

    this._calcNewTime(e);
  }

  _handleTouchEnd(e) {
    this._calcNewTime(e);
    if (this._face && !this._face.contains(e.target)) {
      captureNextEvent('click');
    }

    window.removeEventListener('touchmove', this._handleTouchMove);
    window.removeEventListener('touchend', this._handleTouchEnd);

    this.setState({ moving: false });
  }

  _calcNewTime(e) {
    const { pageX: x, pageY: y } = e.changedTouches ? e.changedTouches[0] : e;
    const innerRadius = this.state.radius - 48;
    const { onChange, minutes, timePeriod } = this.props;
    onChange(calcTimeFromPoint({ x, y }, this._center, innerRadius, minutes, timePeriod));
  }

  render() {
    const { time, minutes, timePeriod, onChange } = this.props;
    const { radius } = this.state;
    const size = !minutes && !timePeriod ? 24 : 12;
    const times = Array.apply(null, new Array(size)).map((_, i) => {
      let clockTime = i + 1;
      if (minutes) {
        clockTime = (clockTime * 5) % 60;
      } else {
        clockTime %= 24;
      }

      return (
        <ClockTime
          key={`time-${i}`}
          index={i + 1}
          time={clockTime}
          active={clockTime === time}
          radius={radius}
          onKeyboardFocus={onChange}
        />
      );
    });

    return (
      <div
        ref={this._setFace}
        className="md-clock-face md-block-centered md-pointer--hover"
        onMouseDown={this._handleMouseDown}
        onTouchStart={this._handleTouchStart}
      >
        {times}
        <ClockHand time={time} coords={radius} minutes={minutes} />
      </div>
    );
  }
}
