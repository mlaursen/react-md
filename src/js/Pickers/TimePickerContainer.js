/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';
import deprecated from 'react-prop-types/lib/deprecated';

import { ESC, TAB } from '../constants/keyCodes';
import getField from '../utils/getField';
import handleWindowClickListeners from '../utils/EventUtils/handleWindowClickListeners';
import handleKeyboardAccessibility from '../utils/EventUtils/handleKeyboardAccessibility';
import controlled from '../utils/PropTypes/controlled';
import DateTimeFormat from '../utils/DateUtils/DateTimeFormat';
import formatTime from '../utils/DateUtils/formatTime';
import extractTimeParts from '../utils/DateUtils/extractTimeParts';
import Dialog from '../Dialogs/DialogContainer';
import FontIcon from '../FontIcons/FontIcon';
import TextField from '../TextFields/TextField';
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
     * An id for the text field in the time picker. This is require for a11y.
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
     * An optional style to apply to the input tag.
     */
    inputStyle: PropTypes.object,

    /**
     * An optional className to apply to the input tag.
     */
    inputClassName: PropTypes.string,

    /**
     * An optional style to apply to the text field's container.
     */
    textFieldStyle: PropTypes.object,

    /**
     * An optional className to apply to the text field's container.
     */
    textFieldClassName: PropTypes.string,

    /**
     * An optional icon to display with the time picker.
     *
     * @see {@link TextFields/TextField#leftIcon}
     */
    icon: PropTypes.node,

    /**
     * Boolean if the time picker is open by default.
     */
    defaultVisible: PropTypes.bool,

    /**
     * An optional label to be displayed in the time picker's text
     * field.
     */
    label: PropTypes.node,

    /**
     * An optional placeholder to be displayed in the time picker's text field.
     */
    placeholder: PropTypes.string,

    /**
     * The value of the time picker. This will make the time picker
     * be a controlled component.
     */
    value: controlled(PropTypes.instanceOf(Date), 'onChange', 'defaultValue'),

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
     * can also create your own if you really wanted. Inadvisable though.
     *
     * See [intl-polyfill](https://github.com/andyearnshaw/Intl.js/) for more info.
     */
    DateTimeFormat: PropTypes.func.isRequired,

    /**
     * The locales to use for formatting the date. This will default to using
     * the user's language in the browser or `'en-US'` when server rendering.
     */
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,

    /**
     * The label to use for the ok button on the year picker.
     */
    okLabel: PropTypes.node.isRequired,

    /**
     * Boolean if the ok button should be styled with the primary color.
     */
    okPrimary: PropTypes.bool,

    /**
     * The label to use for the cancel button on the year picker.
     */
    cancelLabel: PropTypes.node.isRequired,

    /**
     * Boolean if the cancel button should be styled with the primary color.
     */
    cancelPrimary: PropTypes.bool,

    /**
     * The default mode to open the time picker in.
     */
    defaultTimeMode: PropTypes.oneOf(['hour', 'minute']),

    /**
     * Boolean if the date should automatically be selected when a user clicks
     * on a new date instead of making them hit the ok button.
     */
    autoOk: PropTypes.bool,

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
     * If this is set, the `onVisibilityChange` function is required.
     */
    visible: controlled(PropTypes.bool, 'onVisibilityChange', 'defaultVisible'),

    /**
     * An optional function to call when the date picker is opened in either a dialog, or
     * inline. The callback will include the next state.
     *
     * ```js
     * onVisibilityChange(!visible, e);
     * ```
     */
    onVisibilityChange: PropTypes.func,

    /**
     * Boolean if the time picker is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Boolean if the dialog should be able to close if a keyboard user presses the escape key.
     */
    closeOnEsc: PropTypes.bool,

    /**
     * If true the hover mode of the Time Picker is activated.
     * In hover mode no clicks are required to start selecting an hour
     * and the time mode switches automatically when a time was chosen.
     * When a minute is selected the chosen time is applied automatically.
     */
    hoverMode: PropTypes.bool,

    /**
     * Boolean if the inline time picker's visibility should be animated.
     */
    animateInline: PropTypes.bool,

    /**
     * Boolean if the time is required.
     *
     * @see {@link TextFields/TextField#required}
     */
    required: PropTypes.bool,

    /**
     * @see {@link TextFields/TextField#block}
     */
    block: TextField.propTypes.block,

    /**
     * @see {@link TextFields/TextField#paddedBlock}
     */
    paddedBlock: TextField.propTypes.paddedBlock,

    /**
     * @see {@link TextFields/TextField#active}
     */
    active: TextField.propTypes.active,

    /**
     * @see {@link TextFields/TextField#error}
     */
    error: TextField.propTypes.error,

    /**
     * @see {@link TextFields/TextField#floating}
     */
    floating: TextField.propTypes.floating,

    /**
     * @see {@link TextFields/TextField#leftIconStateful}
     */
    leftIconStateful: TextField.propTypes.leftIconStateful,

    /**
     * @see {@link TextFields/TextField#rightIcon}
     */
    rightIcon: TextField.propTypes.rightIcon,

    /**
     * @see {@link TextFields/TextField#rightIconStateful}
     */
    rightIconStateful: TextField.propTypes.rightIconStateful,

    /**
     * @see {@link TextFields/TextField#customSize}
     */
    customSize: TextField.propTypes.customSize,

    /**
     * @see {@link TextFields/TextField#errorText}
     */
    errorText: TextField.propTypes.errorText,

    /**
     * @see {@link TextFields/TextField#helpText}
     */
    helpText: TextField.propTypes.helpText,

    /**
     * @see {@link TextFields/TextField#helpOnFocus}
     */
    helpOnFocus: TextField.propTypes.helpOnFocus,

    /**
     * @see {@link TextFields/TextField#inlineIndicator}
     */
    inlineIndicator: TextField.propTypes.inlineIndicator,

    /**
     * Boolean if the Portal's functionality of rendering in a separate react tree should be applied
     * to the dialog.
     *
     * @see {@link Helpers/Portal}
     */
    portal: PropTypes.bool,

    /**
     * An optional DOM Node to render the dialog into. The default is to render as the first child
     * in the `body`.
     */
    renderNode: PropTypes.object,

    /**
     * Boolean if the dialog should be rendered as the last child of the `renderNode` or `body` instead
     * of the first.
     */
    lastChild: PropTypes.bool,

    /**
     * @see {@link Dialogs/DialogContainer#disableScrollLocking}
     */
    disableScrollLocking: PropTypes.bool,

    /**
     * Boolean if the TimePicker should be read only. This will prevent the user from opening the picker
     * and only display the current date in the text field.
     */
    readOnly: PropTypes.bool,

    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
    initiallyOpen: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
    initialTimeMode: deprecated(PropTypes.oneOf(['hour', 'minute']), 'Use `defaultTimeMode` instead'),
  };

  static defaultProps = {
    animateInline: true,
    defaultTimeMode: 'hour',
    icon: <FontIcon>access_time</FontIcon>,
    DateTimeFormat: DateTimeFormat, // eslint-disable-line object-shorthand
    locales: typeof window !== 'undefined'
      ? window.navigator.userLanguage || window.navigator.language
      : 'en-US',
    okLabel: 'Ok',
    okPrimary: true,
    cancelLabel: 'Cancel',
    cancelPrimary: true,
    closeOnEsc: true,
    disableScrollLocking: false,
    'aria-label': 'Select a time',
    hoverMode: false,
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

    const visible = typeof props.initiallyOpen !== 'undefined'
      ? props.initiallyOpen
      : !!props.defaultVisible;

    this.state = {
      visible,
      ...this._getTimeParts(initialDate, props),
      value: props.defaultValue,
      time: initialDate,
      timeMode: props.initialTimeMode || props.defaultTimeMode,
      tempTime: initialDate,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      const time = nextProps.value || new Date();
      this.setState({ tempTime: time, ...this._getTimeParts(time, nextProps) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { inline, isOpen } = this.props;
    const visible = typeof isOpen !== 'undefined'
      ? isOpen
      : getField(this.props, this.state, 'visible');
    const pVisible = typeof prevProps.isOpen !== 'undefined'
      ? prevProps.isOpen
      : getField(prevProps, prevState, 'visible');

    if (visible === pVisible) {
      return;
    }

    if (visible) {
      if (inline) {
        handleWindowClickListeners(this._handleOutsideClick, true);
        window.addEventListener('keydown', this._closeOnEsc);
      }
    } else if (inline) {
      handleWindowClickListeners(this._handleOutsideClick, false);
      window.removeEventListener('keydown', this._closeOnEsc);
    }
  }

  componentWillUnmount() {
    const visible = typeof this.props.isOpen !== 'undefined'
      ? this.props.isOpen
      : getField(this.props, this.state, 'visible');
    if (visible && this.props.inline) {
      handleWindowClickListeners(this._handleOutsideClick, false);
      window.removeEventListener('keydown', this._closeOnEsc);
    }
  }

  _setContainer = (container) => {
    this._container = container;
  };

  _getTimeParts(date, props) {
    return extractTimeParts(props.DateTimeFormat, props.locales, date);
  }

  _closeOnEsc = (e) => {
    if ((e.which || e.keyCode) === ESC) {
      this._handleCancelClick(e);
    }
  };

  _handleOutsideClick = (e) => {
    if (this._container && !this._container.contains(e.target)) {
      this._handleCancelClick(e);
    }
  };

  _toggleOpen = (e) => {
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    const visible = !(typeof this.props.isOpen !== 'undefined'
      ? this.props.isOpen
      : getField(this.props, this.state, 'visible'));

    if (this.props.onVisibilityChange) {
      this.props.onVisibilityChange(visible, e);
    }

    if (typeof this.props.isOpen === 'undefined' && typeof this.props.visible === 'undefined') {
      const { hoverMode } = this.props;

      if (hoverMode) {
        this._setTimeMode('hour');
      }

      this.setState({ visible });
    }
  };

  _setTimeMode = (timeMode) => {
    if (this.state.timeMode === timeMode) {
      return;
    }

    this.setState({ timeMode });
  };

  _setTempTime = (time) => {
    if (this.state.tempTime === time) {
      return;
    }

    this.setState({ tempTime: time, ...this._getTimeParts(time, this.props) });
  };

  _handleKeyDown = (e) => {
    handleKeyboardAccessibility(e, this._toggleOpen, true, true);

    if ((e.which || e.keyCode) === TAB && this.state.active) {
      this.setState({ active: false });
    }
  };

  _handleOkClick = (e) => {
    const { onVisibilityChange, onChange, DateTimeFormat, locales } = this.props;
    const value = new Date(this.state.tempTime);
    if (onChange) {
      onChange(formatTime(DateTimeFormat, locales, value), value, e);
    }

    if (onVisibilityChange) {
      onVisibilityChange(false, e);
    }

    const state = { time: value, ...this._getTimeParts(value, this.props) };
    if (typeof this.props.value === 'undefined') {
      state.value = value;
    }

    if (typeof this.props.isOpen === 'undefined' && typeof this.props.visible === 'undefined') {
      state.visible = false;
    }

    this.setState(state);
  };

  _handleCancelClick = (e) => {
    if (this.props.onVisibilityChange) {
      this.props.onVisibilityChange(false, e);
    }

    let state;
    if (typeof this.props.isOpen === 'undefined' && typeof this.props.visible === 'undefined') {
      state = { visible: false };
    }

    const value = getField(this.props, this.state, 'value');
    if (value) {
      state = { ...state, ...this._getTimeParts(value, this.props) };
      state.tempTime = this.state.time;
    }

    if (state) {
      this.setState(state);
    }
  };

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
      style,
      className,
      pickerStyle,
      pickerClassName,
      inputStyle,
      inputClassName,
      textFieldStyle,
      textFieldClassName,
      id,
      disabled,
      label,
      placeholder,
      icon,
      inline,
      displayMode,
      fullWidth,
      lineDirection,
      closeOnEsc,
      hoverMode,
      portal,
      renderNode,
      lastChild,
      animateInline,
      block,
      paddedBlock,
      active,
      error,
      floating,
      required,
      leftIconStateful,
      rightIcon,
      rightIconStateful,
      customSize,
      errorText,
      helpText,
      helpOnFocus,
      inlineIndicator,
      disableScrollLocking,
      'aria-label': ariaLabel,
      /* eslint-disable no-unused-vars */
      value: propValue,
      visible: propVisible,
      readOnly,
      defaultValue,
      defaultVisible,
      defaultTimeMode,
      onVisibilityChange,

      // deprecated
      isOpen,
      initialTimeMode,
      initiallyOpen,
      ...props
    } = this.props;

    const visible = typeof this.props.isOpen !== 'undefined'
      ? this.props.isOpen
      : getField(this.props, this.state, 'visible');

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
        hoverMode={hoverMode}
      />
    );

    let content;
    if (inline) {
      content = <Collapse collapsed={!visible} animate={animateInline}>{picker}</Collapse>;
    } else {
      content = (
        <Dialog
          id={`${id}-dialog`}
          visible={visible}
          onHide={this._handleCancelClick}
          dialogClassName="md-dialog--picker"
          contentClassName="md-dialog-content--picker"
          aria-label={ariaLabel}
          closeOnEsc={closeOnEsc}
          portal={portal}
          lastChild={lastChild}
          renderNode={renderNode}
          focusOnMount={false}
          disableScrollLocking={disableScrollLocking}
        >
          {picker}
        </Dialog>
      );
    }

    return (
      <div style={style} className={cn('md-picker-container', className)} ref={this._setContainer}>
        <TextField
          id={id}
          style={textFieldStyle}
          className={cn({ 'md-pointer--hover': !disabled }, textFieldClassName)}
          inputStyle={inputStyle}
          inputClassName={cn({ 'md-pointer--hover': !disabled }, inputClassName)}
          active={active || visible}
          error={error}
          floating={floating || visible}
          required={required}
          disabled={disabled}
          leftIcon={icon}
          leftIconStateful={leftIconStateful}
          rightIcon={rightIcon}
          rightIconStateful={rightIconStateful}
          inlineIndicator={inlineIndicator}
          block={block}
          paddedBlock={paddedBlock}
          fullWidth={fullWidth}
          lineDirection={lineDirection}
          customSize={customSize}
          helpText={helpText}
          helpOnFocus={helpOnFocus}
          errorText={errorText}
          label={label}
          placeholder={placeholder}
          onClick={this._toggleOpen}
          onKeyDown={this._handleKeyDown}
          value={this._getTextFieldValue(this.props, this.state)}
          readOnly
        />
        {content}
      </div>
    );
  }
}
