/* eslint-disable new-cap,no-shadow */
import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';
import deprecated from 'react-prop-types/lib/deprecated';

import { ESC } from '../constants/keyCodes';
import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import isDateEqual from '../utils/DateUtils/isDateEqual';
import addDate from '../utils/DateUtils/addDate';
import DateTimeFormat from '../utils/DateUtils/DateTimeFormat';

import Collapse from '../Helpers/Collapse';
import FontIcon from '../FontIcons';
import TextField from '../TextFields';
import Dialog from '../Dialogs';
import DatePicker from './DatePicker';

/**
 * The `DatePickerContainer` component is a wrapper for the main `DatePicker` component
 * to manage the state and _logic_ for rendering the `DatePicker`. This component will
 * either render inline or in a `Dialog` depending if the `inline` prop is set to `true`.
 *
 * NOTE: This component is actually exported as `DatePicker` when using the `import { member }` syntax.
 * The following two lines are equivalent:
 *
 * ```js
 * import { DatePicker } from 'react-md/lib/Pickers';
 * import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
 * ```
 */
export default class DatePickerContainer extends PureComponent {
  static propTypes = {
    /**
     * An id for the text field in the date picker. This is require for a11u.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),

    /**
     * An aria label for the dialog. This is required for a11y.
     */
    'aria-label': isRequiredForA11y(PropTypes.string),

    /**
     * An optional style to apply to the date picker's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the date picker's container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the date picker.
     */
    pickerStyle: PropTypes.object,

    /**
     * An optional className to apply to the date picker.
     */
    pickerClassName: PropTypes.string,

    /**
     * An optional icon to display with the date picker.
     */
    icon: PropTypes.node,

    /**
     * Boolean if the date picker is open by default.
     */
    defaultOpen: PropTypes.bool,

    /**
     * An optional label to be displayed in the date picker's text
     * field.
     */
    label: PropTypes.string,

    /**
     * An optional placeholder to be displayed in the date picker's text field.
     */
    placeholder: PropTypes.string,

    /**
     * The value of the date picker. This will make the date picker
     * be a controlled component. This value should either be a
     * formatted date string or a date object.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),

    /**
     * An optional default value to give for the date picker. This should
     * either be a formatted date string or a date object.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),

    /**
     * An optional date to use when the calendar is opened for the first time.
     * If this is omitted, it will either be the `defaultValue`, `value`, or
     * today.
     */
    initialCalendarDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),

    /**
     * An optional function to call when the selected date is changed
     * by hitting the OK button. The newly formatted date string,
     * the new Date object, and the change event will be given.
     *
     * `onChange(dateString, dateObject, event)`.
     */
    onChange: PropTypes.func,

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
     * The label to use for the ok button on the date picker.
     */
    okLabel: PropTypes.string.isRequired,

    /**
     * Boolean if the ok button should be styled with the primary color.
     */
    okPrimary: PropTypes.bool,

    /**
     * The label to use for the cancel button on the date picker.
     */
    cancelLabel: PropTypes.string.isRequired,

    /**
     * Boolean if the cancel button should be styled with the primary color.
     */
    cancelPrimary: PropTypes.bool,

    /**
     * The initial mode to open the calendar in.
     */
    initialCalendarMode: PropTypes.oneOf(['calendar', 'year']),

    /**
     * The icon to use for the previous month button.
     */
    previousIcon: PropTypes.node.isRequired,

    /**
     * The icon to use for the next month button.
     */
    nextIcon: PropTypes.node.isRequired,

    /**
     * An optional min date to use for the date picker. This will prevent
     * any dates before this time to be chosen.
     */
    minDate: PropTypes.instanceOf(Date),

    /**
     * An optional max date to use for the date picker. This will prevent
     * any dates after this time to be chosen.
     */
    maxDate: (props, propName, component, ...others) => {
      const err = PropTypes.instanceOf(Date)(props, propName, component, ...others);
      if (err || typeof props.minDate === 'undefined' || typeof props[propName] === 'undefined') {
        return err;
      }

      const { minDate, maxDate } = props;
      if (minDate > maxDate) {
        return new Error(
          `The min date: '${minDate}' is greater than the max date: '${maxDate}'`
        );
      }

      return null;
    },

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
     * The DateTimeFormat options to apply to format the date.
     */
    formatOptions: PropTypes.shape({
      weekday: PropTypes.oneOf(['narrow', 'short', 'long']),
      era: PropTypes.oneOf(['narrow', 'short', 'long']),
      year: PropTypes.oneOf(['numeric', '2-digit']),
      month: PropTypes.oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
      day: PropTypes.oneOf(['numeric', '2-digit']),
      hour: PropTypes.oneOf(['numeric', '2-digit']),
      minute: PropTypes.oneOf(['numeric', '2-digit']),
      second: PropTypes.oneOf(['numeric', '2-digit']),
      timeZoneName: PropTypes.oneOf(['short', 'long']),
    }),

