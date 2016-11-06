import React, { PureComponent, PropTypes } from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import { connect } from 'react-redux';
import { addNotification, dismissNotification } from 'actions/notifications';

// or
// import { DatePicker } from 'react-md/lib/Pickers';

@connect(() => ({}), { addNotification, dismissNotification })
export default class ControlledExample extends PureComponent {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
    dismissNotification: PropTypes.func.isRequired,
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
      nextProps.addNotification({
        text: `You have set your appointment date to ${nextState.formattedDate}.`,
        action: {
          label: 'Undo',
          onClick: () => {
            nextProps.dismissNotification();
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
      />
    );
  }
}
