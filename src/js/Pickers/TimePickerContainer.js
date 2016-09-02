/* eslint-disable no-shadow */
import React, { PureComponent, PropTypes } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { ESC } from '../constants/keyCodes';
import { onOutsideClick } from '../utils';
import { DateTimeFormat, getTimeString, extractTimeParts } from '../utils/dates';
import Dialog from '../Dialogs';
import FontIcon from '../FontIcons';
import Height from '../Transitions/Height';
import TextField from '../TextFields';
import TimePicker from './TimePicker';

/**
 * The `TimePickerContainer` component is a wrapper for the main `TimePicker` component
 * to manage the state and _logic_ for rendering the `TimePicker`. This component will
 * either render inline or in a `Dialog` depending if the `inline` prop is set
 * to `true`.
 *
 * NOTE: This component is actually exported as `TimePicker` when using the `import { member }` syntax.
 * The following two lines are equivalent:
 *
 * ```js
 * import { TimePicker } from 'react-md/lib/Pickers';
 * import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';
 * ```
 */
export default class TimePickerContainer extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the time picker's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the time picker's container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the time picker.
     */
    pickerStyle: PropTypes.object,

    /**
     * An optional className to apply to the time picker.
     */
    pickerClassName: PropTypes.string,

    /**
     * An optional icon to display with the time picker.
     */
    icon: PropTypes.node,

    /**
     * Boolean if the time picker is initially open.
     */
    initiallyOpen: PropTypes.bool,

    /**
     * An optional label to be displayed in the time picker's text
     * field.
     */
    label: PropTypes.string,

    /**
     * An optional placeholder to be displayed in the time picker's text field.
     */
    placeholder: PropTypes.string,

    /**
     * The value of the time picker. This will make the time picker
     * be a controlled component.
     */
    value: PropTypes.instanceOf(Date),

    /**
     * An optional function to call when the selected date is changed
     * by hitting the OK button. The newly formatted time string,
     * the new Date object, and the change event will be given.
     *
     * `onChange(timeString, dateObject, event)`.
     */
    onChange: PropTypes.func,

    /**
     * An optional default value to give for the year picker.
     */
    defaultValue: PropTypes.instanceOf(Date),

    /**
     * A function to format the dates since it should be formatted to the user's
     * locale. This _should_ be the `Intl.DateTimeFormat` function. You
     * can also create your own if you really wanted. Unadvisable though.
     *
     * See [intl-polyfill](https://github.com/andyearnshaw/Intl.js/) for more info.
     */
    DateTimeFormat: PropTypes.func.isRequired,

    /**
     * The locales to use for formatting the date. This will default to using
     * the user's language in the browser or `'en-US'` when server renering.
     */
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,

    /**
     * The label to use for the ok button on the year picker.
     */
    okLabel: PropTypes.string.isRequired,

    /**
     * Boolean if the ok button should be styled with the primary color.
     */
    okPrimary: PropTypes.bool,

    /**
     * The label to use for the cancel button on the year picker.
     */
    cancelLabel: PropTypes.string.isRequired,

    /**
     * Boolean if the cancel button should be styled with the primary color.
     */
    cancelPrimary: PropTypes.bool,

    /**
     * The initial mode to open the time picker in.
     */
    initialTimeMode: PropTypes.oneOf(['hour', 'minute']),

    /**
     * Boolean if the date should automatically be selected when a user clicks
     * on a new date instead of making them hit the ok button.
     */
    autoOk: PropTypes.bool,

    /**
     * The number of years to display.
     */
    initialYearsDisplayed: PropTypes.number,

    /**
     * Boolean if the date picker should be displayed inline instead of in a
     * dialog.
     */
    inline: PropTypes.bool,

    /**
     * An optional force of the display mode of the date picker.
     * This _should_ not really be used since there are media queries
     * to use the correct mode based on device orientation.
     */
    displayMode: PropTypes.oneOf(['landscape', 'portrait']),

    /**
     * Boolean if the text field for the Time Picker should be displayed as full width.
     */
    fullWidth: PropTypes.bool,

    /**
     * Boolean if the time picker should automatically increase it's text field's
     * min width to the max size of it's label or placeholder text.
     */
    adjustMinWidth: PropTypes.bool,

    /**
     * The direction that the text field divider expands from when the text field
     * in the date picker gains focus.
     */
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * An id for the text field in the time picker. This is require for a11u.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  };

  static defaultProps = {
    initiallyOpen: false,
    initialTimeMode: 'hour',
    icon: <FontIcon>access_time</FontIcon>,
    DateTimeFormat: DateTimeFormat, // eslint-disable-line object-shorthand
    locales: typeof window !== 'undefined'
      ? window.navigator.userLanguage || window.navigator.language
      : 'en-US',
    okLabel: 'Ok',
    okPrimary: true,
    cancelLabel: 'Cancel',
    cancelPrimary: true,
  };

  constructor(props) {
    super(props);

    let initialDate;
    if (props.defaultValue) {
      initialDate = new Date(props.defaultValue);
    } else if (props.value) {
      initialDate = new Date(props.value);
    } else {
      initialDate = new Date();
    }

    this.state = {
      ...this._getTimeParts(initialDate, props),
      value: props.defaultValue,
      isOpen: props.initiallyOpen,
      time: initialDate,
      timeMode: props.initialTimeMode,
      tempTime: initialDate,
    };

    this._close = this._close.bind(this);
    this._toggleOpen = this._toggleOpen.bind(this);
    this._closeOnEsc = this._closeOnEsc.bind(this);
    this._closeOnOutside = this._closeOnOutside.bind(this);
    this._getTextFieldValue = this._getTextFieldValue.bind(this);
    this._setTimeMode = this._setTimeMode.bind(this);
    this._setTempTime = this._setTempTime.bind(this);
    this._handleOkClick = this._handleOkClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this._getValue(this.props, this.state) !== this._getValue(nextProps, nextState)) {
      this.setState(this._getTimeParts(this._getValue(nextProps, nextState), nextProps));
    } else if (this.state.tempValue !== nextState.tempTime) {
      this.setState(this._getTimeParts(nextState.tempTime, nextProps));
    }

    if (this.state.isOpen && !nextState.isOpen) {
      if (nextProps.inline) {
        window.removeEventListener('click', this._closeOnOutside);
      }

      window.removeEventListener('keydown', this._closeOnEsc);
    } else if (!this.state.isOpen && nextState.isOpen) {
      if (nextProps.inline) {
        window.addEventListener('click', this._closeOnOutside);
      }

      window.addEventListener('keydown', this._closeOnEsc);
    }
  }

  _getValue(props, state) {
    return typeof props.value === 'undefined' ? state.value : props.value;
  }

  _getTimeParts(date, props) {
    return extractTimeParts(props.DateTimeFormat, props.locales, date);
  }

  _closeOnOutside(e) {
    onOutsideClick(e, this.refs.container, this._close);
  }

  _closeOnEsc(e) {
    if ((e.which || e.keyCode) === ESC) {
      this._handleCancelClick();
    }
  }

  _toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  _close() {
    this.setState({ isOpen: false });
  }

  _setTimeMode(timeMode) {
    if (this.state.timeMode === timeMode) { return; }

    this.setState({ timeMode });
  }

  _setTempTime(time) {
    if (this.state.tempTime === time) { return; }

    this.setState({ tempTime: time });
  }

  _handleOkClick(e) {
    const { onChange, DateTimeFormat, locales } = this.props;
    const value = new Date(this.state.tempTime);
    if (onChange) {
      onChange(getTimeString(DateTimeFormat, locales, value), value, e);
    }

    this.setState({ value, isOpen: false });
  }

  _handleCancelClick() {
    this.setState({ isOpen: false, tempTime: this.state.time });
  }

  _getTextFieldValue(props, state) {
    const { DateTimeFormat, locales } = props;
    const value = this._getValue(props, state);
    if (!value) {
      return '';
    } else if (value instanceof Date) {
      return getTimeString(DateTimeFormat, locales, value);
    } else {
      // currently don't support value of string
      return value;
    }
  }

  render() {
    const {
      isOpen,
      timeMode,
      tempTime,
      hours,
      minutes,
      timePeriod,
    } = this.state;

    const {
      label,
      placeholder,
      icon,
      inline,
      displayMode,
      style,
      className,
      pickerStyle,
      pickerClassName,
      fullWidth,
      adjustMinWidth,
      lineDirection,
      ...props,
    } = this.props;
    delete props.value;
    delete props.onChange;
    delete props.defaultValue;

    let picker;
    if (isOpen) {
      picker = (
        <TimePicker
          {...props}
          tempTime={tempTime}
          timeMode={timeMode}
          hours={hours}
          minutes={minutes}
          timePeriod={timePeriod}
          style={pickerStyle}
          className={cn('md-picker', displayMode, pickerClassName, {
            inline,
            'with-icon': inline && icon,
          })}
          onOkClick={this._handleOkClick}
          onCancelClick={this._handleCancelClick}
          setTimeMode={this._setTimeMode}
          setTempTime={this._setTempTime}
        />
      );
    }

    let content;
    if (inline) {
      picker = isOpen ? <Height transitionEnterTimeout={150} transitionLeaveTimeout={150}>{picker}</Height> : null;
      content = <TransitionGroup>{picker}</TransitionGroup>;
    } else {
      content = <Dialog isOpen={isOpen} close={this._close}>{picker}</Dialog>;
    }

    return (
      <div
        style={style}
        className={cn('md-picker-container', className)}
        ref="container"
      >
        <TextField
          leftIcon={icon}
          onClick={this._toggleOpen}
          label={label}
          placeholder={placeholder}
          value={this._getTextFieldValue(this.props, this.state)}
          readOnly
          fullWidth={fullWidth}
          adjustMinWidth={adjustMinWidth}
          lineDirection={lineDirection}
        />
        {content}
      </div>
    );
  }
}
