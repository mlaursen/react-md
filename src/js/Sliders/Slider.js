import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { LEFT_MOUSE, LEFT, RIGHT, TAB } from '../constants/keyCodes';
import SliderLabel from './SliderLabel';
import Track from './Track';
import TextField from '../TextFields';

export default class Slider extends PureComponent {
  static propTypes = {
    /**
     * An id to use for the `Slider`. This is required if the `label` prop
     * is defined.
     */
    id: (props, propName, component, ...others) => {
      if (typeof props.label === 'undefined') {
        return PropTypes.string(props, propName, component, ...others);
      }

      const err = PropTypes.string.isRequired(props, propName, component, ...others);
      if (err) {
        return new Error(
          `The 'id' prop is required for the '${component}' when the 'label' ` +
          'prop is defined. This will be used for the \'htmlFor\' prop of the label.'
        );
      }

      return err;
    },

    /**
     * An optional style to apply to the slider's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the slider's container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the slider's thumb.
     */
    thumbStyle: PropTypes.object,

    /**
     * An optionl className to apply to the slider's thumb.
     */
    thumbClassName: PropTypes.string,

    /**
     * An optional style to apply to the slider's track.
     */
    trackStyle: PropTypes.object,

    /**
     * An optional className to apply to the slider's track.
     */
    trackClassName: PropTypes.string,

    /**
     * An optional style to apply to the slider's track fill.
     */
    trackFillStyle: PropTypes.object,

    /**
     * An optional className to apply to the slider's track fill.
     */
    trackFillClassName: PropTypes.string,

    /**
     * The default value for the slider.
     */
    defaultValue: PropTypes.number.isRequired,

    /**
     * The min value for the slider.
     */
    min: PropTypes.number.isRequired,

    /**
     * The max value for the slider. The max value must be greater than
     * the min value.
     */
    max: (props, propName, component, ...others) => {
      const err = PropTypes.number.isRequired(props, propName, component, ...others);
      if (!err && props.min >= props[propName]) {
        return new Error(
          `The 'max' prop must be greater than the 'min prop for the '${component} but ` +
          `received: 'min: ${props.min}' and 'max: ${props.max}'.`
        );
      }

      return err;
    },

    /**
     * Boolean if the slider is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional value for the slider. This will make the component controlled
     * and require the `onChange` function.
     */
    value: PropTypes.number,

    /**
     * This is called when the slider's value gets updated. The value can be updated
     * by one of the following:
     *
     * - Clicking a section of the slider
     * - Dragging the slider with the mouse
     * - Touching a section of the slider.
     * - Dragging the slider with touch
     * - Using the text field to update the value either by typing or incrementing
     * - Using the left or right arrow keys to increment/decrement the value.
     *
     * The callback for this function is as follows:
     *
     * ```js
     * onChange(value, event);
     * ```
     *
     * where the event can either be:
     * - a touch start event
     * - a touch move event
     * - a touch end event
     * - a mouse down event
     * - a mouse move event
     * - a mouse up event
     * - a key up event
     * - a key down event
     */
    onChange: PropTypes.func,

    /**
     * This is only called when the user is dragging the slider with either
     * the mouse or touch.
     *
     * The callback for this function is defined as:
     *
     * ```js
     * onDragChange(dragPercentage, value, (touchMove || mouseMove) event);
     * ```
     */
    onDragChange: PropTypes.func,

    /**
     * An optional icon or letter to place to the left of the slider.
     * if you want to use a non-font icon or a letter, use the `md-slider-ind`
     * className on your element.
     */
    leftIcon: PropTypes.element,

    /**
     * An optional icon or letter to place to the right of the slider.
     * if you want to use a non-font icon or a letter, use the `md-slider-ind`
     * className on your element.
     *
     * > NOTE: This can not be used if the `editable` prop is true.
     */
    rightIcon: PropTypes.element,

    /**
     * An optional label to display above the slider. If this prop
     * is set, then an `id` must also be given.
     */
    label: PropTypes.node,

    /**
     * The incremental amount when the user hits left or right with the
     * keyboard arrows, or the user hits the up or down buttons in the
     * editable number text field.
     */
    step: PropTypes.number.isRequired,

    /**
     * Boolean if the Slider should be editable. This will place a number text field
     * to the right of the slider. If this prop is set to `true`, the `rightIcon`
     * prop can not be set.
     */
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

    /**
     * The width for the number text field when the Slider is editable.
     */
    inputWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,

    /**
     * This is a function that is called whenever the user changes the Slider's position
     * by either:
     * - dragging with the mouse
     * - dragging with touch
     * - quick jumping with mouse
     * - quick jumping with touch
     * - mouse up
     * - touch end
     *
     * By default, this will just round the next value to a whole number.
     */
    formatValue: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultValue: 0,
    min: 0,
    max: 100,
    formatValue: Math.round,
    step: 1,
    inputWidth: 40,
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

    let trackWidth;
    if (props.label && !props.editable && !props.leftIcon && !props.rightIcon) {
      trackWidth = '100%';
    }

    this.state = {
      value,
      scale,
      thumbLeft,
      trackWidth,
      trackFillWidth,
      active: false,
      dragging: false,
      maskInked: false,
    };

    this._updatePosition = this._updatePosition.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleTouchMove = this._handleTouchMove.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleIncrement = this._handleIncrement.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this._blurOnOutsideClick = this._blurOnOutsideClick.bind(this);
    this._calcTrackWidth = this._calcTrackWidth.bind(this);
  }

