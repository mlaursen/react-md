import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class ClockHand extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { active: false };
  }

  static propTypes = {
    coords: PropTypes.number,
    time: PropTypes.number.isRequired,
    minutes: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.minutes !== nextProps.minutes) {
      if(this.state.timeout) { clearTimeout(this.state.timeout); }

      this.setState({
        active: true,
        timeout: setTimeout(() => this.setState({ active: false, timeout: null }), 150),
      });
    }
  }

  componentWillUnmount() {
    if(this.state.timeout) { clearTimeout(this.state.timeout); }
  }

  calcCurrentDegrees = () => {
    const { time, minutes } = this.props;
    const timeAt0Deg = minutes ? 15 : 3;
    const sectors = minutes ? 60 : 12;
    return (time % sectors - timeAt0Deg) * (360 / sectors);
  };

  render() {
    const { coords, time, minutes } = this.props;

    const degrees = this.calcCurrentDegrees();
    let invisibleMinute = false;
    if(minutes) {
      invisibleMinute = degrees % (360 / 12) !== 0;
    }

    const rotateTransform = `rotate3d(0, 0, 1, ${degrees}deg)`;
    return (
      <div
        className={classnames('md-clock-hand', {
          'active': this.state.active,
          'invisible-minute': invisibleMinute,
          'inner-hour': !minutes && (time > 12 || time === 0),
        })}
        style={{
          left: coords,
          top: coords,
          transform: rotateTransform,
          msTransform: rotateTransform,
          WebkitTransform: rotateTransform,
          MozTransform: rotateTransform,
        }}
      />
    );
  }
}
