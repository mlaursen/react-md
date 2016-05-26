import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

/**
 * The `ClockHand` component is just used to display the hand of the clock
 * and a ball to surround the selected time.
 */
export default class ClockHand extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { active: false };
  }

  static propTypes = {
    /**
     * This is the x and y coordinate to use for the center of the `ClockFace`.
     * This should really be whatever the radius of the `ClockFace` is.
     */
    coords: PropTypes.number,

    /**
     * The current time of the clock.
     */
    time: PropTypes.number.isRequired,

    /**
     * Boolean if the clock is displaying minutes instead of hours.
     */
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
          WebkitTransform: rotateTransform,
          MozTransform: rotateTransform,
          msTransform: rotateTransform,
          transform: rotateTransform,
        }}
      />
    );
  }
}
