import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const LEFT_MOUSE = 2;

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: typeof props.defaultValue === 'number' ? props.defaultValue : props.min,
    };
  }

  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    defaultValue: PropTypes.number,
    snap: PropTypes.bool,
    sliderLeft: PropTypes.node,
    sliderRight: PropTypes.node,
  }

  static defaultProps = {
    min: 0,
    max: 100,
  }

  handleTrackClick = (e) => {
    if(e.button === LEFT_MOUSE) { return; }

    this.setState({ value: this.calculateBallMovedDistance(e) });
  }

  render() {
    const { min, max, sliderLeft, sliderRight } = this.props;
    const { value } = this.state;
    const width = `${this.calculateTrackWidth()}%`;

    return (
      <div className="md-slider-container">
        {sliderLeft && <div className="md-slider-left">{sliderLeft}</div>}
        <div className="md-slider">
          <input type="range" className="md-hidden-slider" readOnly value={value} min={min} max={max} />
          <div className="md-slider-track" ref="track" onClick={this.handleTrackClick}>
            <div className="md-track" />
            <div className="md-track md-track-active" style={{ width: width }} />
          </div>
          <div className="md-slider-ball" style={{ left: width }}>
            <div className="md-ball" />
            <div className="md-ball-value">{value}</div>
          </div>
        </div>
        {sliderRight && <div className="md-slider-right">{sliderRight}</div>}
      </div>
    );
  }

  /**
   * Calculates the slider's track current width by comparing the value
   * to the min and max values. It's width is the current value percentage
   */
  calculateTrackWidth = () => {
    const { min, max } = this.props;
    const { value } = this.state;

    if(value === min) {
      return 0;
    } else if(value === max) {
      return 100;
    } else {
      return ((value - min) / (max - min)) * 100;
    }
  }

  /**
   * Gets the current left position of the slider's track on the entire page
   */
  getTrackLeft = () => {
    return this.refs.track.getBoundingClientRect().left;
  }

  calculateBallMovedDistance = (e) => {
    const { min, max, step } = this.props;
    const trackWidth = this.refs.track.clientWidth;
    const trackDistance = Math.min(trackWidth, Math.max(0, e.clientX - this.getTrackLeft()));
    if(trackDistance === 0) {
      return min;
    } else if(trackDistance === trackWidth) {
      return max;
    }

    const ballMovedDistance = trackDistance / trackWidth * max;
    if(step) {
      return this.calculateStepDistance(ballMovedDistance);
    } else {
      return ballMovedDistance;
    }
  }

  calculateStep = (ballMovedDistance) => {
    const { min, max, step } = this.props;
  }
}
