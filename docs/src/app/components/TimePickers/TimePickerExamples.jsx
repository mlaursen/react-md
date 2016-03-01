import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Snackbar from 'react-md/lib/Snackbars';
import TimePicker from 'react-md/lib/TimePickers';

import Markdown from '../../Markdown';

const todayAt1522 = new Date();
todayAt1522.setHours(15);
todayAt1522.setMinutes(22);

const controlledTimePickerMD = `
A time picker can be controlled as well. The \`onChange\` function will only
be triggered when the user hits the OK button.
`;

export default class TimePickerExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { toasts: [], undo: false, time: null };
  }

  static propTypes = {
    marked: PropTypes.func.isRequired,
  };

  componentWillUpdate(nextProps, nextState) {
    if(this.state.time !== nextState.time && !nextState.undo) {
      this.setState({
        toasts: nextState.toasts.concat([{
          text: `You have set your appointment time to ${nextState.formattedTime}`,
          action: {
            onClick: this.undo.bind(this, this.state.time),
            label: 'Undo',
          },
        }]),
      });
    }
  }

  undo = (time) => {
    this.setState({
      time,
      undo: true,
    });
  };

  handleTimeChange = (time, formattedTime) => {
    this.setState({ time, formattedTime, undo: false });
  };

  dismissToast = () => {
    const toasts = this.state.toasts.slice();
    toasts.shift();

    this.setState({ toasts });
  };

  render() {
    return (
      <div>
        <div>
          <p>
            Time pickers will attempt to follow the correct display mode of the current
            screen size through the media queries. You can also force a display mode if
            you want.
          </p>
          <TimePicker label="Select an appointment time" floatingLabel={false} />
          <TimePicker label="Portrait Mode" displayMode="portrait" />
          <TimePicker label="Landscape Mode" displayMode="landscape" />
        </div>
        <div>
          <p>
            Time pickers will also use the browser's locale by default to format the time.
            You can also manually force a locale.
          </p>
          <TimePicker label="Select a time" defaultValue={todayAt1522} />
          <TimePicker label="Vælg et tidspunkt" locales="da-DK" defaultValue={todayAt1522} />
        </div>
        <div>
          <p>You can also allow a time picker to appear inline if you desire</p>
          <TimePicker label="Select a time" inline={true} />
        </div>
        <div>
          <Markdown markdown={controlledTimePickerMD} marked={this.props.marked} />
          <TimePicker
            label="Select your appointment time"
            value={this.state.time}
            onChange={this.handleTimeChange}
          />
        </div>
        <Snackbar toasts={this.state.toasts} dismiss={this.dismissToast} />
      </div>
    );
  }
}
