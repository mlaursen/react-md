import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import moment from 'moment';

import TextField from '../TextFields';
import FontIcon from '../FontIcons';

import CalendarDialog from './CalendarDialog';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isOpen: false,
      value: props.defaultValue,
      currentMonth: moment(props.defaultValue),
      tempValue: moment(props.defaultValue),
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
  };

  static defaultProps = {
    calendarIcon: <FontIcon>date_range</FontIcon>,
    cancelLabel: 'Cancel',
    okLabel: 'Ok',
    previousIcon: <FontIcon>chevron_left</FontIcon>,
    nextIcon: <FontIcon>chevron_right</FontIcon>,
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  setDate = () => {
    this.setState({ value: this.state.tempValue.toDate(), isOpen: false });
  };

  setTempDate = (tempValue) => {
    this.setState({ tempValue });
  };

  switchMode = (mode) => {
    this.setState({ mode });
  };

  previousMonth = () => {
    this.setState({ currentMonth: this.state.currentMonth.clone().subtract(1, 'M'), slideDir: 'left' });
  };

  nextMonth = () => {
    this.setState({ currentMonth: this.state.currentMonth.clone().add(1, 'M'), slideDir: 'right' });
  };

  render() {
    const { calendarIcon, label, floatingLabel, mode, ...props } = this.props;
    const value = this.state.value && moment(this.state.value).format('MM/DD/YYYY');
    return (
      <div className="md-date-picker-container">
        <TextField
          icon={calendarIcon}
          onClick={() => this.setState({ isOpen: true })}
          label={label}
          floatingLabel={floatingLabel}
          value={value}
        />
        <CalendarDialog
          isOpen={this.state.isOpen}
          close={this.close}
          selectedDate={this.state.tempValue}
          currentMonth={this.state.currentMonth}
          selectDate={this.setDate}
          onCalendarDateClick={this.setTempDate}
          mode={this.state.mode}
          onDateClick={this.switchMode.bind(this, 'date')}
          onYearClick={this.switchMode.bind(this, 'year')}
          previousMonth={this.previousMonth}
          nextMonth={this.nextMonth}
          slideDir={this.state.slideDir}
          className={classnames({ 'landscape': mode === 'landscape', 'portrait': mode === 'portrait' })}
          {...props}
        />
      </div>
    );
  }
}
