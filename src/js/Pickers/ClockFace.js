import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { LEFT_MOUSE } from '../constants/keyCodes';
import { getTouchOffset, isPointInCircle, isTouchDevice } from '../utils';
import ClockTime from './ClockTime';
import ClockHand from './ClockHand';

/**
 * The `ClockFace` component is used for rendering all the clock's times
 * and the clock hand.
 */
export default class ClockFace extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { radius: 136, moving: false };
  }

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
    onClick: PropTypes.func.isRequired,

    /**
     * An optional time period string. This should be either AM or PM
     * if the locale uses them.
     */
    timePeriod: PropTypes.string,
  };

  componentDidMount() {
    this.init();
  }

  init = () => {
    const radius = this.refs.clockFace.offsetWidth / 2;
    const touch = isTouchDevice();

    this.setState({ radius, touch });
  };

  handleMouseDown = (e) => {
    if(e.button !== LEFT_MOUSE || e.ctrlKey || this.state.touch) { return; }
    this.setState({ moving: true });
  };

  handleMouseMove = (e) => {
    if(!this.state.moving || this.state.touch) { return; }
    e.preventDefault();
    this.calcNewTime(e);
  };

  handleMouseUp = (e) => {
    if(e.button !== LEFT_MOUSE || e.ctrlKey || this.state.touch) { return; }
    this.calcNewTime(e);
    this.setState({ moving: false });
  };

  handleTouchStart = () => {
    this.setState({ moving: true });
  };

  handleTouchMove = (e) => {
    if(!this.state.moving) { return; }
    e.preventDefault();
    this.calcNewTime(e);
  };

  handleTouchEnd = (e) => {
    this.calcNewTime(e);
    this.setState({ moving: false });
  };

  calcNewTime = (e) => {
    const { offsetX, offsetY } = getTouchOffset(e);
    const { radius } = this.state;
    const { minutes, timePeriod, onClick } = this.props;
    const sectors = minutes ? 60 : 12;
    const sectorSize = 360 / sectors;
    const atan = Math.atan2(offsetY - radius, offsetX - radius);
    const degrees = atan * (180 / Math.PI);
    let time = Math.round(degrees / sectorSize);

    // time will be a negative number if it is the top half of the circle
    time += (minutes ? 15 : 3);
    if(time < 0) {
      time += sectors;
    }

    if(!timePeriod && !minutes) {
      const isInCircle = isPointInCircle(radius, radius, radius - 48, offsetX, offsetY);
      if((isInCircle && time !== 0) || (!isInCircle && time === 0)) {
        time += 12;
      }
    }

    onClick(time);
  };

  render() {
    const { time, minutes, timePeriod } = this.props;
    const { radius } = this.state;
    const size = !minutes && !timePeriod ? 24 : 12;
    const times = Array.apply(null, new Array(size)).map((_, i) => {
      let clockTime = i + 1;
      if(minutes) {
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
        />
      );
    });

    return (
      <div
        className="md-clock-face"
        ref="clockFace"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {times}
        <ClockHand time={time} coords={radius} minutes={minutes} />
      </div>
    );
  }
}
