/* eslint-disable new-cap,no-shadow */
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
import isDateEqual from '../utils/DateUtils/isDateEqual';
import addDate from '../utils/DateUtils/addDate';
import DateTimeFormat from '../utils/DateUtils/DateTimeFormat';

import Collapse from '../Helpers/Collapse';
import FontIcon from '../FontIcons/FontIcon';
import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
import TextField from '../TextFields/TextField';
import Dialog from '../Dialogs/DialogContainer';
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
     * An id for the text field in the date picker. This is require for a11y.
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
     * An optional className to apply to the header of date picker.
     */
    pickerHeaderClassName: PropTypes.string,

    /**
     * An optional className to apply to the content container of date picker.
     */
    pickerContentClassName: PropTypes.string,

    /**
     * An optional className to apply to the footer of date picker.
     */
    pickerFooterClassName: PropTypes.string,

    /**
     * An optional className to apply to the calendar container of date picker.
     */
    calendarClassName: PropTypes.string,

    /**
     * An optional className to apply to the year picker of date picker.
     */
    yearPickerClassName: PropTypes.string,

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
     * An optional icon to display with the date picker.
     *
     * @see {@link TextFields/TextField#leftIcon}
     */
    icon: PropTypes.node,

    /**
     * Boolean if the date picker is open by default.
     */
    defaultVisible: PropTypes.bool,

    /**
     * An optional label to be displayed in the date picker's text
     * field.
     */
    label: PropTypes.node,

    /**
     * An optional placeholder to be displayed in the date picker's text field.
     */
    placeholder: PropTypes.string,

    /**
     * The value of the date picker. This will make the date picker
     * be a controlled component. This value should either be a
     * formatted date string or a date object.
     */
    value: controlled(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]), 'onChange', 'defaultValue'),

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
    defaultCalendarDate: PropTypes.oneOfType([
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
     * The label to use for the ok button on the date picker.
     */
    okLabel: PropTypes.node.isRequired,

    /**
     * Boolean if the ok button should be styled with the primary color.
     */
    okPrimary: PropTypes.bool,

    /**
     * The label to use for the cancel button on the date picker.
     */
    cancelLabel: PropTypes.node.isRequired,

    /**
     * Boolean if the cancel button should be styled with the primary color.
     */
    cancelPrimary: PropTypes.bool,

    /**
     * The initial mode to open the calendar in.
     */
    defaultCalendarMode: PropTypes.oneOf(['calendar', 'year']),

    /**
     * The icon to use to display the previous month icon in the calendar.
     */
    previousIcon: PropTypes.node,

    /**
     * The icon to use to display the next month icon in the calendar.
     */
    nextIcon: PropTypes.node,

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
      if (err || !props.minDate || !props[propName]) {
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
    yearsDisplayed: PropTypes.number,

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
     * The timeZone to be used in all formatting operations.
     * For a full list of possible timeZone values check https://www.iana.org/time-zones.
     */
    timeZone: PropTypes.string.isRequired,

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
     * Boolean if the DatePicker should be read only. This will prevent the user from opening the picker
     * and only display the current date in the text field.
     */
    readOnly: PropTypes.bool,

    /**
     * The first day of week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
     */
    firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),

    /**
     * True if weekends are to be greyed out.
     */
    disableWeekEnds: PropTypes.bool,

    /**
     * True if dates from adjacent months should be shown in calendar.
     */
    showAllDays: PropTypes.bool,

    /**
     * Boolean if the dates from adjacent months should be disabled. This will only
     * do something if the `showAllDays` prop is enabled as well.
     *
     * This is really only helpful if youd like the other days to appear, but not be
     * clickable until the user switches to that month.
     *
     * @see {@link #showAllDays}
     */
    disableOuterDates: PropTypes.bool,

    /**
     * An optional className to apply to a date in calendar.
     */
    calendarDateClassName: PropTypes.string,

    /**
     * An optional className to apply to a date from an adjacent month in calendar. This will be applied
     * along with the `calendarDateClassName`.
     *
     * @see {@link #showAllDays}
     * @see {@link #calendarDateClassName}
     */
    calendarOuterDateClassName: PropTypes.string,

    /**
     * An optional className to apply to the title in calendar header.
     */
    calendarTitleClassName: PropTypes.string,

    /**
     * The DateTimeFormat options to apply to format the title in calendar header.
     */
    calendarTitleFormat: PropTypes.shape({
      era: PropTypes.oneOf(['narrow', 'short', 'long']),
      year: PropTypes.oneOf(['numeric', '2-digit']),
      month: PropTypes.oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
    }),

    /**
     * An optional className to apply to a weekday in calendar header.
     */
    calendarWeekdayClassName: PropTypes.string,

    /**
     * The DateTimeFormat option to apply to format a weekday in calendar header.
     */
    calendarWeekdayFormat: PropTypes.oneOf(['narrow', 'short', 'long']),

    /**
     * @see {@link Dialogs/DialogContainer#disableScrollLocking}
     */
    disableScrollLocking: PropTypes.bool,

    /**
     * Boolean if the dialog should be rendered as the last child of the `renderNode` or `body` instead
     * of the first.
     */
    lastChild: PropTypes.bool,

    previousIconChildren: deprecated(PropTypes.node, 'Use the `previousIcon` prop instead'),
    previousIconClassName: deprecated(PropTypes.string, 'Use the `previousIcon` prop instead'),
    nextIconChildren: deprecated(PropTypes.node, 'use the `nextIcon` prop instead'),
    nextIconClassName: deprecated(PropTypes.string, 'Use the `nextIcon` prop instead'),
    adjustMinWidth: deprecated(PropTypes.bool, 'No longer valid for a text field'),
    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
    initiallyOpen: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
    initialCalendarDate: deprecated(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]), 'Use `defaultCalendarDate` instead'),
    initialCalendarMode: deprecated(PropTypes.oneOf(['calendar', 'year']), 'Use `defaultCalendarMode` instead'),
    initialYearsDisplayed: deprecated(
      PropTypes.number,
      'Use `yearsDisplayed` instead. I have not implemented infinite loading years'
    ),
  };

  static defaultProps = {
    animateInline: true,
    previousIcon: <FontIcon>chevron_left</FontIcon>,
    nextIcon: <FontIcon>chevron_right</FontIcon>,
    autoOk: false,
    icon: <FontIcon>date_range</FontIcon>,
    yearsDisplayed: 100,
    defaultCalendarMode: 'calendar',
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
    'aria-label': 'Pick a date',
    timeZone: 'UTC',
  };

  constructor(props) {
    super(props);

    let date;
    let value;
    const {
      defaultValue,
      DateTimeFormat,
      locales,
      minDate,
      maxDate,
    } = props;

    if (typeof props.value !== 'undefined') {
      date = this._getDate(props.value);
    } else if (defaultValue) {
      date = this._getDate(defaultValue);
      value = typeof defaultValue === 'string'
        ? defaultValue
        : DateTimeFormat(locales, this._getFormatOptions()).format(defaultValue);
    } else {
      date = new Date();
      value = '';
    }

    date = this._validateDateRange(date, minDate, maxDate);

    const defaultCalendarDate = typeof props.initialCalendarDate !== 'undefined'
      ? props.initialCalendarDate
      : props.defaultCalendarDate;
    let calendarTempDate = date;
    if (typeof defaultCalendarDate !== 'undefined' && !props.value && !props.defaultValue) {
      calendarTempDate = this._getDate(defaultCalendarDate);
      date = calendarTempDate;
    } else if (calendarTempDate === null) {
      calendarTempDate = new Date();
      date = new Date();
    }

    const visible = typeof props.initiallyOpen !== 'undefined'
      ? props.initiallyOpen
      : !!props.defaultVisible;

    this.state = {
      value,
      visible,
      calendarDate: date,
      calendarTempDate,
      calendarMode: props.initialCalendarMode || props.defaultCalendarMode,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value, minDate, maxDate } = nextProps;
    const minEqual = isDateEqual(this.props.minDate, minDate);
    const maxEqual = isDateEqual(this.props.maxDate, maxDate);
    if (this.props.value !== value || !minEqual || !maxEqual) {
      let { calendarDate } = this.state;
      if (typeof value !== 'undefined') {
        calendarDate = this._getDate(value);
      }

      calendarDate = this._validateDateRange(calendarDate, minDate, maxDate);

      if (!isDateEqual(this.state.calendarDate, calendarDate)) {
        this.setState({ calendarDate, calendarTempDate: calendarDate });
      }
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

  _getDate(value) {
    if (value === '' || value === null) {
      return new Date();
    } else if (typeof value === 'string') {
      return new Date(value);
    }

    return value;
  }

  _getFormatOptions() {
    const { formatOptions, timeZone } = this.props;
    return { ...formatOptions, timeZone };
  }

  _setContainer= (container) => {
    this._container = container;
  };

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
      this.setState({ visible });
    }
  };

  _handleKeyDown = (e) => {
    handleKeyboardAccessibility(e, this._toggleOpen, true, true);

    if ((e.which || e.keyCode) === TAB && this.state.active) {
      this.setState({ active: false });
    }
  };

  _handleOkClick = (e) => {
    const { DateTimeFormat, locales, onChange, onVisibilityChange } = this.props;
    const value = DateTimeFormat(locales, this._getFormatOptions()).format(this.state.calendarTempDate);
    if (onChange) {
      onChange(value, new Date(this.state.calendarTempDate), e);
    }

    if (onVisibilityChange) {
      onVisibilityChange(false, e);
    }

    let state;
    if (typeof this.props.value === 'undefined') {
      state = { value };
    }

    if (typeof this.props.visible === 'undefined' && typeof this.props.isOpen === 'undefined') {
      state = state || {};
      state.visible = false;
    }

    if (state) {
      this.setState(state);
    }
  };

  _handleCancelClick = (e) => {
    const state = { calendarTempDate: this.state.calendarDate };
    if (typeof this.props.isOpen === 'undefined' && typeof this.props.isOpen === 'undefined') {
      state.visible = false;
    }

    if (this.props.onVisibilityChange) {
      this.props.onVisibilityChange(false, e);
    }

    this.setState(state);
  };

  _changeCalendarMode = (calendarMode) => {
    if (this.state.calendarMode === calendarMode) { return; }

    this.setState({ calendarMode });
  };

  _previousMonth = () => {
    const calendarDate = addDate(this.state.calendarDate, -1, 'M');
    this.setState({ calendarDate });
  };

  _nextMonth = () => {
    const calendarDate = addDate(this.state.calendarDate, 1, 'M');
    this.setState({ calendarDate });
  };

  _setCalendarTempDate = (calendarTempDate) => {
    const { autoOk, DateTimeFormat, locales, onChange } = this.props;

    const state = { calendarTempDate };
    if (autoOk) {
      const value = DateTimeFormat(locales, this._getFormatOptions()).format(calendarTempDate);
      if (onChange) {
        onChange(value, new Date(calendarTempDate));
      }

      if (typeof this.props.value === 'undefined') {
        state.value = value;
      }

      this._timeout = setTimeout(() => {
        this._timeout = null;

        if (this.props.onVisibilityChange) {
          this.props.onVisibilityChange(false);
        }

        if (typeof this.props.visible === 'undefined' && typeof this.props.isOpen === 'undefined') {
          this.setState({ visible: false });
        }
      });
    }
    this.setState(state);
  };

  _setCalendarTempYear = (year) => {
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
  };

  /**
   * Gets the current value from the date picker as a formatted string.
   *
   * @param {Object} props? the props object to use.
   * @param {Object} state? the state object to use.
   * @return {String} a formatted date string or the empty string.
   */
  _getFormattedValue(props, state) {
    const { DateTimeFormat, locales } = props;
    const value = getField(props, state, 'value');
    if (!value) {
      return '';
    } else if (value instanceof Date) {
      return DateTimeFormat(locales, this._getFormatOptions()).format(new Date(value));
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
    let date = calendarDate;
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
      pickerHeaderClassName,
      pickerContentClassName,
      pickerFooterClassName,
      inputStyle,
      inputClassName,
      textFieldStyle,
      textFieldClassName,
      label,
      placeholder,
      icon,
      inline,
      displayMode,
      fullWidth,
      lineDirection,
      id,
      disabled,
      closeOnEsc,
      animateInline,
      portal,
      renderNode,
      lastChild,
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
      nextIcon: propNextIcon,
      previousIcon: propPreviousIcon,

      // deprecated
      isOpen,
      previousIconChildren,
      previousIconClassName,
      nextIconChildren,
      nextIconClassName,
      /* eslint-disable no-unused-vars */
      value: propValue,
      visible: propVisible,
      defaultValue,
      defaultVisible,
      onChange,
      readOnly,
      onVisibilityChange,
      defaultCalendarDate,

      // deprecated
      initialCalendarDate,
      initiallyOpen,
      adjustMinWidth,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const nextIcon = getDeprecatedIcon(nextIconClassName, nextIconChildren, propNextIcon);
    const previousIcon = getDeprecatedIcon(previousIconClassName, previousIconChildren, propPreviousIcon);
    const visible = typeof isOpen !== 'undefined'
      ? isOpen
      : getField(this.props, this.state, 'visible');

    const picker = (
      <DatePicker
        {...this.state}
        {...props}
        nextIcon={nextIcon}
        previousIcon={previousIcon}
        icon={!!icon}
        inline={inline}
        style={pickerStyle}
        className={pickerClassName}
        headerClassName={pickerHeaderClassName}
        contentClassName={pickerContentClassName}
        footerClassName={pickerFooterClassName}
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
          renderNode={renderNode}
          portal={portal}
          lastChild={lastChild}
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
          value={this._getFormattedValue(this.props, this.state)}
          readOnly
        />
        {content}
      </div>
    );
  }
}
