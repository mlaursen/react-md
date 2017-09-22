import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import isValidClick from '../utils/EventUtils/isValidClick';
import captureNextEvent from '../utils/EventUtils/captureNextEvent';
import { addTouchEvent, removeTouchEvent } from '../utils/EventUtils/touches';
import calcTimeFromPoint from '../utils/NumberUtils/calcTimeFromPoint';
import calcPageOffset from '../utils/Positioning/calcPageOffset';
import ResizeObserver from '../Helpers/ResizeObserver';

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

    /**
     * If true the hover mode of the Time Picker is activated.
     * In hover mode no clicks are required to start selecting an hour
     * and the timemode switches automatically when a time was chosen.
     * When a minute is selected the chosen time is applied automatically.
     */
    hoverMode: PropTypes.bool,

    onTimeChosen: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { radius: 136, moving: false };
    this._center = {};
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this._handleMouseMove);
    window.removeEventListener('mouseup', this._handleMouseMove);

    removeTouchEvent(window, 'move', this._handleTouchMove);
    removeTouchEvent(window, 'end', this._handleTouchEnd);
    clearInterval(this.interval);
  }

  _setFace = (face) => {
    this._face = face;
    this._setPositioning();
  }

  _setPositioning = () => {
    if (!this._face) {
      return;
    }

    const radius = this._face.offsetWidth / 2;
    const offset = calcPageOffset(this._face);
    this._center = { x: offset.left + radius, y: offset.top + radius };
    this._left = offset.left;
    this._top = offset.top;

    if (this.state.radius !== radius) {
      this.setState({ radius });
    }
  };

  _handleMouseEnter = () => {
    const { hoverMode } = this.props;

    if (hoverMode) {
      this._enableMouseMoving();
    }
  };

  _handleMouseLeave = () => {
    const { hoverMode } = this.props;

    if (hoverMode) {
      this._disableMouseMoving();
    }
  };

  _handleMouseDown = (e) => {
    if (!isValidClick(e)) {
      return;
    }

    const { hoverMode } = this.props;

    if (!hoverMode) {
      this._enableMouseMoving();
    }
  };

  _handleMouseMove = (e) => {
    if (!this.state.moving) {
      return;
    }

    e.preventDefault();
    this._calcNewTime(e);
  };

  _handleMouseUp = (e) => {
    if (!isValidClick(e)) {
      return;
    }

    const { onTimeChosen, hoverMode } = this.props;

    if (this._face) {
      if (this._face.contains(e.target)) {
        onTimeChosen();
        this._calcNewTime(e);
      } else {
        captureNextEvent('click');
      }
    }

    if (!hoverMode) {
      this._disableMouseMoving();
    }
  };

  _handleTouchStart = () => {
    captureNextEvent('mousedown');

    addTouchEvent(window, 'move', this._handleTouchMove);
    addTouchEvent(window, 'end', this._handleTouchEnd);
    this.setState({ moving: true });
  };

  _handleTouchMove = (e) => {
    if (!this.state.moving) {
      return;
    }

    this._calcNewTime(e);
  };

  _handleTouchEnd = (e) => {
    this._calcNewTime(e);
    if (this._face && !this._face.contains(e.target)) {
      captureNextEvent('click');
    }

    removeTouchEvent(window, 'move', this._handleTouchMove);
    removeTouchEvent(window, 'end', this._handleTouchEnd);

    this.setState({ moving: false });
  };

  _calcNewTime = (e) => {
    const { pageX: x, pageY: y } = e.changedTouches ? e.changedTouches[0] : e;
    const innerRadius = this.state.radius - 48;
    const { onChange, minutes, timePeriod } = this.props;
    onChange(calcTimeFromPoint({ x, y }, this._center, innerRadius, minutes, timePeriod));
  };

  _enableMouseMoving = () => {
    window.addEventListener('mousemove', this._handleMouseMove);
    window.addEventListener('mouseup', this._handleMouseUp);

    this.setState({ moving: true });
  };

  _disableMouseMoving = () => {
    window.removeEventListener('mousemove', this._handleMouseMove);
    window.removeEventListener('mouseup', this._handleMouseUp);

    this.setState({ moving: false });
  };

  render() {
    const { time, minutes, timePeriod, onChange, hoverMode } = this.props;
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
        onMouseEnter={hoverMode ? this._handleMouseEnter : undefined}
        onMouseLeave={hoverMode ? this._handleMouseLeave : undefined}
        onTouchStart={this._handleTouchStart}
      >
        <ResizeObserver watchHeight onResize={this._setPositioning} />
        {times}
        <ClockHand time={time} coords={radius} minutes={minutes} />
      </div>
    );
  }
}
