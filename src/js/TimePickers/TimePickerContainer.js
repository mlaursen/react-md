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
    this.state = {
      isOpen: props.initiallyOpen,
      value: props.defaultValue,
      time: date,
      timeMode: props.initialTimeMode,
      tempTime: date,
    };
  }

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node,
    defaultValue: PropTypes.string,
    initiallyOpen: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
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
      textFieldValue = getTimeString(props.DateTimeFormat, props.locales, state.tempTime);
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
