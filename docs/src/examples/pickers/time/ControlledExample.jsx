import React, { PureComponent, PropTypes } from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';
import { connect } from 'react-redux';
import { addToast, dismissToast } from 'actions/ui';

// or
// import { TimePicker } from 'react-md/lib/Pickers';

@connect(() => ({}), { addToast, dismissToast })
export default class ControlledExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formattedTime: '',
      time: null,
    };
  }

  static propTypes = {
    addToast: PropTypes.func.isRequired,
    dismissToast: PropTypes.func.isRequired,
  };

  componentWillUpdate(nextProps, nextState) {
    const { time, formattedTime } = this.state;

    // Don't add toast if the user hit Undo
    if (time !== nextState.time && !nextState.undo) {
      nextProps.addToast({
        text: `You have set your appointment time to ${nextState.formattedTime}.`,
        action: {
          label: 'Undo',
          onClick: () => {
            nextProps.dismissToast();
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
    console.log('UNDO');
    console.log('time:', time);
    this.setState({ time, formattedTime, undo: true });
  };

  render() {
    return (
      <TimePicker
        label="Select your appointment time"
        value={this.state.time}
        onChange={this._selectAppointment}
        fullWidth
      />
    );
  }
}
