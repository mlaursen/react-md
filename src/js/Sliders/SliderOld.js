import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { LEFT, RIGHT } from 'teds/constants/KeyConstants';

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isActive: false,
      isDragging: false,
      isDragMoving: false,
      active: false,
      value: props.defaultValue || props.min,
    };
  }

  static propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    labelLeft: PropTypes.node,
    valueLabel: PropTypes.bool,
    step: PropTypes.number,
    onBlur: PropTypes.func,
    defaultValue: PropTypes.number,
  }

  static defaultProps = {
    min: 0,
    valueLabel: true,
  }

  getTrackWidth = () => {
    const { min, max } = this.props;
    const { value } = this.state;

    let width = value;
    if(width === min) {
      width = 0;
    } else if (width === max) {
      width = 100;
    } else {
      width = ((value - min) / (max - min)) * 100;
    }
    return width;
  }

  handleSliderMouseDown = (e) => {
    if(e.button === 2) {
      return;
    }

    document.addEventListener('mousemove', this.handleDragMove, false);
    document.addEventListener('mouseup', this.handleDragEnd, false);

    this.handleDragStart(e);
  }

  handleDragStart = (e) => {
    this.props.onDragStart && this.props.onDragStart(e);
    this.setState({ isDragging: true, active: true });
  }

  handleDragMove = (e) => {
    if(this.state.isDragMoving) { return; }

    requestAnimationFrame(() => {
      this.handleDragUpdate(e, e.clientX - this.getTrackLeft());
      this.setState({ isDragMoving: false });
    });
    this.setState({ isDragMoving: true });
  }

  handleDragUpdate = (e, distance) => {
    if(!this.state.isDragging) { return; }
    this.updateValue(e, distance);
  }

  handleDragEnd = () => {
    document.removeEventListener('mousemove', this.handleDragMove, false);
    document.removeEventListener('mouseup', this.handleDragEnd, false);

    if(this.props.onDragEnd) {
      this.props.onDragEnd(this.state.value);
    }
    this.setState({ isDragging: false, active: false });
  }

  getTrackLeft = () => {
    return this.refs.track.getBoundingClientRect().left;
  }

  updateValue = (e, distance, isClick = false) => {
    const { clientWidth } = this.refs.track;

    if(distance < 0) {
      distance = 0;
    } else if(distance > clientWidth) {
      distance = clientWidth;
    }

    const { min, max, step, onDragEnd } = this.props;
    let newValue = 0;
    if(distance !== 0 && distance !== clientWidth) {
      const calcedValue = distance / clientWidth * max;
      if(step) {
        const stepScale = 100 / (100 * step);
        newValue = (Math.round(calcedValue * stepScale) / stepScale).toFixed(2);
        if(newValue.split('\.')[1] === '00') {
          newValue = parseInt(newValue);
        } else {
          newValue = parseFloat(newValue);
        }
      } else {
        newValue = Math.round(calcedValue);
      }
    }

    if(distance === 0) {
      newValue = min;
    } else if(distance === clientWidth) {
      newValue = max;
    }

    if(isClick && onDragEnd) {
      onDragEnd(newValue);
    }
    this.setState({ isActive: false, value: newValue });
  }

  handleSliderClick = (e) => {
    this.updateValue(e, e.clientX - this.getTrackLeft(), true);
  }

  handleKeyDown = (e) => {
    const { min, max, step } = this.props;
    const stepAmt = step || (max / (max - min));
    const key = e.which || e.keyCode;

    const { value } = this.state;
    if(key !== LEFT && key !== RIGHT) {
      return;
    }

    let newValue = value;
    if(key === LEFT) {
      newValue = Math.max(value - stepAmt, min);
    } else {
      newValue = Math.min(value + stepAmt, max);
    }

    const stepScale = 100 / (100 * step);
    newValue = (Math.round(newValue * stepScale) / stepScale).toFixed(2);
    if(newValue.split('\.')[1] === '00') {
      newValue = parseInt(newValue);
    } else {
      newValue = parseFloat(newValue);
    }
    this.setState({ isActive: true, value: newValue });
  }

  render() {
    const { min, max, valueLabel, labelLeft } = this.props;
    const { isActive, value } = this.state;
    const width = `${this.getTrackWidth()}%`;
    return (
      <div className="slider-container">
        {labelLeft && <span className="label-left">{labelLeft}</span>}
        <div className={classnames('slider-track-ball-container', { 'active': isActive })}>
          <input type="range" className="slider" readOnly value={value} min={min} max={max} />
          <div ref="track" className="slider-track" onClick={this.handleSliderClick}>
            <span className="track" />
            <span className="track track-fill" style={{ width: width }} />
          </div>
          <div className="slider-thumb" style={{ left: width }} onMouseDown={this.handleSliderMouseDown} tabIndex="0" onKeyDown={this.handleKeyDown}>
            <span className="thumb" />
          </div>
        </div>
        {valueLabel && <label className="slider-label text-right">{value}</label>}
      </div>
    );
  }
}
