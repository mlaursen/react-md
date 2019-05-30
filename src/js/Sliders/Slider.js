import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { LEFT, RIGHT, TAB } from '../constants/keyCodes';
import getField from '../utils/getField';
import isValidClick from '../utils/EventUtils/isValidClick';
import { setTouchEvent, removeTouchEvent } from '../utils/EventUtils/touches';
import calculateValueDistance from '../utils/NumberUtils/calculateValueDistance';
import isWithinStep from '../utils/NumberUtils/isWithinStep';
import controlled from '../utils/PropTypes/controlled';
import SliderLabel from './SliderLabel';
import Track from './Track';
import TextField from '../TextFields/TextField';

/**
 * The `Slider` component is used to let users select a value from a continuous
 * or discrete range of values by moving the slider thumb.
 *
 * When the user has finished dragging the Slider or increments the value by using
 * the edit field/keyboard arrows, the value will be rounded to the nearest `step`.
 */
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

      return isRequiredForA11y(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]))(props, propName, component, ...others);
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
     * An optional className to apply to the slider's thumb.
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
     * An optional style to apply to a discrete slider's value.
     */
    discreteValueStyle: PropTypes.object,

    /**
     * An optional className to apply to a discrete slider's value.
     */
    discreteValueClassName: PropTypes.string,

    /**
     * The default value for the slider. This number must be between the min and max values if
     * defined. If this is undefined, it's value will be set to the min value.
     */
    defaultValue: PropTypes.number,

    /**
     * The min value for the slider. This value **must** be less than the `max` value.
     */
    min: (props, propName, component, ...others) => {
      let err = PropTypes.number.isRequired(props, propName, component, ...others);
      if (!err) {
        const min = props[propName];
        let name;
        if (min > props.value) {
          name = 'value';
        } else if (typeof props.defaultValue !== 'undefined' && min > props.defaultValue) {
          name = 'defaultValue';
        }

        if (name) {
          err = new Error(
            `The '${propName}' prop must be less than or equal to the '${name}' prop for the '${component}' but ` +
            `received: 'min: ${min}' and '${name}: ${props[name]}'`
          );
        }
      }

      return err;
    },

    /**
     * The max value for the slider. This value **must** be greater than the `min` value.
     */
    max: (props, propName, component, ...others) => {
      let err = PropTypes.number.isRequired(props, propName, component, ...others);
      if (!err) {
        const max = props[propName];
        let name;
        if (max < props.value) {
          name = 'value';
        } else if (max < props.defaultValue) {
          name = 'defaultValue';
        }

        if (name) {
          err = new Error(
            `The '${propName}' prop must be greater than or equal to the '${name}' prop for the '${component}' but ` +
            `received: '${propName}: ${max}' and '${name}: ${props[name]}'`
          );
        }
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
    value: controlled(PropTypes.number, 'onChange'),

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
     * the mouse or touch. Probably not really useful. It just includes the
     * new drag percentage while the `onChange` does not.
     *
     * The callback for this function is defined as:
     *
     * ```js
     * onDragChange(dragPercentage, value, (touchMove || mouseMove) event);
     * ```
     */
    onDragChange: PropTypes.func,

    /**
     * An optional function to call when the slider's container has
     * the mousedown event.
     */
    onMouseDown: PropTypes.func,

    /**
     * An optional function to call when the slider's container has
     * the touchstart event.
     */
    onTouchStart: PropTypes.func,

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
     * editable number text field. This number must be a number between
     * 0 and 1 or a whole number above 1.
     */
    step: (props, propName, component, ...others) => {
      let err = PropTypes.number.isRequired(props, propName, component, ...others);
      if (!err) {
        const step = props[propName];
        if (step <= 0) {
          err = new Error(
            `The '${propName}' for the '${component}' must be a number greater than 0. The ` +
            `current value is '${step}'.`
          );
        } else {
          const valueDefined = typeof props.value !== 'undefined';
          const defaultDefined = typeof props.defaultValue !== 'undefined';
          let value = props.value;
          if (!valueDefined) {
            value = defaultDefined ? props.defaultValue : props.min;
          }

          let name;
          if (!isWithinStep(value, step)) {
            if (valueDefined) {
              name = 'value';
            } else if (defaultDefined) {
              name = 'defaultValue';
            } else {
              name = 'min';
            }
          }

          if (name) {
            err = new Error(
              `The '${name}' prop on '${component}' should be a number divisible by the ` +
              `'${propName}' prop. The current value is '${props[name]}' and the '${propName}' ` +
              `is '${step}'.`
            );
          }
        }
      }

      return err;
    },

    /**
     * Boolean if the Slider should be editable. This will place a number text field
     * to the right of the slider. If this prop is set to `true`, the `rightIcon`
     * prop can not be set.
     */
    editable: (props, propName, component, ...others) => {
      if (typeof props[propName] === 'undefined') {
        return null;
      }

      let err = PropTypes.bool.isRequired(props, propName, component, ...others);
      if (!err && typeof props.rightIcon !== 'undefined') {
        err = new Error(
          `The '${component}' is unable to be 'editable' and include a 'rightIcon'.`
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
     * Boolean if the slider should be discrete. This will update the slider to include a
     * _balloon_ with the current value inside. It will also not allow the `Slider` to be
     * editable.
     */
    discrete: (props, propName, component, ...others) => {
      if (typeof props[propName] === 'undefined') {
        return null;
      }

      let err = PropTypes.bool(props, propName, component, ...others);
      if (!err && typeof props.editable !== 'undefined') {
        err = new Error(
          `The '${component}' cannot be 'discrete' and 'editable'. Please choose one.`
        );
      }

      return err;
    },

    /**
     * The width of each tick for a discrete slider with ticks. This can either be a number
     * which gets converted to `px`, or a valid CSS unit.
     */
    tickWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,

    /**
     * This is number divisible by the total number of values included in the Slider. Every
     * value that is divisible by this number will include a tick mark. It is common recommended
     * to have this equal to the `step` prop.
     *
     * This prop is completely optional.
     */
    discreteTicks: (props, propName, component, ...others) => {
      if (typeof props[propName] === 'undefined') {
        return null;
      }

      let err = PropTypes.number(props, propName, component, ...others);
      if (!err) {
        const { min, max, step } = props;
        const range = Math.abs(max - min);

        if ((range / props[propName]) % 1 !== 0) {
          err = new Error(
            `The '${propName}' must be a number divisible by the range set by the 'min' and ` +
            `'max' props. The current range is '${range}' by including the min: '${min}' and ` +
            `max: '${max}' values. The current value of '${propName}' is '${props[propName]}'.`
          );
        } else if (props[propName] % step !== 0) {
          err = new Error(
            `The 'step' prop must be a number divisible by the '${propName}'. It is common to have ` +
            `them as the same value. The current 'step' is '${step}' and the '${propName}' is '${props[propName]}'.`
          );
        }
      }

      return err;
    },

    /**
     * The transition time for a discrete Slider's keyboard focus ink. This should match the
     * `md-slider-discrete-ink-transition-time` value in your SCSS. This is used because
     * the ink is only visible temporarily for a discrete slider when keyboard focusing.
     */
    discreteInkTransitionTime: PropTypes.number.isRequired,

    /**
     * The precision that the value should be rounded to when the Slider is updated. This
     * needs to be a whole number greater than or equal to 0.
     */
    valuePrecision: (props, propName, component, ...others) => {
      let err = PropTypes.number.isRequired(props, propName, component, ...others);
      if (!err) {
        const precision = props[propName];

        if (precision % 1 !== 0 || precision < 0) {
          err = new Error(
            `The '${propName}' must be a positive whole number or 0 on the '${component}'. ` +
            `The current '${propName}' is '${precision}'`
          );
        }
      }

      return err;
    },

    stepPrecision: deprecated(PropTypes.number, 'Use `step` and `valuePrecision` instead'),
  };

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    inputWidth: 40,
    tickWidth: 6,
    discreteInkTransitionTime: 300,
    valuePrecision: 0,
  };

  constructor(props) {
    super(props);

    const { min, max, step } = props;
    const scale = Math.abs(max - min) / step;

    let value = typeof props.value !== 'undefined'
      ? props.value
      : props.defaultValue;

    if (typeof value === 'undefined') {
      value = min;
    }

    const distance = this._calcDistance(value, min, max);
    const thumbLeft = this._calcLeft(distance);
    const trackFillWidth = `${distance}%`;

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
      distance,
      thumbLeft,
      trackWidth,
      trackFillWidth,
      active: false,
      dragging: false,
      maskInked: false,
    };
    this._dragAdded = false;
  }

  componentWillReceiveProps(nextProps) {
    const { leftIcon, rightIcon, label, min, max, step, value } = this.props;
    if (value !== nextProps.value) {
      const distance = this._calcDistance(nextProps.value, nextProps.min, nextProps.max);
      this.setState({ distance, trackFillWidth: `${distance}%`, thumbLeft: this._calcLeft(distance) });
    }

    if (leftIcon !== nextProps.leftIcon
      || rightIcon !== nextProps.rightIcon
      || label !== nextProps.label
    ) {
      this._calcTrackWidth(nextProps);
    }

    if (min !== nextProps.min || max !== nextProps.max || step !== nextProps.step) {
      this.setState({ scale: Math.abs(nextProps.max - nextProps.min) / nextProps.step });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { active, manualIncrement } = this.state;
    if (active !== prevState.active) {
      if (active) {
        window.addEventListener('click', this._blurOnOutsideClick);
        this._focusThumb();
      } else {
        window.removeEventListener('click', this._blurOnOutsideClick);
      }
    }

    const addDrag = active && !manualIncrement;
   
    if (this._dragAdded !== addDrag) {
      if (addDrag) {
        window.addEventListener('mousemove', this._handleDragMove);
        window.addEventListener('mouseup', this._handleDragEnd);
      } else {
        window.removeEventListener('mousemove', this._handleDragMove);
        window.removeEventListener('mouseup', this._handleDragEnd);
      }
      setTouchEvent(addDrag, window, 'move', this._handleDragMove);
      setTouchEvent(addDrag, window, 'end', this._handleDragEnd);

      this._dragAdded = addDrag;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._blurOnOutsideClick);
    window.removeEventListener('mousemove', this._handleMouseMove);
    window.removeEventListener('mouseup', this._handleMouseUp);
    removeTouchEvent(window, 'move', this._handleDragMove);
    removeTouchEvent(window, 'end', this._handleDragEnd);

    if (this._inkTimeout) {
      clearTimeout(this._inkTimeout);
    }

    if (this._focusTimeout) {
      clearTimeout(this._focusTimeout);
    }
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

  _calcDistance(value, min, max) {
    return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  }

  /**
   * Checks if a classList does not contain all the *bad* class names.
   *
   * @param {function} classList - The classList to check.
   * @return {Boolean} true if the classList does not contain any of the *bad* class names.
   */
  _isValidClassList(classList) {
    let invalid = false;
    ['md-slider-label', 'md-slider-ind', 'md-icon'].some(cl => {
      invalid = classList.contains(cl);
      return invalid;
    });

    return !invalid;
  }

  _isInTextField(e) {
    const { className } = e.target;

    // SVG's className is an object instead of a string
    return typeof className.match === 'function' && className.match(/text-field/);
  }

  /**
   * Checks if the target is within the text field container.
   *
   * @param {Object} target - The event target.
   * @return {Boolean} true if the target is in the text field.
   */
  _isTextField = (target) => this._field && this._field.contains(target);

  /**
   * Updates the slider's thumb position and the slider's track fill width based
   * on the thumb's current x position on the screen.
   *
   * The slider distance will be *normalized* when:
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
  _updatePosition = (e, normalize) => {
    const x = (e.changedTouches ? e.changedTouches[0] : e).clientX;
    const { scale } = this.state;
    const { onChange, onDragChange, min, max, step } = this.props;

    const { value, distance } = calculateValueDistance(
      x,
      this._track.offsetWidth,
      this._track.getBoundingClientRect().left,
      scale,
      step,
      min,
      max,
      normalize
    );

    const isNewValue = getField(this.props, this.state, 'value') !== value;
    if (onChange && isNewValue) {
      onChange(value, e);
    }

    if (!normalize && onDragChange && (isNewValue || this.state.distance !== distance)) {
      onDragChange(distance, value, e);
    }

    const state = {
      active: true,
      distance,
      manualIncrement: false,
      dragging: !normalize,
      thumbLeft: this._calcLeft(distance),
      trackFillWidth: `${distance}%`,
    };

    if (e.type === 'touchend' || e.type === 'mousedown') {
      state.maskInked = false;
    }

    if (typeof this.props.value === 'undefined') {
      state.value = value;
    }

    this.setState(state);
  };

  /**
   * This will either allow a user to start dragging the slider or quickly
   * jump to a new value on the slider if the slider is not disabled.
   *
   * This will handle the `touchstart` and `mousedown` events.
   *
   * @param {Object} e - The touchstart or mousedown event.
   */
  _handleDragStart = (e) => {
    if (e.type === 'mousedown' && this.props.onMouseDown) {
      this.props.onMouseDown(e);
    } else if (e.type === 'touchstart' && this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    if (this.props.disabled || (e.type === 'mousedown' && !isValidClick(e, 'mousedown')) || this._isInTextField(e)) {
      return;
    }

    const { classList } = e.target;
    const isDiscreteValue = classList.contains('md-slider-discrete-value');
    if (classList.contains('md-slider-thumb') || isDiscreteValue) {
      // Prevents text highlighting while dragging.
      if (e.type.match(/mouse/)) {
        e.preventDefault();
      }
      this.setState({ dragging: true, active: true, manualIncrement: false, maskInked: false });
    } else if (!this._isTextField(e.target) && this._isValidClassList(classList)) {
      this._updatePosition(e, true);
    }
  };

  _setNode = (node) => {
    this._node = findDOMNode(node);
  };

  _setTrack = (track) => {
    this._track = findDOMNode(track);
  };

  _setField = (field) => {
    this._field = findDOMNode(field);
    this._calcTrackWidth(this.props);
  };

  _handleDragMove = (e) => {
    if (this.props.disabled || !this.state.dragging) {
      return;
    }

    // Stops the text highlighting while dragging
    if (e.type.match(/mouse/)) {
      e.preventDefault();
    }

    this._updatePosition(e, false);
  };

  _handleDragEnd = (e) => {
    if (!this.state.dragging || this.props.disabled || (e.type === 'mouseup' && !isValidClick(e))) {
      return;
    }

    this._updatePosition(e, true);
  };

  /**
   * This will set the active state of the slider to false if the user
   * clicks outside of the slider's container.
   *
   * @param {Object} e - The window's click event.
   */
  _blurOnOutsideClick = (e) => {
    if ((this.state.dragging && !this.state.manualIncrement) || this.props.disabled) {
      return;
    }

    if (!this._node.contains(e.target)) {
      this.setState({ active: false, maskInked: false });
    }
  };

  /**
   * Updates the slider with the `step` prop and calls the `onChange`
   * function with the new value.
   *
   * @param {number} incrementedValue - The newly incremented value of the slider.
   * @param {Object} e - Either the text field's change event, mouse down event, or
   *    touch start event.
   * @param {bool} disableTransition - Boolean if the jump's transition should be disabled.
   */
  _handleIncrement = (incrementedValue, e, disableTransition) => {
    const { onChange, min, max, discrete } = this.props;

    const value = Math.max(min, Math.min(max, incrementedValue));
    const distance = this._calcDistance(value, min, max);

    if (onChange) {
      onChange(value, e);
    }

    const state = {
      distance,
      manualIncrement: true,
      thumbLeft: this._calcLeft(distance),
      trackFillWidth: `${distance}%`,
      dragging: Math.abs(this.state.distance - distance) < 2 && disableTransition,
    };

    if (typeof this.props.value === 'undefined') {
      state.value = value;
    }

    if (e.type === 'keydown' && !discrete) {
      state.maskInked = true;
    }

    this.setState(state);
  };

  _handleTextFieldChange = (newValue, e) => {
    this._handleIncrement(newValue, e, false);
  };

  /**
   * This will increment the Slider's value by the `step` prop. If the left or
   * right key arrow is pressed.
   *
   * @param {Object} e - the keydown event.
   */
  _handleKeyDown = (e) => {
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

    let nextValue = getField(this.props, this.state, 'value');
    nextValue = Math.max(
      min,
      Math.min((key === LEFT ? -step : step) + nextValue, max)
    );

    this._handleIncrement(nextValue, e, true);
  };

  /**
   * This function will animate the discrete Slider's ink if it gains focus
   * by a tab event.
   *
   * @param {Object} e - the key up event.
   */
  _handleKeyUp = (e) => {
    if ((e.which || e.keyCode) !== TAB) {
      return;
    }

    if (this.props.discrete) {
      this._animateDiscreteInk();
    }

    this.setState({ maskInked: true });
  };

  _handleFocus = () => {
    this.setState({ active: true });
  };

  /**
   * For some reason the width of the track gets set to 0 if the `Slider` has a label and
   * does not include the `leftIcon`, `rightIcon`, and is not `editable` OR it is
   * `editable` and does not include the `leftIcon`. All other cases the width works
   * correctly.
   *
   * This function just checks these things, and sets the width accordingly.
   */
  _calcTrackWidth = (props) => {
    const { editable, leftIcon, rightIcon, inputWidth, label } = props;

    if (!label) {
      this.setState({ trackWidth: null });
      return;
    }

    let trackWidth = null;
    if (!leftIcon && !rightIcon && !editable) {
      trackWidth = '100%';
    } else if (this._field && editable && !leftIcon) {
      const cs = window.getComputedStyle(this._field);
      const pl = parseInt(cs.getPropertyValue('padding-left'), 10) || 0;
      const ml = parseInt(cs.getPropertyValue('margin-left'), 10) || 0;

      trackWidth = pl + ml + inputWidth;
    }

    if (trackWidth !== this.state.trackWidth) {
      this.setState({ trackWidth });
    }
  };

  /**
   * The ink for a Discrete slider is only visible for a short time on initial
   * focus. This function will handle the in/out transitions.
   */
  _animateDiscreteInk = () => {
    const wait = this.props.discreteInkTransitionTime;
    if (this._inkTimeout) {
      clearTimeout(this._inkTimeout);
    }

    this._inkTimeout = setTimeout(() => {
      this.setState({ leaving: true, maskInked: false });

      this._inkTimeout = setTimeout(() => {
        this._inkTimeout = null;
        this.setState({ leaving: false });
      }, wait);
    }, wait);
  };

  /**
   * This is a helper function for focusing the Slider's thumb component. There
   * is a short delay because the body sometimes gets focused immediately after
   * if there is no timeout..
   */
  _focusThumb = () => {
    if (this._focusTimeout) {
      clearTimeout(this._focusTimeout);
    }

    this._focusTimeout = setTimeout(() => {
      this._focusTimeout = null;
      if (!this._thumb) {
        this._thumb = this._node.querySelector('.md-slider-thumb');
      }

      this._thumb.focus();
    }, 100);
  };

  render() {
    const {
      dragging,
      active,
      thumbLeft,
      trackFillWidth,
      maskInked,
      trackWidth,
      scale,
      distance,
    } = this.state;

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
      discreteValueStyle,
      discreteValueClassName,
      label,
      editable,
      step,
      inputWidth,
      leftIcon,
      rightIcon,
      discrete,
      discreteTicks,
      tickWidth,
      valuePrecision,
      /* eslint-disable no-unused-vars */
      value: propValue,
      onChange,
      onDragChange,
      discreteInkTransitionTime,

      // deprecated
      stepPrecision,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const value = getField(this.props, this.state);
    let rightChildren = rightIcon;
    if (editable) {
      rightChildren = (
        <TextField
          id={`${id}-editor`}
          ref={this._setField}
          type="number"
          value={value}
          inputClassName="md-slider-editor"
          style={{ width: inputWidth }}
          onChange={this._handleTextFieldChange}
          step={step}
        />
      );
    }

    return (
      <div
        {...props}
        ref={this._setNode}
        className={cn('md-slider-container', className, {
          'md-pointer--hover': !disabled,
        })}
        onMouseDown={this._handleDragStart}
        onTouchStart={this._handleDragStart}
      >
        <SliderLabel htmlFor={id}>{label}</SliderLabel>
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
          ref={this._setTrack}
          style={Object.assign({}, trackStyle, { width: trackWidth })}
          className={cn(trackClassName, {
            'md-slider-track--ind-left': leftIcon,
            'md-slider-track--ind-right': rightIcon,
          })}
          thumbStyle={thumbStyle}
          thumbClassName={thumbClassName}
          discreteValueStyle={discreteValueStyle}
          discreteValueClassName={discreteValueClassName}
          active={active}
          dragging={dragging}
          disabled={disabled}
          thumbLeft={thumbLeft}
          trackFillWidth={trackFillWidth}
          on={!disabled && distance > 0}
          off={distance === 0}
          maskInked={maskInked}
          onThumbKeyUp={this._handleKeyUp}
          onThumbKeyDown={this._handleKeyDown}
          onThumbFocus={this._handleFocus}
          discrete={discrete}
          tickWidth={tickWidth}
          discreteTicks={discreteTicks}
          valuePrecision={valuePrecision}
          step={step}
          scale={scale}
          value={value}
        />
        {rightChildren}
      </div>
    );
  }
}
