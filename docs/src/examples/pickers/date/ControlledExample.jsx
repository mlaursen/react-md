import React, { PureComponent, PropTypes } from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import { connect } from 'react-redux';
import { addToast, dismissToast } from 'actions/ui';

// or
// import { DatePicker } from 'react-md/lib/Pickers';

@connect(() => ({}), { addToast, dismissToast })
export default class ControlledExample extends PureComponent {
  static propTypes = {
    addToast: PropTypes.func.isRequired,
    dismissToast: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      formattedDate: '',
      date: null,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { date, formattedDate } = this.state;

    // Don't add toast if the user hit Undo
    if (date !== nextState.date && !nextState.undo) {
      nextProps.addToast({
        text: `You have set your appointment date to ${nextState.formattedDate}.`,
        action: {
          label: 'Undo',
          onClick: () => {
            nextProps.dismissToast();
            this._undo(formattedDate, date);
          },
        },
      });
    }
  }

  _selectAppointment = (formattedDate, date) => {
    this.setState({ date, formattedDate, undo: false });
  };

  _undo = (formattedDate, date) => {
    this.setState({ date, formattedDate, undo: true });
  };

  render() {
    return (
      <DatePicker
        id="controlledAppointment"
        label="Select your appointment date"
        value={this.state.date}
        onChange={this._selectAppointment}
        fullWidth
      />
    );
  }
}
