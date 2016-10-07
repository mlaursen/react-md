import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import ExpansionPanel from 'react-md/lib/ExpansionPanels';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

const formatOptions = {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
};
@connect(({ ui: { media: { tablet } } }) => ({ tablet }))
export default class TravelDatesPanel extends PureComponent {
  static propTypes = {
    // These two props get injected from `ExpansionList`. You need to
    // inject them into the `ExpansionPanel` to get correct styling and
    // keyboard accessibility
    focused: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number),

    tablet: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    const startDate = new Date(2016, 1, 29);
    this.state = {
      formattedStartDate: '',
      startDate,
      tempStartDate: startDate,
      formattedEndDate: 'Not set',
      endDate: null,
      minEndDate: this._addDay(startDate),
      tempEndDate: null,
    };
  }

  componentDidMount() {
    // Didn't want to include Server Side Rendering for this example,
    // so doing formatting after mount.
    this.setState({ formattedStartDate: this._format(this.state.startDate) }); // eslint-disable-line react/no-did-mount-set-state
  }

  componentWillUpdate(nextProps, { startDate, endDate }) {
    if (this.state.startDate !== startDate || this.state.endDate !== endDate) {
      this.setState({
        formattedStartDate: startDate ? this._format(startDate) : 'Not set',
        formattedEndDate: endDate ? this._format(endDate) : 'Not set',
      });
    }
  }

  _addDay(date, days = 1) {
    const added = new Date(date);
    added.setDate(added.getDate() + days);
    return added;
  }

  _format(date) {
    return Intl.DateTimeFormat(
      window.navigator.userLocale || window.navigator.language,
      formatOptions
    ).format(date);
  }

  _setStartDate = (formatted, tempStartDate) => {
    const state = { tempStartDate, minEndDate: this._addDay(tempStartDate) };

    const { tempEndDate } = this.state;
    if (tempEndDate && tempEndDate <= tempStartDate) {
      state.tempEndDate = state.minEndDate;
    }

    this.setState(state);
  };

  _setEndDate = (formatted, tempEndDate) => {
    this.setState({ tempEndDate });
  };

  _saveDates = () => {
    this.setState({ startDate: this.state.tempStartDate, endDate: this.state.tempEndDate });
  };

  render() {
    const { formattedStartDate, tempStartDate, formattedEndDate, tempEndDate, minEndDate } = this.state;
    const { columnWidths, focused, tablet } = this.props;

    let secondaryLabel;
    if (tablet) {
      secondaryLabel = [`Start Date: ${formattedStartDate}`, `End Date: ${formattedEndDate}`];
    }


    return (
      <ExpansionPanel
        focused={focused}
        columnWidths={columnWidths}
        label="Start and end dates"
        secondaryLabel={secondaryLabel}
        contentClassName="md-grid"
        onSave={this._saveDates}
        onCancel={this._resetDates}
      >
        <DatePicker
          id="travelStartDate"
          name="start"
          label="Start date"
          className="md-cell md-cell--6"
          value={tempStartDate}
          formatOptions={formatOptions}
          onChange={this._setStartDate}
        />
        <DatePicker
          id="travelEndDate"
          name="end"
          label="End date"
          value={tempEndDate}
          className="md-cell md-cell--6"
          formatOptions={formatOptions}
          onChange={this._setEndDate}
          minDate={minEndDate}
          initialCalendarDate={minEndDate}
        />
      </ExpansionPanel>
    );
  }
}
