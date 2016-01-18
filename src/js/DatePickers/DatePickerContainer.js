import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import TextField from '../TextFields';
import FontIcon from '../FontIcons';

import { ESC } from '../constants/keyCodes';
import { addDate, subtractDate, formatDate } from '../utils';
import CalendarDialog from './CalendarDialog';
import CalendarInline from './CalendarInline';

export default class DatePickerContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isOpen: false,
      value: props.defaultValue,
      currentMonth: props.defaultValue ? new Date(props.defaultValue) : new Date(),
      tempValue: props.defaultValue ? new Date(props.defaultValue) : new Date(),
      mode: 'date',
      slideDir: 'left',
    };
  }

  static propTypes = {
    className: PropTypes.string,
    calendarIcon: PropTypes.node.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    okLabel: PropTypes.string.isRequired,
    label: PropTypes.string,
    floatingLabel: PropTypes.bool,
    defaultValue: PropTypes.instanceOf(Date),
    previousIcon: PropTypes.node.isRequired,
    nextIcon: PropTypes.node.isRequired,
    mode: PropTypes.oneOf(['landscape', 'portrait']),
    inline: PropTypes.bool,
    autoOk: PropTypes.bool,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    initialYearsDisplayed: PropTypes.number,
    formatDate: PropTypes.func.isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    calendarIcon: <FontIcon>date_range</FontIcon>,
    cancelLabel: 'Cancel',
    okLabel: 'Ok',
    previousIcon: <FontIcon>chevron_left</FontIcon>,
    nextIcon: <FontIcon>chevron_right</FontIcon>,
    initialYearsDisplayed: 50,
    formatDate: formatDate,
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

  close = () => {
    this.setState({ isOpen: false });
  };

  setDate = () => {
    this.setState({ value: this.state.tempValue, isOpen: false });
  };

  setTempDate = (tempValue) => {
    if(this.props.autoOk) {
      this.setState({ value: tempValue, isOpen: false });
    } else {
      this.setState({ tempValue });
    }
  };

  setTempYear = (tempYear) => {
    const { tempValue, currentMonth } = this.state;
    if(tempValue.getFullYear() === tempYear) { return; }
    const { minDate, maxDate } = this.props;
    let nextTemp = new Date(tempValue.setFullYear(tempYear));
    let nextCurr = new Date(currentMonth.setFullYear(tempYear));

    if(minDate && nextTemp < minDate) {
      nextTemp = new Date(minDate);
      nextCurr = new Date(minDate);
    }

    if(maxDate && nextTemp > maxDate) {
      nextTemp = new Date(maxDate);
      nextCurr = new Date(maxDate);
    }

    this.setState({
      tempValue: nextTemp,
      currentMonth: nextCurr,
    });
  };

  switchMode = (mode) => {
    this.setState({ mode });
  };

  previousMonth = () => {
    const currentMonth = subtractDate(this.state.currentMonth, 1, 'M');
    this.setState({ currentMonth, slideDir: 'left' });
  };

  nextMonth = () => {
    const currentMonth = addDate(this.state.currentMonth, 1, 'M');
    this.setState({ currentMonth, slideDir: 'right' });
  };

  render() {
    const { calendarIcon, label, className, onChange, floatingLabel, formatDate, inline, mode, ...props } = this.props;
    const value = this.state.value && formatDate(this.state.value);

    const datePickerProps = {
      isOpen: this.state.isOpen,
      close: this.close,
      className: classnames(className, {
        'landscape': mode === 'landscape',
        'portrait': mode === 'portrait',
        'inline': inline,
      }),
      onPreviousClick: this.previousMonth,
      onNextClick: this.nextMonth,
      onCancelClick: this.close,
      onOkClick: this.setDate,
      selectedDate: this.state.tempValue,
      currentMonth: this.state.currentMonth,
      onCalendarDateClick: this.setTempDate,
      onCalendarYearClick: this.setTempYear,
      mode: this.state.mode,
      onDateClick: this.switchMode.bind(this, 'date'),
      onYearClick: this.switchMode.bind(this, 'year'),
      slideDir: this.state.slideDir,
      formatDate,
      ...props,
    };
    return (
      <div className="md-date-picker-container" ref="container">
        <TextField
          icon={calendarIcon}
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          label={label}
          floatingLabel={floatingLabel}
          value={value}
          onChange={onChange}
        />
        {inline ?
          <CalendarInline {...datePickerProps} /> :
          <CalendarDialog {...datePickerProps} />
        }
      </div>
    );
  }
}
