import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TransitionGroup from 'react-addons-transition-group';
import classnames from 'classnames';

import { ESC } from '../constants/keyCodes';
import { getTimeString } from '../utils';
import Configuration from '../utils/Configuration';
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
    className: PropTypes.string,
    icon: PropTypes.node,
    defaultValue: PropTypes.instanceOf(Date),
    value: PropTypes.instanceOf(Date),
    initiallyOpen: PropTypes.bool,
    label: PropTypes.string,
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
    inline: PropTypes.bool,
    displayMode: PropTypes.oneOf(['landscape', 'portrait']),
  };

  static defaultProps = {
    initiallyOpen: false,
    initialTimeMode: 'hour',
    icon: <FontIcon>access_time</FontIcon>,
    DateTimeFormat: Configuration.DateTimeFormat,
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

  closeOnOutside = (e) => {
    const { container } = this.refs;
    let target = e.target;
    while(target.parentNode) {
      if(target === container) { return; }
      target = target.parentNode;
    }

    this.close();
  };

  closeOnEsc = (e) => {
    if((e.which || e.keyCode) === ESC) {
      this.handleCancelClick();
    }
  };

  getValue = (props = this.props, state = this.state) => {
    return typeof props.value === 'undefined' ? state.value : props.value;
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
    const { onChange, DateTimeFormat, locales } = this.props;
    const value = new Date(this.state.tempTime);
    if(onChange) {
      onChange(value, getTimeString(DateTimeFormat, locales, value), e);
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
