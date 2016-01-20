import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TransitionGroup from 'react-addons-transition-group';
import classnames from 'classnames';

import { ESC } from '../constants/keyCodes';
import { addDate, subtractDate } from '../utils';

import TextField from '../TextFields';
import Dialog from '../Dialogs';
import FontIcon from '../FontIcons';
import Height from '../Transitions';

const DateTimeFormat = (() => {
  if(typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat !== 'undefined') {
    return Intl.DateTimeFormat;
  }

  // (locales, options)
  return () => date => date;
})();

export default class PickerContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    const date = props.defaultValue ? new Date(props.defaultValue) : new Date();
    this.state = {
      isOpen: props.initiallyOpen,
      value: props.defaultValue,
      calendarDate: date,
      calendarTempDate: date,
      calendarMode: props.initialCalendarMode,
    };
  }

  static propTypes = {
    component: PropTypes.func.isRequired,
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
    initialCalendarMode: PropTypes.oneOf(['calendar', 'year']),
    previousIcon: PropTypes.node.isRequired,
    nextIcon: PropTypes.node.isRequired,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    autoOk: PropTypes.bool,
    icon: PropTypes.node,
    type: PropTypes.oneOf(['date', 'time']),
    initialYearsDisplayed: PropTypes.number,
    inline: PropTypes.bool,
    displayMode: PropTypes.oneOf(['landscape', 'portrait']),
  };

  static defaultProps = {
    initiallyOpen: false,
    initialYearsDisplayed: 100,
    DateTimeFormat: DateTimeFormat,
    locales: navigator.language,
    okLabel: 'Ok',
    okPrimary: true,
    cancelLabel: 'Cancel',
    cancelPrimary: true,
    initialCalendarMode: 'calendar',
    icon: true,
    previousIcon: <FontIcon>chevron_left</FontIcon>,
    nextIcon: <FontIcon>chevron_right</FontIcon>,
    autoOk: false,
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
      this.close();
    }
  };

  closeOnOutside = (e) => {
    const { container } = this.refs;
    let target = e.target;
    while(target.parentNode) {
      if(target === container) { return; }
      target = target.parentNode;
    }

    this.close();
  };

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  handleOkClick = (e) => {
    const { DateTimeFormat, locales, onChange } = this.props;
    const value = DateTimeFormat(locales).format(this.state.calendarTempDate);
    if(typeof this.props.value !== 'undefined' && onChange) {
      onChange(value, e);
    }

    this.setState({ value, isOpen: false });
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
    const { autoOk, DateTimeFormat, locales, onChange } = this.props;

    if(autoOk) {
      const value = DateTimeFormat(locales).format(calendarTempDate);
      if(onChange && typeof this.props.value !== 'undefined') {
        onChange(value);
      }

      this.setState({
        isOpen: false,
        value,
        calendarTempDate,
      });
    } else {
      this.setState({ calendarTempDate });
    }
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

  render() {
    const { label, floatingLabel, value, onChange, icon, type, inline, displayMode, component, ...props } = this.props;
    const { isOpen, ...state } = this.state;
    const pickerProps = {
      ...state,
      ...props,
      className: classnames('md-picker', displayMode, { inline, 'with-icon': inline && icon }),
      onCancelClick: this.close,
      onOkClick: this.handleOkClick,
      changeCalendarMode: this.changeCalendarMode,
      onPreviousClick: this.previousMonth,
      onNextClick: this.nextMonth,
      onCalendarDateClick: this.setCalendarTempDate,
      onCalendarYearClick: this.setCalendarTempYear,
    };

    let picker;
    if(isOpen) {
      picker = React.createElement(component, pickerProps);
    }

    return (
      <div className="md-picker-container" ref="container">
        <TextField
          icon={icon}
          onClick={this.toggleOpen}
          label={label}
          floatingLabel={floatingLabel}
          value={typeof value === 'undefined' ? this.state.value : value}
          onChange={onChange}
        />
        {inline ?
          <TransitionGroup>
            {isOpen &&
              <Height transitionEnterTimeout={150} transitionLeaveTimeout={150}>
                {picker}
              </Height>
            }
          </TransitionGroup> :
          <Dialog isOpen={isOpen} close={this.close}>
            {isOpen && picker}
          </Dialog>
        }
      </div>
    );
  }
}
