/* eslint-disable no-shadow */
import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';
import deprecated from 'react-prop-types/lib/deprecated';

import { ESC } from '../constants/keyCodes';
import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import DateTimeFormat from '../utils/DateUtils/DateTimeFormat';
import formatTime from '../utils/DateUtils/formatTime';
import extractTimeParts from '../utils/DateUtils/extractTimeParts';
import Dialog from '../Dialogs';
import FontIcon from '../FontIcons';
import TextField from '../TextFields';
import Collapse from '../Helpers/Collapse';
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
     * An id for the text field in the time picker. This is require for a11u.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),

    /**
     * An aria-label to apply to the dialog when it has been opened. This is required for
     * a11y.
     */
    'aria-label': isRequiredForA11y(PropTypes.string),

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
     * Boolean if the time picker is open by default.
     */
    defaultOpen: PropTypes.bool,

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
     * The direction that the text field divider expands from when the text field
     * in the date picker gains focus.
     */
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * An optional boolean if the time picker is current visible by dialog or inline.
     * If this is set, the `onOpenToggle` function is required.
     */
    isOpen: controlled(PropTypes.bool, 'onOpenToggle', 'defaultOpen'),

    /**
     * An optional function to call when the date picker is opened in either a dialog, or
     * inline. The callback will include the next state.
     *
     * ```js
     * onOpenToggle(!isOpen, e);
     * ```
     */
    onOpenToggle: PropTypes.func,

    /**
     * Boolean if the time picker is disabled.
     */
    disabled: PropTypes.bool,
    initiallyOpen: deprecated(PropTypes.bool, 'Use `defaultOpen` instead'),
  };

  static defaultProps = {
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
    'aria-label': 'Select a time',
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
      isOpen: typeof props.initiallyOpen !== 'undefined' ? props.initiallyOpen : !!props.defaultOpen,
      time: initialDate,
      timeMode: props.initialTimeMode,
      tempTime: initialDate,
    };

    this._setContainer = this._setContainer.bind(this);
    this._toggleOpen = this._toggleOpen.bind(this);
    this._closeOnEsc = this._closeOnEsc.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._getTextFieldValue = this._getTextFieldValue.bind(this);
    this._setTimeMode = this._setTimeMode.bind(this);
    this._setTempTime = this._setTempTime.bind(this);
    this._handleOkClick = this._handleOkClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (getField(this.props, this.state, 'value') !== getField(nextProps, nextState, 'value')) {
      this.setState(this._getTimeParts(getField(nextProps, nextState, 'value'), nextProps));
    } else if (this.state.tempValue !== nextState.tempTime) {
      this.setState(this._getTimeParts(nextState.tempTime, nextProps));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { inline } = this.props;
    const isOpen = getField(this.props, this.state, 'isOpen');
    if (isOpen === getField(prevProps, prevState, 'isOpen')) {
      return;
    }

    if (isOpen) {
      if (inline) {
        window.addEventListener('click', this._handleOutsideClick);
        window.addEventListener('keydown', this._closeOnEsc);
      }
    } else if (inline) {
      window.removeEventListener('click', this._handleOutsideClick);
      window.removeEventListener('keydown', this._closeOnEsc);
    }
  }

  componentWillUnmount() {
    if (getField(this.props, this.state, 'isOpen') && this.props.inline) {
      window.removeEventListener('click', this._handleOutsideClick);
      window.removeEventListener('keydown', this._closeOnEsc);
    }
  }

  _setContainer(container) {
    this._container = container;
  }

  _getTimeParts(date, props) {
    return extractTimeParts(props.DateTimeFormat, props.locales, date);
  }

  _closeOnEsc(e) {
    if ((e.which || e.keyCode) === ESC) {
      this._handleCancelClick(e);
    }
  }

  _handleOutsideClick(e) {
    if (this._container && !this._container.contains(e.target)) {
      this._handleCancelClick(e);
    }
  }

  _toggleOpen(e) {
    const isOpen = !getField(this.props, this.state, 'isOpen');
    if (this.props.onOpenToggle) {
      this.props.onOpenToggle(isOpen, e);
    }

    if (typeof this.props.isOpen === 'undefined') {
      this.setState({ isOpen });
    }
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
    const { onOpenToggle, onChange, DateTimeFormat, locales } = this.props;
    const value = new Date(this.state.tempTime);
    if (onChange) {
      onChange(formatTime(DateTimeFormat, locales, value), value, e);
    }

    if (onOpenToggle) {
      onOpenToggle(false, e);
    }

    let state;
    if (typeof this.props.value === 'undefined') {
      state = { value };
    }

    if (typeof this.props.isOpen === 'undefined') {
      state = state || {};
      state.isOpen = false;
    }

    if (state) {
      this.setState(state);
    }
  }

  _handleCancelClick(e) {
    if (this.props.onOpenToggle) {
      this.props.onOpenToggle(false, e);
    }

    const state = { isOpen: false, tempTime: this.state.time };
    if (typeof this.props.isOpen !== 'undefined') {
      delete state.isOpen;
    }

    this.setState(state);
  }

  _getTextFieldValue(props, state) {
    const { DateTimeFormat, locales } = props;
    const value = getField(props, state, 'value');
    if (!value) {
      return '';
    } else if (value instanceof Date) {
      return formatTime(DateTimeFormat, locales, value);
    } else {
      // currently don't support value of string
      return value;
    }
  }

  render() {
    const {
      timeMode,
      tempTime,
      hours,
      minutes,
      timePeriod,
    } = this.state;

    const {
      id,
      disabled,
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
      lineDirection,
      'aria-label': ariaLabel,
      ...props,
    } = this.props;
    delete props.value;
    delete props.isOpen;
    delete props.onOpenToggle;
    delete props.onChange;
    delete props.defaultValue;
    delete props.initiallyOpen;
    delete props.defaultOpen;

    const isOpen = getField(this.props, this.state, 'isOpen');

    const picker = (
      <TimePicker
        {...props}
        inline={inline}
        icon={!!icon}
        tempTime={tempTime}
        timeMode={timeMode}
        hours={hours}
        minutes={minutes}
        timePeriod={timePeriod}
        style={pickerStyle}
        className={pickerClassName}
        displayMode={displayMode}
        onOkClick={this._handleOkClick}
        onCancelClick={this._handleCancelClick}
        setTimeMode={this._setTimeMode}
        setTempTime={this._setTempTime}
      />
    );

    let content;
    if (inline) {
      content = <Collapse collapsed={!isOpen}>{picker}</Collapse>;
    } else {
      content = (
        <Dialog
          id={`${id}Dialog`}
          isOpen={isOpen}
          onClose={this._handleCancelClick}
          dialogClassName="md-dialog--picker"
          contentClassName="md-dialog-content--picker"
          aria-label={ariaLabel}
        >
          {picker}
        </Dialog>
      );
    }

    return (
      <div style={style} className={cn('md-picker-container', className)} ref={this._setContainer}>
        <TextField
          id={id}
          disabled={disabled}
          className={cn({ 'md-pointer--hover': !disabled })}
          inputClassName={cn({ 'md-pointer--hover': !disabled })}
          leftIcon={icon}
          onClick={this._toggleOpen}
          label={label}
          placeholder={placeholder}
          value={this._getTextFieldValue(this.props, this.state)}
          readOnly
          fullWidth={fullWidth}
          lineDirection={lineDirection}
        />
        {content}
      </div>
    );
  }
}
