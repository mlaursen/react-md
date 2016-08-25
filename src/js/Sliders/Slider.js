import React, { PureComponent, PropTypes, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { LEFT_MOUSE } from '../constants/keyCodes';
import SliderLabel from './SliderLabel';
import Track from './Track';
import TextField from '../TextFields';

export default class Slider extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    defaultValue: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,

    disabled: PropTypes.bool,
    value: PropTypes.number,
    onChange: PropTypes.func,
    onDragChange: PropTypes.func,
    leftIcon: PropTypes.element,
    rightIcon: PropTypes.element,
    onMouseOver: PropTypes.func,
    label: PropTypes.node,
    formatValue: PropTypes.func.isRequired,
    editable: (props, propName, component, ...others) => {
      if (typeof props[propName] === 'undefined') {
        return null;
      }

      const err = PropTypes.bool.isRequired(props, propName, component, ...others);
      if (!err && typeof props.rightIcon !== 'undefined') {
        return new Error(
          `The '${component}' is unable to be editable and include a 'rightIcon'.`
        );
      }

      return err;
    },
  };

  static defaultProps = {
    defaultValue: 0,
    min: 0,
    max: 100,
    formatValue: Math.round,
  };

  constructor(props) {
    super(props);

    const scale = Math.abs(props.min) + Math.abs(props.max);

    let value = typeof props.value !== 'undefined'
      ? props.value
      : props.defaultValue;

    const thumbLeft = this._calcLeft((value / scale) * 100);
    const trackFillWidth = `${(value / scale) * 100}%`;

    if (typeof props.value !== 'undefined') {
      value = undefined;
    }

    this.state = {
      value,
      scale,
      thumbLeft,
      trackFillWidth,
      active: false,
      dragging: false,
    };

    this._updatePosition = this._updatePosition.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._blurOnOutsideClick = this._blurOnOutsideClick.bind(this);
  }

  componentDidMount() {
    this._node = findDOMNode(this);
    this._track = findDOMNode(this.refs.track);
    this._textField = this.props.editable && findDOMNode(this.refs.textField);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editable !== nextProps.editable) {
      this._textField = nextProps.editable
        ? findDOMNode(this.refs.textField)
        : null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { active, dragging } = this.state;
    if (active !== prevState.active) {
      window[`${active ? 'add' : 'remove'}EventListener`]('click', this._blurOnOutsideClick);
    }

    if (dragging !== prevState.dragging) {
      const fn = window[`${active ? 'add' : 'remove'}EventListener`];
      fn('mousemove', this._handleMouseMove);
      fn('mouseup', this._handleMouseUp);
    }
  }

  /**
   * This is a simple getter method for determining the value from either
   * a controlled or stateless perspective of this component.
   *
   * @param {Object} props - The props to extract a value from.
   * @param {Object} state - The state to extract a value from.
   * @return {number} the current value of the slider.
   */
  _getValue(props, state) {
    return typeof props.value !== 'undefined' ? props.value : state.value;
  }

  /**
   * Gets the `left` position for the thumb based on the value given.
   *
   * @param {number} value - The current value.
   * @return {string} the `calc` string.
   */
  _calcLeft(value) {
    return `calc(${value}% - 6px)`;
  }

  /**
   * Calculates the distance the thumb has moved based on the new X position
   * and the position of the track.
   *
   * @param {number} x - The current x position of the thumb.
   * @param {Object} track - The slider's track node.
   * @return {number} the current distance moved as a percentage.
   */
  _calcDistanceMoved(x, track) {
    const { offsetWidth } = track;
    const distance = Math.min(
      offsetWidth,
      Math.max(0, x - track.getBoundingClientRect().left)
    );

    return distance / offsetWidth * 100;
  }

  _isTextField(target) {
    return this._textField && this._textField.contains(target);
  }

  /**
   * Updates the slider's thumb position and the slider's track fill width based
   * on the thumb's current x position on the screen.
   *
   * This will also call the `onDragChange` prop if it exists.
   *
   * @param {number} x - The screen x position of the thumb.
   */
  _updatePosition(x, normalize) {
    const { scale } = this.state;
    const { onChange, onDragChange, formatValue } = this.props;
    let distance = this._calcDistanceMoved(x, this._track);
    const value = formatValue(distance / 100 * scale);

    if (normalize) {
      if (onChange) {
        onChange(value);
      }

      distance = (value / scale) * 100;
    } else if (onDragChange) {
      onDragChange(value);
    }

    const state = {
      value,
      active: true,
      dragging: !normalize,
      thumbLeft: this._calcLeft(distance),
      trackFillWidth: `${distance}%`,
    };

    if (typeof this.props.value !== 'undefined') {
      delete state.value;
    }

    this.setState(state);
  }

  /**
   * If the click target is the thumb, it will start listening to mouse move and
   * mouse up events to allow continuous changes of the slider's value. Otherwise
   * it will quickly set the new value to the click position in the slider.
   *
   * @param {Object} e - The mousedown event.
   */
  _handleMouseDown(e) {
    if (e.button !== LEFT_MOUSE || e.shiftKey || this.props.disabled) {
      return;
    }

    if (e.target.classList.contains('md-slider-thumb')) {
      this.setState({ dragging: true, active: true });
    } else if (!this._isTextField(e.target)) {
      this._updatePosition(e.clientX, true);
    }
  }

  /**
   * This will update the value of the slider based on the current x position
   * of the mouse if the slider is currently not disabled and in a dragging state.
   */
  _handleMouseMove(e) {
    if (this.props.disabled || !this.state.dragging) {
      return;
    }

    // Stops the text highlighting while dragging
    e.preventDefault();

    this._updatePosition(e.clientX);
  }

  _handleMouseUp(e) {
    if (e.button !== LEFT_MOUSE || e.shiftKey || !this.state.dragging || this.props.disabled) {
      return;
    }

    this._updatePosition(e.clientX, true);
  }

  /**
   * This will set the active state of the slider to false if the user
   * clicks outside of the slider's container.
   *
   * @param {Object} e - The window's click event.
   */
  _blurOnOutsideClick(e) {
    if (this.state.dragging || this.props.disabled) {
      return;
    }

    if (!this._node.contains(e.target)) {
      this.setState({ active: false });
    }
  }

  _updateIcon(icon, direction) {
    if (!icon) {
      return null;
    }

    const iconEl = React.Children.only(icon);

    return cloneElement(iconEl, {
      className: cn(iconEl.props.className, `md-slider-ind--slider-${direction}`),
    });
  }

  render() {
    const { dragging, active, thumbLeft, trackFillWidth } = this.state;
    const {
      id,
      min,
      max,
      disabled,
      className,
      label,
      editable,
      ...props,
    } = this.props;
    delete props.value;
    delete props.onChange;
    delete props.onDragChange;
    delete props.leftIcon;
    delete props.rightIcon;
    delete props.formatValue;

    const value = this._getValue(this.props, this.state);
    let { leftIcon, rightIcon } = this.props;
    leftIcon = this._updateIcon(leftIcon, 'left');
    rightIcon = this._updateIcon(rightIcon, 'right');
    let rightChildren = rightIcon;
    if (editable) {
      rightChildren = (
        <TextField
          ref="textField"
          value={value}
          inputClassName="md-slider-editor"
          size={max.toString().length}
          floatingLabel={false}
          onChange={this._handleTextFieldChange}
        />
      );
    }

    return (
      <div
        {...props}
        className={cn('md-slider-container', className, {
          'md-slider-container--disabled': disabled,
        })}
        onMouseDown={this._handleMouseDown}
      >
        <SliderLabel htmlFor={id} children={label} />
        <input
          id={id}
          type="range"
          className="md-slider-input"
          readOnly
          min={min}
          max={max}
          value={value}
          disabled={disabled}
        />
        {leftIcon}
        <Track
          ref="track"
          active={active}
          dragging={dragging}
          disabled={disabled}
          thumbLeft={thumbLeft}
          trackFillWidth={trackFillWidth}
          on={!disabled && value !== min}
          off={value === min}
        />
        {rightChildren}
      </div>
    );
  }
}