    /**
     * Boolean if the text field for the Date Picker should be displayed as full width.
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
    previousIcon: <FontIcon>chevron_left</FontIcon>,
    nextIcon: <FontIcon>chevron_right</FontIcon>,
    autoOk: false,
    icon: <FontIcon>date_range</FontIcon>,
    initialYearsDisplayed: 100,
    initialCalendarMode: 'calendar',
    DateTimeFormat: DateTimeFormat, // eslint-disable-line object-shorthand
    locales: typeof window !== 'undefined'
      ? window.navigator.userLanguage || window.navigator.language
      : 'en-US',
    okLabel: 'Ok',
    okPrimary: true,
    cancelLabel: 'Cancel',
    cancelPrimary: true,
    'aria-label': 'Pick a date',
  };

  constructor(props) {
    super(props);

    let date;
    let value;
    const {
      defaultValue,
      DateTimeFormat,
      locales,
      formatOptions,
      initialCalendarDate,
      minDate,
      maxDate,
    } = props;
    if (typeof props.value !== 'undefined' && props.value !== null) {
      date = typeof props.value === 'string' ? new Date(props.value) : props.value;
    } else if (defaultValue) {
      date = typeof defaultValue === 'string' ? new Date(defaultValue) : defaultValue;
      value = typeof defaultValue === 'string'
        ? defaultValue
        : DateTimeFormat(locales, formatOptions).format(defaultValue);
    } else {
      date = new Date();
    }

    if (minDate || maxDate) {
      date = this._validateDateRange(date, minDate, maxDate);
    }

    let calendarTempDate = date;
    if (typeof initialCalendarDate !== 'undefined' && !props.value && !props.defaultValue) {
      calendarTempDate = typeof initialCalendarDate === 'string'
        ? new Date(initialCalendarDate)
        : initialCalendarDate;
      date = calendarTempDate;
    } else if (calendarTempDate === null) {
      calendarTempDate = new Date();
      date = new Date();
    }

    this.state = {
      value,
      isOpen: typeof props.initiallyOpen !== 'undefined' ? props.initiallyOpen : !!props.defaultOpen,
      calendarDate: date,
      calendarTempDate,
      calendarMode: props.initialCalendarMode,
    };

    this._setContainer = this._setContainer.bind(this);
    this._toggleOpen = this._toggleOpen.bind(this);
    this._closeOnEsc = this._closeOnEsc.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._handleOkClick = this._handleOkClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._changeCalendarMode = this._changeCalendarMode.bind(this);
    this._nextMonth = this._nextMonth.bind(this);
    this._previousMonth = this._previousMonth.bind(this);
    this._setCalendarTempDate = this._setCalendarTempDate.bind(this);
    this._setCalendarTempYear = this._setCalendarTempYear.bind(this);
    this._validateDateRange = this._validateDateRange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { minDate, maxDate } = this.props;
    if (!isDateEqual(minDate, nextProps.minDate) || !isDateEqual(maxDate, nextProps.maxDate)) {
      const date = this._validateDateRange(this.state.calendarDate, nextProps.minDate, nextProps.maxDate);
      if (date) {
        this.setState({ calendarTempDate: date, calendarDate: date });
      }
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

  _handleOkClick(e) {
    const { DateTimeFormat, locales, onChange, formatOptions } = this.props;
    const value = DateTimeFormat(locales, formatOptions).format(this.state.calendarTempDate);
    if (onChange) {
      onChange(value, new Date(this.state.calendarTempDate), e);
    }

    this.setState({ value, isOpen: false });
  }

  _handleCancelClick() {
    this.setState({ calendarTempDate: this.state.calendarDate, isOpen: false });
  }

  _changeCalendarMode(calendarMode) {
    if (this.state.calendarMode === calendarMode) { return; }

    this.setState({ calendarMode });
  }

  _previousMonth() {
    const calendarDate = addDate(this.state.calendarDate, -1, 'M');
    this.setState({ calendarDate });
  }

  _nextMonth() {
    const calendarDate = addDate(this.state.calendarDate, 1, 'M');
    this.setState({ calendarDate });
  }

  _setCalendarTempDate(calendarTempDate) {
    const { autoOk, DateTimeFormat, locales, onChange, formatOptions } = this.props;

    const state = { calendarTempDate };
    if (autoOk) {
      const value = DateTimeFormat(locales, formatOptions).format(calendarTempDate);
      if (onChange) {
        onChange(value, new Date(calendarTempDate));
      }

      if (typeof this.props.value === 'undefined') {
        state.value = value;
      }

      // Add a wait for the new date to be selected, then close
      state.timeout = setTimeout(() => {
        this.setState({ timeout: null, isOpen: false });
      }, 300);
    }
    this.setState(state);
  }

  _setCalendarTempYear(year) {
    const { calendarTempDate, calendarDate } = this.state;
    if (calendarTempDate.getFullYear() === year) { return; }

    const { minDate, maxDate } = this.props;
    let nextDate = new Date(calendarDate.setFullYear(year));
    let nextTemp = new Date(calendarTempDate.setFullYear(year));

    if (minDate && nextTemp < minDate) {
      nextDate = new Date(minDate);
      nextTemp = new Date(minDate);
    }

    if (maxDate && nextTemp > maxDate) {
      nextDate = new Date(maxDate);
      nextTemp = new Date(maxDate);
    }

    this.setState({
      calendarDate: nextDate,
      calendarTempDate: nextTemp,
    });
  }

  /**
   * Gets the current value from the date picker as a formatted string.
   *
   * @param {Object} props? the props object to use.
   * @param {Object} state? the state object to use.
   * @return {String} a formatted date string or the empty string.
   */
  _getFormattedValue(props, state) {
    const { DateTimeFormat, locales, formatOptions } = props;
    const value = getField(props, state, 'value');
    if (!value) {
      return '';
    } else if (value instanceof Date) {
      return DateTimeFormat(locales, formatOptions).format(new Date(value));
    } else {
      return value;
    }
  }

