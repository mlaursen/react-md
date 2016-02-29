import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class ClockHand extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    coords: PropTypes.number,
    time: PropTypes.number.isRequired,
    minutes: PropTypes.bool.isRequired,
  };

  render() {
    const { coords, time, minutes } = this.props;
    const pos0 = minutes ? 15 : 3;
    const sectors = 360 / (minutes ? 60 : 12);
    let rotate = (time - pos0) * sectors;
    if(time < pos0) {
      rotate += 360;
    }

    let invisibleMinute = false;
    if(minutes) {
      invisibleMinute = rotate % (360 / 12) !== 0;
    }

    rotate = `rotateZ(${rotate}deg)`;
    return (
      <div
        className={classnames('md-clock-hand', {
          'invisible-minute': invisibleMinute,
          'inner-hour': !minutes && (time > 12 || time === 0),
        })}
        style={{
          left: coords,
          top: coords,
          transform: rotate,
          msTransform: rotate,
          WebkitTransform: rotate,
          MozTransform: rotate,
        }}
      />
    );
  }
}
