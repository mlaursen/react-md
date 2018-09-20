import React, { PureComponent } from 'react';
import { DatePicker } from 'react-md';
import './CustomDateRenderingExample.scss';

export default class CustomDateRenderingExample extends PureComponent {

  componentWillMount() {
    const today = new Date();
    const eventDay = today.getDate() > 15 ? today.getDate() - 2 : today.getDate() + 2;
    this.eventDate = new Date(today.getFullYear(), today.getMonth(), eventDay);
  }

  getDateClassName = (date) => {
    const isMonday = date.getDay() === 1;
    if (this.isEventDate(date)) {
      return 'day-with-events';
    } else if (isMonday) {
      return 'monday';
    }
    return null;
  };

  isEventDate = date =>
    date.getFullYear() === this.eventDate.getFullYear()
    && date.getMonth() === this.eventDate.getMonth()
    && date.getDate() === this.eventDate.getDate();

  dateRenderer = (date, day) => {
    if (this.isEventDate(date)) {
      return <span>{day}<sub>{5}</sub></span>;
    }
    return <span>{day}</span>;
  };

  render() {
    return (
      <DatePicker
        className="inline-fixed-date-picker"
        id="custom-date-rendering-date-picker"
        pickerFooterClassName="hidden-footer"
        displayMode="portrait"
        label="Select a date"
        textFieldStyle={{ display: 'none' }}
        defaultVisible
        inline
        closeYearOnSelect
        getDateClassName={this.getDateClassName}
        dateRenderer={this.dateRenderer}
      />
    );
  }
}
