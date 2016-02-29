import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TransitionGroup from 'react-addons-transition-group';
import classnames from 'classnames';

import { DateTimeFormat, getTimeString } from '../utils';
import Dialog from '../Dialogs';
import FontIcon from '../FontIcons';
import Height from '../Transitions';
import TextField from '../TextFields';
import TimePicker from './TimePicker';

export default class TimePickerContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    const date = props.defaultValue ? new Date(props.defaultValue) : new Date();
    let value = props.defaultValue;
    if(value && typeof props.defaultValue !== 'string') {
      value = getTimeString(props.DateTimeFormat, props.locales, value);
    }

    this.state = {
      value,
      ...this.getTimeParts(date, props),
      isOpen: props.initiallyOpen,
      time: date,
      timeMode: props.initialTimeMode,
      tempTime: date,
    };
  }

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node,
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    initiallyOpen: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    onChange: PropTypes.func,
    floatingLabel: PropTypes.bool,
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    okLabel: PropTypes.string.isRequired,
    okPrimary: PropTypes.bool,
    cancelLabel: PropTypes.string.isRequired,
    cancelPrimary: PropTypes.bool,
    initialTimeMode: PropTypes.oneOf(['hour', 'minute']),
    autoOk: PropTypes.bool,
    inline: PropTypes.bool,
    displayMode: PropTypes.oneOf(['landscape', 'portrait']),
  };

  static defaultProps = {
    initiallyOpen: false,
    initialTimeMode: 'hour',
    autoOk: false,
    icon: <FontIcon>access_time</FontIcon>,
    DateTimeFormat: DateTimeFormat,
    locales: navigator.language,
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
  }

  getValue = (props = this.props, state = this.state) => {
    const value = typeof props.value === 'undefined' ? state.value : props.value;
    return typeof value === 'string' ? value : getTimeString(props.DateTimeFormat, props.locales, value);
  };

  getTimeParts = (date, props = this.props) => {
    const time = getTimeString(props.DateTimeFormat, props.locales, date);
    let [hour, minute, ...others] = time.split(/(?=[^0-9])/);
    let timePeriod;
    if(others.length) {
      timePeriod = others.join('').trim();
    }

    return {
      hour,
      minute,
      timePeriod,
    };
  };

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
    const { DateTimeFormat, locales, onChange } = this.props;
    const value = getTimeString(DateTimeFormat, locales, this.state.tempTime);
    if(typeof this.props.value !== 'undefined' && onChange) {
      onChange(value, new Date(this.state.tempTime), e);
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

    return (
      <div className="md-picker-container" ref="container">
        <TextField
          icon={icon}
          onClick={this.toggleOpen}
          label={label}
          floatingLabel={floatingLabel}
          value={textFieldValue}
          onChange={onChange}
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