  /**
   * Attempts to validate the `calendarDate` in the state against the min and
   * max dates.
   *
   * This will return null if the current calendarDate is still within the range.
   *
   * @param {Date} calendarDate - The current calendar date to compare to.
   * @param {Date} minDate - An optional min date to compare to.
   * @param {Date} maxDate - An optional max date to compare to.
   * @return {Object} - The new state object with the updated calendarDate and
   *    calendarTempDate keys or null.
   */
  _validateDateRange(calendarDate, minDate, maxDate) {
    let date = null;
    if (minDate && minDate > calendarDate) {
      date = new Date(minDate);
    }

    if (maxDate && maxDate < calendarDate) {
      date = new Date(maxDate);
    }

    return date;
  }

  render() {
    const {
      style,
      className,
      pickerStyle,
      pickerClassName,
      label,
      placeholder,
      icon,
      inline,
      displayMode,
      fullWidth,
      lineDirection,
      id,
      disabled,
      'aria-label': ariaLabel,
      ...props,
    } = this.props;
    delete props.value;
    delete props.onChange;
    delete props.isOpen;
    delete props.onOpenToggle;
    delete props.defaultValue;
    delete props.initiallyOpen;
    delete props.defaultOpen;

    const isOpen = getField(this.props, this.state, 'isOpen');

    const picker = (
      <DatePicker
        {...this.state}
        {...props}
        icon={!!icon}
        inline={inline}
        style={pickerStyle}
        className={pickerClassName}
        displayMode={displayMode}
        onCancelClick={this._handleCancelClick}
        onOkClick={this._handleOkClick}
        changeCalendarMode={this._changeCalendarMode}
        onPreviousClick={this._previousMonth}
        onNextClick={this._nextMonth}
        onCalendarDateClick={this._setCalendarTempDate}
        onCalendarYearClick={this._setCalendarTempYear}
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
          leftIcon={icon}
          disabled={disabled}
          className={cn({ 'md-pointer--hover': !disabled })}
          inputClassName={cn({ 'md-pointer--hover': !disabled })}
          onClick={this._toggleOpen}
          label={label}
          placeholder={placeholder}
          value={this._getFormattedValue(this.props, this.state)}
          readOnly
          fullWidth={fullWidth}
          lineDirection={lineDirection}
        />
        {content}
      </div>
    );
  }
}
