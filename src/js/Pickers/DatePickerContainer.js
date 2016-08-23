import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TransitionGroup from 'react-addons-transition-group';
import classnames from 'classnames';

import FontIcon from '../FontIcons';
import DatePicker from './DatePicker';

import { ESC } from '../constants/keyCodes';
import { onOutsideClick } from '../utils';
import { addDate, subtractDate, DateTimeFormat, isMonthBefore } from '../utils/dates';
import TextField from '../TextFields';
import Dialog from '../Dialogs';
import Height from '../Transitions/Height';

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
export default class DatePickerContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    let date, value;
    const { defaultValue, DateTimeFormat, locales, formatOptions } = props;
    if (typeof props.value !== 'undefined' && props.value !== null) {
      date = typeof props.value === 'string' ? new Date(props.value) : props.value;
    } else if(defaultValue) {
      date = typeof defaultValue === 'string' ? new Date(defaultValue) : defaultValue;
      value = typeof defaultValue === 'string' ? defaultValue : DateTimeFormat(locales, formatOptions).format(defaultValue);
    } else {
      date = new Date();
    }

    this.state = {
      value,
      isOpen: props.initiallyOpen,
      calendarDate: date,
      calendarTempDate: date,
      calendarMode: props.initialCalendarMode,
      transitionName: 'md-swipe-left',
    };
  }

  static propTypes = {
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
     * Boolean if the date picker is initially open.
     */
    initiallyOpen: PropTypes.bool,

    /**
     * An optional label to be displayed in the date picker's text
     * field.
     */
    label: PropTypes.string,

    /**
     * Boolean if the label for the date picker's text field should
     * be a floating label.
     */
    floatingLabel: PropTypes.bool,

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
    maxDate: PropTypes.instanceOf(Date),

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
     * Boolean if the date picker should automatically increase it's text field's
     * min width to the max size of it's label or placeholder text.
     */
    adjustMinWidth: PropTypes.bool,
  };

  static defaultProps = {
    initiallyOpen: false,
    previousIcon: <FontIcon>chevron_left</FontIcon>,
    nextIcon: <FontIcon>chevron_right</FontIcon>,
    autoOk: false,
    icon: <FontIcon>date_range</FontIcon>,
    initialYearsDisplayed: 100,
    initialCalendarMode: 'calendar',
    DateTimeFormat: DateTimeFormat,
    locales: typeof window !== 'undefined'
      ? window.navigator.userLanguage || window.navigator.language
      : 'en-US',
    okLabel: 'Ok',
    okPrimary: true,
    cancelLabel: 'Cancel',
    cancelPrimary: true,
  };

  componentWillUpdate(nextProps, nextState) {
    if(this.state.isOpen && !nextState.isOpen) {
      if(nextProps.inline) {
        window.removeEventListener('click', this.closeOnOutside);
      }

      window.removeEventListener('keydown', this.closeOnEsc);
    } else if(!this.state.isOpen && nextState.isOpen) {
      if(nextProps.inline) {
        window.addEventListener('click', this.closeOnOutside);
      }

      window.addEventListener('keydown', this.closeOnEsc);
    }

    const { calendarDate } = this.state;
    if(calendarDate === nextState.calendarDate) { return; }

    this.setState({ transitionName: `md-swipe-${calendarDate < nextState.calendarDate ? 'left' : 'right'}` });
  }

  componentWillUnmount() {
    if(this.state.isOpen) {
      if(this.props.inline) {
        window.removeEventListener('click', this.closeOnOutside);
      }

      window.removeEventListener('keydown', this.closeOnEsc);
    }
  }

  closeOnEsc = (e) => {
    if((e.which || e.keyCode) === ESC) {
      this.handleCancelClick();
    }
  };

  closeOnOutside = e => onOutsideClick(e, this.refs.container, this.close);

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  handleOkClick = (e) => {
    const { DateTimeFormat, locales, onChange, formatOptions } = this.props;
    const value = DateTimeFormat(locales, formatOptions).format(this.state.calendarTempDate);
    onChange && onChange(value, new Date(this.state.calendarTempDate), e);

    this.setState({ value, isOpen: false });
  };

  handleCancelClick = () => {
    this.setState({ calendarTempDate: this.state.calendarDate, isOpen: false });
  };

  changeCalendarMode = (calendarMode) => {
    if(this.state.calendarMode === calendarMode) { return; }

    this.setState({ calendarMode });
  };

  previousMonth = () => {
    const calendarDate = subtractDate(this.state.calendarDate, 1, 'M');
    this.setState({ calendarDate });
  };

  nextMonth = () => {
    const calendarDate = addDate(this.state.calendarDate, 1, 'M');
    this.setState({ calendarDate });
  };

  setCalendarTempDate = (calendarTempDate) => {
    const { autoOk, DateTimeFormat, locales, onChange, formatOptions } = this.props;

    const state = { calendarTempDate };
    if(autoOk) {
      const value = DateTimeFormat(locales, formatOptions).format(calendarTempDate);
      onChange && onChange(value, new Date(calendarTempDate));

      if(typeof this.props.value === 'undefined') {
        state.value = value;
      }

      // Add a wait for the new date to be selected, then close
      state.timeout = setTimeout(() => {
        this.setState({ timeout: null, isOpen: false });
      }, 300);
    }
    this.setState(state);
  };

  setCalendarTempYear = (year) => {
    const { calendarTempDate, calendarDate } = this.state;
    if(calendarTempDate.getFullYear() === year) { return; }

    const { minDate, maxDate } = this.props;
    let nextDate = new Date(calendarDate.setFullYear(year));
    let nextTemp = new Date(calendarTempDate.setFullYear(year));

    if(minDate && nextTemp < minDate) {
      nextDate = new Date(minDate);
      nextTemp = new Date(minDate);
    }

    if(maxDate && nextTemp > maxDate) {
      nextDate = new Date(maxDate);
      nextTemp = new Date(maxDate);
    }

    this.setState({
      calendarDate: nextDate,
      calendarTempDate: nextTemp,
    });
  };

  handleSwipeChange = (index, distance) => {
    const { minDate, maxDate } = this.props;
    const { calendarDate } = this.state;
    const isPreviousDisabled = isMonthBefore(minDate, calendarDate);
    const isNextDisabled = isMonthBefore(calendarDate, maxDate);

    if(distance === 0) {
      return;
    } else if(!isPreviousDisabled && distance < 0) {
      this.previousMonth();
    } else if(!isNextDisabled && distance > 0) {
      this.nextMonth();
    }
  };

  /**
   * Gets the current value from the date picker as a formatted string.
   *
   * @param {Object} props? the props object to use.
   * @param {Object} state? the state object to use.
   * @return {String} a formatted date string or the empty string.
   */
  getValue = (props = this.props, state = this.state) => {
    const { DateTimeFormat, locales, formatOptions } = props;
    const value = typeof props.value !== 'undefined' ? props.value : state.value;
    if(!value) {
      return '';
    } else if(value instanceof Date) {
      return DateTimeFormat(locales, formatOptions).format(new Date(value));
    } else {
      return value;
    }
  };

  render() {
    const { isOpen, ...state } = this.state;
    const {
      style,
      className,
      pickerStyle,
      pickerClassName,
      label,
      floatingLabel,
      icon,
      inline,
      displayMode,
      fullWidth,
      adjustMinWidth,
      ...props,
    } = this.props;
    delete props.value;
    delete props.onChange;

    let picker, content;
    if(isOpen) {
      picker = (
        <DatePicker
          {...state}
          {...props}
          style={pickerStyle}
          className={classnames('md-picker', displayMode, pickerClassName, {
            inline,
            'with-icon': inline && icon,
          })}
          onCancelClick={this.handleCancelClick}
          onOkClick={this.handleOkClick}
          changeCalendarMode={this.changeCalendarMode}
          onPreviousClick={this.previousMonth}
          onNextClick={this.nextMonth}
          onCalendarDateClick={this.setCalendarTempDate}
          onCalendarYearClick={this.setCalendarTempYear}
          onSwipeChange={this.handleSwipeChange}
        />
      );
    }

    if(inline) {
      picker = isOpen ? <Height transitionEnterTimeout={150} transitionLeaveTimeout={150}>{picker}</Height> : null;
      content = <TransitionGroup>{picker}</TransitionGroup>;
    } else {
      content = <Dialog isOpen={isOpen} close={this.close}>{picker}</Dialog>;
    }

    return (
      <div className={classnames('md-picker-container', className)} ref="container" style={style}>
        <TextField
          icon={icon}
          onClick={this.toggleOpen}
          label={label}
          floatingLabel={floatingLabel}
          value={this.getValue()}
          readOnly={true}
          fullWidth={fullWidth}
          adjustMinWidth={adjustMinWidth}
        />
        {content}
      </div>
    );
  }
}
