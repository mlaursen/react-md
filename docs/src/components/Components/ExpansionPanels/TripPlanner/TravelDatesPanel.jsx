import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ExpansionPanel, DatePicker } from 'react-md';

const START_DATE = new Date(2016, 1, 29, 0, 0, 0);

const FORMAT_OPTIONS = {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
};

@connect(({ locale }) => ({ locale }))
export default class TravelDatesPanel extends PureComponent {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    dispatch: PropTypes.func,

    // Notice these three props. They are injected via the `ExpansionList` component
    // and are required to get correct styling and keyboard accessibility.
    focused: PropTypes.bool,
    overflown: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),
  };

  constructor(props) {
    super();

    this.formatter = Intl.DateTimeFormat(props.locale, FORMAT_OPTIONS);
    this.state = {
      startDate: START_DATE,
      endDate: null,
      tempStartDate: START_DATE,
      tempEndDate: null,
      minEndDate: this.addDays(START_DATE, 1),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.formatter = Intl.DateTimeFormat(nextProps.locale, FORMAT_OPTIONS);
    }
  }

  setStartDate = (formatted, tempStartDate) => {
    const minEndDate = this.addDays(tempStartDate, 1);

    let { tempEndDate } = this.state;
    if (tempEndDate && tempEndDate <= tempStartDate) {
      tempEndDate = minEndDate;
    }

    this.setState({
      minEndDate,
      tempStartDate,
      tempEndDate,
    });
  };

  setEndDate = (formatted, tempEndDate) => {
    this.setState({ tempEndDate });
  };

  save = () => {
    this.setState({
      startDate: this.state.tempStartDate,
      endDate: this.state.tempEndDate,
    });
  };

  cancel = () => {
    this.setState({
      tempStartDate: this.state.startDate,
      tempEndDate: this.state.endDate,
    });
  };

  addDays = (date, days) => {
    const added = new Date(date);
    added.setDate(added.getDate() + days);
    return added;
  };

  render() {
    const {
      startDate,
      endDate,
      tempStartDate,
      tempEndDate,
      minEndDate,
    } = this.state;

    const secondaryLabel = [
      `Start Date: ${this.formatter.format(startDate)}`,
      `End Date: ${endDate ? this.formatter.format(endDate) : 'Not set'}`,
    ];

    const {
      locale, // eslint-disable-line no-unused-vars
      dispatch, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return (
      <ExpansionPanel
        {...props}
        label="Start and end dates"
        secondaryLabel={secondaryLabel}
        onSave={this.save}
        onCancel={this.cancel}
      >
        <DatePicker
          id="travel-start-date"
          label="Start date"
          value={tempStartDate}
          onChange={this.setStartDate}
          className="md-cell md-cell--6 md-cell--tablet-8"
          formatOptions={FORMAT_OPTIONS}
        />
        <DatePicker
          id="travel-end-date"
          label="End date"
          value={tempEndDate}
          onChange={this.setEndDate}
          className="md-cell md-cell--6 md-cell--tablet-8"
          minDate={minEndDate}
          defaultCalendarDate={minEndDate}
        />
      </ExpansionPanel>
    );
  }
}
