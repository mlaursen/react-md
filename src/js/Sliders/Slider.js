import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { LEFT_MOUSE, LEFT, RIGHT } from '../constants/keyCodes';
import SliderTrack from './SliderTrack';

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    const value = typeof props.defaultValue === 'number' ? props.defaultValue : props.min;
    const width = this.calcValuePercent(value, props.min, props.max);
    this.state = {
      value,
      width,
      active: false,
      dragging: false,
      moving: false,
      valued: width > 0,
      left: this.calcLeft(width),
    };
  }

  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    stepPrecision: PropTypes.number.isRequired,
  };

  static defaultProps = {
    min: 0,
    max: 100,
    stepPrecision: 2,
  };

  componentDidUpdate(prevProps, prevState) {
    if(this.state.active && !prevState.active) {
      window.addEventListener('click', this.handleClickOutside);
    } else if(!this.state.active && prevState.active) {
      window.removeEventListener('click', this.handleClickOutside);
    }
  }

  calcValuePercent = (value, min, max) => {
    if(value === min) {
      return 0;
    } else if(value === max) {
      return 100;
    } else {
      return ((value - min) / (max - min)) * 100;
    }
  };

  calcLeft = (width) => {
    return `calc(${width}% - 24px)`;
  };

  handleSliderTrackClick = ({ clientX, changedTouches }) => {
    const { min, max, step } = this.props;
    if(changedTouches) {
      clientX = changedTouches[0].clientX;
    }

    const track = ReactDOM.findDOMNode(this).querySelector('.md-slider-track');
    let distance = clientX - track.getBoundingClientRect().left;
    const clientWidth = track.clientWidth;

    if(distance < 0) {
      distance = 0;
    } else if(distance > clientWidth) {
      distance = clientWidth;
    }

    let value = 0;
    if(distance !== 0 && distance !== clientWidth) {
      const calcedValue = distance / clientWidth * max;
      if(step) {
        value = this.updateValueWithStep(calcedValue);
      } else {
        value = Math.round(calcedValue);
      }
    } else if(distance === 0) {
      value = min;
    } else if(distance === clientWidth) {
      value = max;
    }

    const width = this.calcValuePercent(value, min, max);
    this.setState({
      valued: value > min,
      left: this.calcLeft(width),
      width,
      value,
      active: true,
    });
  };

  handleClickOutside = (e) => {
    const node = ReactDOM.findDOMNode(this);
    let target = e.target;

    while(target.parentNode) {
      if(node === target) { return; }

      target = target.parentNode;
    }

    this.setState({ active: false });
  };

  handleThumbStart = (e) => {
    const { changedTouches, button, ctrlKey } = e;
    if(!changedTouches && (button !== LEFT_MOUSE || ctrlKey)) { return; }

    document.addEventListener('mousemove', this.handleDragMove);
    document.addEventListener('mouseup', this.handleDragEnd);

    this.setState({ dragging: true });
  };

  handleDragMove = (e) => {
    if(this.state.dragMoving) { return; }

    requestAnimationFrame(() => {
      this.handleSliderTrackClick(e);
      this.setState({ dragMoving: false });
    });
    this.setState({ dragMoving: true });
  };

  handleDragEnd = () => {
    document.removeEventListener('mousemove', this.handleDragMove);
    document.removeEventListener('mouseup', this.handleDragEnd);

    this.setState({ dragging: false });
  };

  handleThumbKeydown = (e) => {
    const key = e.which || e.keyCode;
    if(key !== LEFT && key !== RIGHT) { return; }

    const { min, max, step } = this.props;
    const stepAmt = step || (max / (max - min));
    let value = this.getValue();
    if(key === LEFT) {
      value = Math.max(value - stepAmt, min);
    } else {
      value = Math.min(value + stepAmt, max);
    }

    if(step) {
      value = this.updateValueWithStep(value);
    }

    const width = this.calcValuePercent(value, min, max);

    this.setState({
      value,
      width,
      valued: value > min,
      left: this.calcLeft(width),
      active: true,
    });
  };

  getValue = () => {
    return typeof this.props.value === 'undefined' ? this.state.value : this.props.value;
  };

  updateValueWithStep = (value) => {
    const { step, stepPrecision } = this.props;
    const stepScale = 100 / (100 * step);
    let updatedValue = (Math.round(value * stepScale) / stepScale).toFixed(stepPrecision);
    if(updatedValue.split('\.')[1] === '00') {
      return parseInt(updatedValue);
    } else {
      return parseFloat(updatedValue);
    }
  };

  render() {
    const value = this.getValue();
    const { active, valued, width, left } = this.state;
    const { min, max } = this.props;
    return (
      <div className="md-slider-container">
        <div className={classnames('md-slider-track-container', { 'active': active })}>
          <input type="range" className="md-slider" readOnly value={value} min={min} max={max} />
          <SliderTrack
            active={active}
            valued={valued}
            width={width}
            left={left}
            onClick={this.handleSliderTrackClick}
            onTouchStart={this.handleThumbStart}
            onMouseDown={this.handleThumbStart}
            onKeyDown={this.handleThumbKeydown}
          />
        </div>
      </div>
    );
  }
}
