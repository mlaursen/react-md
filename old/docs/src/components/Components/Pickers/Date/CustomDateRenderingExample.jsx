import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { DatePicker } from 'react-md';

import './CustomDateRenderingExample.scss';

@connect(state => ({ mobile: state.media.mobile }))
export default class CustomDateRenderingExample extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { visible: !props.mobile };
    const today = new Date();
    const eventDay = today.getDate() > 15 ? today.getDate() - 2 : today.getDate() + 2;
    this.eventDate = new Date(today.getFullYear(), today.getMonth(), eventDay);
  }

  componentWillReceiveProps(nextProps) {
    const { mobile } = nextProps;
    const { visible } = this.state;
    // make sure the date picker is visible on desktop and tablets and hidden when switching to
    // a mobile screen size
    if (mobile === this.props.mobile || visible !== mobile) {
      return;
    }

    this.setState({ visible: !mobile });
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

  handleVisibilityChange = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { mobile } = this.props;
    const { visible } = this.state;

    return (
      <DatePicker
        id="custom-date-rendering-date-picker"
        className="inline-fixed-date-picker"
        pickerFooterClassName={cn({ 'hidden-footer': !mobile })}
        textFieldStyle={!mobile ? { display: 'none' } : {}}
        displayMode="portrait"
        label="Select a date"
        visible={visible}
        inline={!mobile}
        closeYearOnSelect
        getDateClassName={this.getDateClassName}
        dateRenderer={this.dateRenderer}
        onVisibilityChange={this.handleVisibilityChange}
      />
    );
  }
}
