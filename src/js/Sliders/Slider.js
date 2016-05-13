import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { LEFT_MOUSE, LEFT, RIGHT } from '../constants/keyCodes';
import { onOutsideClick } from '../utils';
import SliderTrack from './SliderTrack';

/**
 * A `Slider` can either be continuous or discrete. A continuous slider will not have
 * a number indicating it's current value while a discrete slider will.
 */
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
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * An optional value for the slider. This will make the slider a controlled
     * component.
     */
    value: PropTypes.number,

    /**
     * An optional starting value. If omitted, it will be the min value of the
     * slider.
     */
    defaultValue: PropTypes.number,

    /**
     * The min value for the slider. It seems to only work with a value of 0 or 1 right now.
     */
    min: PropTypes.number.isRequired,

    /**
     * The max value for the slider. It really only seems to work as 10 or 100 right now.
     */
    max: PropTypes.number.isRequired,

    /**
     * Any number to use for converting the slider into a discrete slider. This will be
     * how many units the slider moves each tick. Only really tested with a value of 1.
     */
    step: PropTypes.number,

    /**
     * The number of decimal places to round to for each new step in a discrete slider.
     */
    stepPrecision: PropTypes.number.isRequired,

    /**
     * An optional function to call when the slider's value changes. It will
     * be called with the new value and the change event.
     *
     * `onChange(newValue, event)`.
     */
    onChange: PropTypes.func,

    /**
     * An optional function to call when the slider's value has changed while the
     * user is dragging the slider. It will be called with the new value and the
     * drag event.
     *
     * `onChange(newValue, event)`.
     */
    onDragChange: PropTypes.func,

    /**
     * Boolean if the slider is disabled.
     */
    disabled: PropTypes.bool,
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
      return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
    }
  };

  calcLeft = (width) => {
    return `calc(${width}% - 7px)`;
  };

  handleSliderTrackClick = (e) => {
    let { clientX, changedTouches } = e;
    const { min, max, step, onChange, onDragChange, disabled } = this.props;
    if(disabled) { return; }
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

    value = Math.min(max, Math.max(min, value));
    const { dragging } = this.state;
    if(dragging && onDragChange) {
      onDragChange(value, e);
    } else if(!dragging && onChange) {
      onChange(value, e);
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

  handleClickOutside = e => onOutsideClick(e, ReactDOM.findDOMNode(this), () => this.setState({ active: false }));

  handleThumbStart = (e) => {
    if(this.props.disabled) { return; }
    const { changedTouches, button, ctrlKey } = e;
    if(!changedTouches && (button !== LEFT_MOUSE || ctrlKey)) { return; }

    document.addEventListener('mousemove', this.handleDragMove);
    document.addEventListener('mouseup', this.handleDragEnd);
    document.addEventListener('touchmove', this.handleDragMove);
    document.addEventListener('touchend', this.handleDragEnd);

    this.setState({ dragging: true });
  };

  handleDragMove = (e) => {
    if(this.state.dragMoving || this.props.disabled) { return; }

    requestAnimationFrame(() => {
      this.handleSliderTrackClick(e);
      this.setState({ dragMoving: false });
    });
    this.setState({ dragMoving: true });
  };

  handleDragEnd = (e) => {
    document.removeEventListener('mousemove', this.handleDragMove);
    document.removeEventListener('mouseup', this.handleDragEnd);
    document.removeEventListener('touchmove', this.handleDragMove);
    document.removeEventListener('touchend', this.handleDragEnd);

    if(this.props.onChange) {
      this.props.onChange(this.state.value, e);
    }

    this.setState({ dragging: false });
  };

  handleThumbKeydown = (e) => {
    const key = e.which || e.keyCode;
    if(key !== LEFT && key !== RIGHT) { return; }

    const { min, max, step, onChange } = this.props;
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
    if(onChange) {
      onChange(value, e);
    }

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
    const { active, valued, width, left, dragging } = this.state;
    const { min, max, step, disabled, className, style } = this.props;
    const discrete = typeof step !== 'undefined';
    return (
      <div className={classnames('md-slider-container', className)} style={style}>
        <div className={classnames('md-slider-track-container', { active, disabled })}>
          <input
            type="range"
            className="md-slider"
            readOnly
            value={value}
            min={min}
            max={max}
            disabled={disabled}
          />
          <SliderTrack
            active={active}
            valued={valued}
            width={width}
            left={left}
            dragging={dragging}
            value={value}
            discrete={discrete}
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
