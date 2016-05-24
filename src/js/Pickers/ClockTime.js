import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

const CLOCK_PADDING = 4;

/**
 * The `ClockTime` component is used for positioning hours or minutes
 * in a clock. The time will be positioned based on it's given index
 * and the radius of the clock.
 */
export default class ClockTime extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      // default size in scss
      size: 18,
    };
  }

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
  };

  componentDidMount() {
    this.setPosition();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.radius !== nextProps.radius || this.props.index !== nextProps.index) {

      this.setPosition(nextProps);
    }
  }

  setPosition = ({ radius, index } = this.props) => {
    // 36 is default size for the time
    const size = (this.refs.time.offsetWidth || 36) / 2;
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
  };

  render() {
    const { time, active } = this.props;
    return (
      <div
        ref="time"
        className={classnames('md-clock-time', { active })}
        style={this.state.style}
      >
        <span className="md-clock-time-value">{time}</span>
      </div>
    );
  }
}