  componentDidMount() {
    this._node = findDOMNode(this);
    this._track = findDOMNode(this.refs.track);
    this._textField = this.props.editable && findDOMNode(this.refs.textField);
    this._calcTrackWidth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { editable, leftIcon, rightIcon, label } = this.props;
    if (editable !== nextProps.editable
      || leftIcon !== nextProps.leftIcon
      || rightIcon !== nextProps.rightIcon
      || label !== nextProps.label
    ) {
      this._calcTrackWidth(nextProps);
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
      fn('touchmove', this._handleTouchMove);
      fn('touchend', this._handleTouchEnd);
    }

    if (this.props.editable !== prevProps.editable) {
      this._textField = this.props.editable
        ? findDOMNode(this.refs.textField)
        : null;
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

  /**
   * Checks if the target is within the text field container.
   *
   * @param {Object} target - The event target.
   * @return {bool} true if the target is in the text field.
   */
  _isTextField(target) {
    return this._textField && this._textField.contains(target);
  }

  /**
   * Checks if a classList does not contain all the *bad* class names.
   *
   * @param {function} classList - The classList to check.
   * @return {bool} true if the classList does not contain any of the *bad* class names.
   */
  _isValidClassList(classList) {
    let invalid = false;
    ['md-slider-label', 'md-slider-ind', 'md-icon'].some(cl => {
      invalid = classList.contains(cl);
      return invalid;
    });

    return !invalid;
  }

  /**
   * Updates the slider's thumb position and the slider's track fill width based
   * on the thumb's current x position on the screen.
   *
   * The slider distance will be *noralized* when:
   *  - The user does a quick jump
   *  - The user stops dragging with the mouse
   *  - The user drops dragging with touch
   *
   * If the position is not *normalized*, the `onDragChange` prop will be called
   * with the new distance percentage, the value, and the move event.
   *
   * The `onChange` function will always be called.
   *
   * @param {Object} e - The current event to extract an x location from
   * @param {bool} normalize - Boolean if the distance should be normalized
   *    to the current scale of the slider.
   */
  _updatePosition(e, normalize) {
    const x = (e.changedTouches ? e.changedTouches[0] : e).clientX;
    const { scale } = this.state;
    const { onChange, onDragChange, formatValue } = this.props;
    let distance = this._calcDistanceMoved(x, this._track);
    const value = formatValue(distance / 100 * scale);

    if (onChange) {
      onChange(value, e);
    }

    if (normalize) {
      distance = (value / scale) * 100;
    } else if (onDragChange) {
      onDragChange(distance, value, e);
    }

    const state = {
      value,
      active: true,
      dragging: !normalize,
      thumbLeft: this._calcLeft(distance),
      trackFillWidth: `${distance}%`,
    };

    if (e.changedTouches) {
      state.maskInked = true;
    }

    if (typeof this.props.value !== 'undefined') {
      delete state.value;
    }

    this.setState(state);
  }

  /**
   * This will allow a user to start dragging the slider's value if it
   * is not disabled. If the user does not click the slider thumb, it
   * will quickly jump to the next value.
   *
   * @param {Object} e - The touch start event.
   */
  _handleMouseDown(e) {
    if (e.button !== LEFT_MOUSE || e.shiftKey || this.props.disabled) {
      return;
    }

    const { classList } = e.target;
    if (classList.contains('md-slider-thumb')) {
      this.setState({ dragging: true, active: true });
    } else if (!this._isTextField(e.target) && this._isValidClassList(classList)) {
      this._updatePosition(e, true);
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

    this._updatePosition(e, false);
  }

  /**
   * This will update thhe value of the slider based on the current x position
   * of the mouse and *normalize* the distance.
   *
   * @param {Object} e - The mouse up event.
   */
  _handleMouseUp(e) {
    if (e.button !== LEFT_MOUSE || e.shiftKey || !this.state.dragging || this.props.disabled) {
      return;
    }

    this._updatePosition(e, true);
  }

  /**
   * This will allow a user to start dragging the slider's value if it
   * is not disabled. If the user does not click the slider thumb, it
   * will quickly jump to the next value.
   *
   * @param {Object} e - The touch start event.
   */
  _handleTouchStart(e) {
    if (this.props.disabled) {
      return;
    }

    const { classList } = e.target;
    if (classList.contains('md-slider-thumb')) {
      this.setState({ dragging: true, active: true, maskInked: true });
    } else if (!this._isTextField(e.target) && this._isValidClassList(classList)) {
      this._updatePosition(e, true);
    }
  }

  /**
   * This will update the value for the slider based on the current x position
   *
   * @param {Object} e - The touch move event.
   */
  _handleTouchMove(e) {
    if (this.props.disabled || !this.state.dragging) {
      return;
    }

    // Stops page scrolling while dragging
    e.preventDefault();
    this._updatePosition(e, false);
  }

  /**
   * This will update thhe value of the slider based on the current x position
   * of the mouse and *normalize* the distance.
   *
   * @param {Object} e - The touch end event.
   */
  _handleTouchEnd(e) {
    if (!this.state.dragging || this.props.disabled) {
      return;
    }

    this._updatePosition(e, true);
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
      this.setState({ active: false, maskInked: false });
    }
  }

    /**
     * Updates the slider with the `step` prop and calls the `onChange`
     * function with the new value.
     *
     * @param {number} incrementedValue - The newly incremented value of the slider.
     * @param {Object} e - Either the text field's change event, mouse down event, or
     *    touch start event.
     * @param {bool} disableTransition - Boolean if the jump's transition should be disabled.
     */
  _handleIncrement(incrementedValue, e, disableTransition) {
    const { onChange, value, min, max } = this.props;
    const newValue = Math.max(min, Math.min(max, incrementedValue));
    if (onChange) {
      onChange(newValue, e);
    }

    const distance = (newValue / this.state.scale) * 100;
    const state = {
      thumbLeft: this._calcLeft(distance),
      trackFillWidth: `${distance}%`,
      dragging: disableTransition,
    };

    if (typeof value === 'undefined') {
      state.value = newValue;
    }

    this.setState(state);
  }

  _handleTextFieldChange(newValue, e) {
    this._handleIncrement(newValue, e, false);
  }

  _handleKeyDown(e) {
    const key = e.which || e.keyCode;
    const { min, max, step, disabled } = this.props;
    if (disabled) {
      return;
    }

    if (key === TAB) {
      this.setState({ active: false, maskInked: false });
      return;
    } else if ((key !== LEFT && key !== RIGHT)) {
      return;
    }

    let nextValue = this._getValue(this.props, this.state);
    nextValue = Math.max(
      min,
      Math.min((key === LEFT ? -step : step) + nextValue, max)
    );

    this._handleIncrement(nextValue, e, true);
  }

  _handleKeyUp(e) {
    const state = { dragging: false };
    if ((e.which || e.keyCode) === TAB) {
      state.maskInked = true;
    }

    this.setState(state);
  }

  _handleFocus() {
    this.setState({ active: true });
  }

  /**
   * For some reason the width of the track gets set to 0 if the `Slider` has a label and
   * does not include the `leftIcon`, `rightIcon`, and is not `editable` OR it is
   * `editable` and does not include the `leftIcon`. All other cases the width works
   * correctly.
   *
   * This function just checks these things, and sets the width accordingly.
   */
  _calcTrackWidth(props) {
    const { editable, leftIcon, rightIcon, inputWidth, label } = props;

    if (!label) {
      this.setState({ trackWidth: null });
      return;
    }

    let trackWidth = null;
    if (!leftIcon && !rightIcon && !editable) {
      trackWidth = '100%';
    } else if (editable && !leftIcon) {
      const cs = window.getComputedStyle(this._textField);
      const pl = parseInt(cs.getPropertyValue('padding-left'), 10);
      const ml = parseInt(cs.getPropertyValue('margin-left'), 10);

      trackWidth = pl + ml + inputWidth;
    }

    if (trackWidth) {
      this.setState({ trackWidth });
    }
  }

  render() {
    const { dragging, active, thumbLeft, trackFillWidth, maskInked, trackWidth } = this.state;
    const {
      id,
      min,
      max,
      disabled,
      className,
      trackStyle,
      trackClassName,
      thumbStyle,
      thumbClassName,
      label,
      editable,
      step,
      inputWidth,
      leftIcon,
      rightIcon,
      ...props,
    } = this.props;
    delete props.value;
    delete props.onChange;
    delete props.onDragChange;
    delete props.formatValue;

    const value = this._getValue(this.props, this.state);
    let rightChildren = rightIcon;
    if (editable) {
      rightChildren = (
        <TextField
          ref="textField"
          type="number"
          value={value}
          inputClassName="md-slider-editor"
          inputStyle={{ width: inputWidth }}
          floatingLabel={false}
          onChange={this._handleTextFieldChange}
          step={step}
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
        onTouchStart={this._handleTouchStart}
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
          style={Object.assign({}, trackStyle, { width: trackWidth })}
          className={cn(trackClassName, {
            'md-slider-track--ind-left': leftIcon,
            'md-slider-track--ind-right': rightIcon,
          })}
          thumbStyle={thumbStyle}
          thumbClassName={thumbClassName}
          active={active}
          dragging={dragging}
          disabled={disabled}
          thumbLeft={thumbLeft}
          trackFillWidth={trackFillWidth}
          on={!disabled && value !== min}
          off={value === min}
          maskInked={maskInked}
          onThumbKeyUp={this._handleKeyUp}
          onThumbKeyDown={this._handleKeyDown}
          onThumbFocus={this._handleFocus}
        />
        {rightChildren}
      </div>
    );
  }
}
