import React, { PureComponent, PropTypes } from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';
// or
// import { TimePicker } from 'react-md/lib/Pickers';

import { connect } from 'react-redux';
import { addNotification, dismissNotification } from 'actions/notifications';

@connect(() => ({}), { addNotification, dismissNotification })
export default class ControlledExample extends PureComponent {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
    dismissNotification: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      formattedTime: '',
      time: null,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { time, formattedTime } = this.state;

    // Don't add toast if the user hit Undo
    if (time !== nextState.time && !nextState.undo) {
      nextProps.addNotification({
        text: `You have set your appointment time to ${nextState.formattedTime}.`,
        action: {
          label: 'Undo',
          onClick: () => {
            nextProps.dismissNotification();
            this._undo(formattedTime, time);
          },
        },
      });
    }
  }

  _selectAppointment = (formattedTime, time) => {
    this.setState({ time, formattedTime, undo: false });
  };

  _undo = (formattedTime, time) => {
    this.setState({ time, formattedTime, undo: true });
  };

  render() {
    return (
      <TimePicker
        id="controlled"
        label="Select your appointment time"
        value={this.state.time}
        onChange={this._selectAppointment}
        className="md-cell"
      />
    );
  }
}
