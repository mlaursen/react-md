import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { LEFT_MOUSE } from '../constants/keyCodes';
import { getTouchOffset } from '../utils';
import ClockTime from './ClockTime';
import ClockHand from './ClockHand';

export default class ClockFace extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { radius: 136 };
  }

  static propTypes = {
    time: PropTypes.number.isRequired,
    minutes: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.updateRadius();
  }

  updateRadius = () => {
    const { offsetWidth } = this.refs.clockFace;

    this.setState({ radius: offsetWidth / 2 });
  };

  handleMouseDown = (e) => {
    if(e.button !== LEFT_MOUSE || e.ctrlKey) { return; }
    this.refs.clockFace.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseMove = (e) => {
    e.preventDefault();
    let { offsetX, offsetY } = e;
    if(typeof offsetX === 'undefined' || typeof offsetY === 'undefined') {
      const offset = getTouchOffset(e);

      offsetX = offset.offsetX;
      offsetY = offset.offsetY;
    }

    this.calcNewTime(offsetX, offsetY);
  };

  handleMouseUp = (e) => {
    if(e.button !== LEFT_MOUSE || e.ctrlKey) { return; }
    this.refs.clockFace.removeEventListener('mousemove', this.handleMouseMove);
    let { offsetX, offsetY } = e;
    if(typeof offsetX === 'undefined' || typeof offsetY === 'undefined') {
      const offset = getTouchOffset(e);

      offsetX = offset.offsetX;
      offsetY = offset.offsetY;
    }

    this.calcNewTime(offsetX, offsetY);
  };

  calcNewTime = (x, y) => {
    const { radius } = this.state;
    const sectors = this.props.minutes ? 60 : 12;
    const sectorSize = 360 / sectors;
    const atan = Math.atan2(y - radius, x - radius);
    const degrees = atan * (180 / Math.PI);
    let time = Math.round(degrees / sectorSize);

    // time will be a negative number if it is the top half of the circle
    time += (this.props.minutes ? 15 : 3);
    if(time < 0) {
      time += sectors;
    }

    this.props.onClick(time);
  };

  render() {
    const { time, minutes } = this.props;
    const { radius } = this.state;
    const times = Array.apply(null, new Array(12)).map((_, i) => {
      let clockTime = i + 1;
      if(minutes) {
        clockTime = (clockTime * 5) % 60;
      }


      return (
        <ClockTime
          key={`time-${i}`}
          index={i + 1}
          time={clockTime}
          active={clockTime === time}
          radius={radius}
          minutes={minutes}
        />
      );
    });
    return (
      <div
        className="md-clock-face"
        ref="clockFace"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchStart}
      >
        {times}
        <ClockHand time={time} coords={radius} minutes={minutes} />
      </div>
    );
  }
}
