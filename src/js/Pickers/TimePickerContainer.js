import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TransitionGroup from 'react-addons-transition-group';
import classnames from 'classnames';

import { ESC } from '../constants/keyCodes';
import { onOutsideClick } from '../utils';
import { DateTimeFormat, getTimeString, extractTimeParts } from '../utils/dates';
import Dialog from '../Dialogs';
import FontIcon from '../FontIcons';
import { Height } from '../Transitions';
import TextField from '../TextFields';
import TimePicker from './TimePicker';

export default class TimePickerContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    const date = props.defaultValue ? new Date(props.defaultValue) : new Date();

    this.state = {
      ...this.getTimeParts(date, props),
      value: props.defaultValue,
      isOpen: props.initiallyOpen,
      time: date,
      timeMode: props.initialTimeMode,
      tempTime: date,
    };
  }

  static propTypes = {
    /**
     * An optional className to apply to the year picker.
     */
    className: PropTypes.string,

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
     * Boolean if the label for the time picker's text field should
     * be a floating label.
     */
    floatingLabel: PropTypes.bool,

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
  };

  static defaultProps = {
    initiallyOpen: false,
    initialTimeMode: 'hour',
    icon: <FontIcon>access_time</FontIcon>,
    DateTimeFormat: DateTimeFormat,
    locales: window.navigator.userLanguage || window.navigator.language,
    okLabel: 'Ok',
    okPrimary: true,
    cancelLabel: 'Cancel',
    cancelPrimary: true,
  };

  componentWillUpdate(nextProps, nextState) {
    if(this.getValue() !== this.getValue(nextProps, nextState)) {
      this.setState(this.getTimeParts(this.getValue(nextProps, nextState), nextProps));
    } else if(this.state.tempValue !== nextState.tempTime) {
      this.setState(this.getTimeParts(nextState.tempTime, nextProps));
    }

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
  }

  closeOnOutside = e => onOutsideClick(e, this.refs.container, this.close);

  closeOnEsc = (e) => {
    if((e.which || e.keyCode) === ESC) {
      this.handleCancelClick();
    }
  };

  getValue = (props = this.props, state = this.state) => {
    return typeof props.value === 'undefined' ? state.value : props.value;
  };

  getTimeParts = (date, props = this.props) => extractTimeParts(props.DateTimeFormat, props.locales, date);

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  setTimeMode = (timeMode) => {
    if(this.state.timeMode === timeMode) { return; }

    this.setState({ timeMode });
  };

  setTempTime = (time) => {
    if(this.state.tempTime === time) { return; }

    this.setState({ tempTime: time });
  };

  handleOkClick = (e) => {
    const { onChange, DateTimeFormat, locales } = this.props;
    const value = new Date(this.state.tempTime);
    if(onChange) {
      onChange(getTimeString(DateTimeFormat, locales, value), value, e);
    }

    this.setState({ value, isOpen: false });
  };

  handleCancelClick = () => {
    this.setState({ isOpen: false, tempTime: this.state.time });
  };

  render() {
    const { label, floatingLabel, value, onChange, icon, inline, displayMode, ...props } = this.props;
    const { isOpen, ...state } = this.state;

    const pickerProps = {
      ...state,
      ...props,
      className: classnames('md-picker', displayMode, { inline, 'with-icon': inline && icon }),
      onOkClick: this.handleOkClick,
      onCancelClick: this.handleCancelClick,
      setTimeMode: this.setTimeMode,
      setTempTime: this.setTempTime,
    };

    let textFieldValue = typeof value === 'undefined' ? state.value : value;
    if(isOpen && inline) {
      textFieldValue = this.getValue(this.props, this.state);
    }

    if(textFieldValue) {
      textFieldValue = getTimeString(props.DateTimeFormat, props.locales, textFieldValue);
    }

    return (
      <div className="md-picker-container" ref="container">
        <TextField
          icon={icon}
          onClick={this.toggleOpen}
          label={label}
          floatingLabel={floatingLabel}
          value={textFieldValue}
          onChange={onChange}
          readOnly={true}
        />
        {inline ?
          <TransitionGroup>
            {isOpen &&
              <Height transitionEnterTimeout={150} transitionLeaveTimeout={150}>
                <TimePicker {...pickerProps} />
              </Height>
            }
          </TransitionGroup> :
          <Dialog isOpen={isOpen} close={this.close}>
            {isOpen && <TimePicker {...pickerProps} />}
          </Dialog>
        }
      </div>
    );
  }
}
