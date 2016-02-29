import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

const CLOCK_PADDING = 4;

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
    index: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    radius: PropTypes.number.isRequired,
    minutes: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { offsetWidth } = this.refs.time;
    this.setState({ size: offsetWidth / 2 }); // eslint-disable-line react/no-did-mount-set-state
  }

  calcPos = (r, isTop) => {
    const { radius } = this.props;
    const { size } = this.state;

    const outerR = radius - size;
    const innerR = outerR - CLOCK_PADDING;

    if(isTop) {
      return outerR - innerR * Math.sin(r);
    } else {
      return outerR + innerR * Math.cos(r);
    }
  };

  handleClick = (e) => {
    this.props.onClick(this.props.time, e);
  };

  render() {
    const { time, active, index } = this.props;

    const r = (Math.PI / 2) - index * (Math.PI / 6);
    return (
      <div
        ref="time"
        className={classnames('md-clock-time', { active })}
        onClick={this.handleClick}
        style={{
          top: this.calcPos(r, true),
          left: this.calcPos(r, false),
        }}
      >
        <span className="md-clock-time-value">{time}</span>
      </div>
    );
  }
}
