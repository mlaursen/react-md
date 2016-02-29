import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

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

  render() {
    const { time, minutes, onClick } = this.props;
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
          onClick={onClick}
          radius={radius}
          minutes={minutes}
        />
      );
    });
    return (
      <div className="md-clock-face" ref="clockFace">
        {times}
        <ClockHand time={time} coords={radius} minutes={minutes} />
      </div>
    );
  }
}
