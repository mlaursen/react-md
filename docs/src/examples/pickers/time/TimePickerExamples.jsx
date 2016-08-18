import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { TimePicker } from 'react-md/lib/Pickers';

import { addToast, dismissToast } from '../../../actions/docs';

/*eslint-env node*/
if(!global.Intl) {
  require.ensure([], require => {
    require('intl');
    require('intl/locale-data/jsonp/en-US');
    require('intl/locale-data/jsonp/da-DK');
  });
}

const todayAt1522 = new Date();
todayAt1522.setHours(15);
todayAt1522.setMinutes(22);

@connect(() => ({}), {
  addToast,
  dismissToast,
})
export default class TimePickerExamples extends Component {
  constructor(props) {
    super(props);

    this.state = { undo: false, time: null };
  }

  static propTypes = {
    addToast: PropTypes.func.isRequired,
    dismissToast: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUpdate(nextProps, nextState) {
    const { time } = this.state;
    if(time !== nextState.time && !nextState.undo) {
      nextProps.addToast({
        text: `You have set your appoitment time to ${nextState.formattedTime}`,
        action: {
          onClick: () => {
            this.props.dismissToast();
            this.undo(time);
          },
          label: 'Undo',
        },
      });
    }
  }

  undo = (time) => {
    this.setState({
      time,
      undo: true,
    });
  };

  handleTimeChange = (formattedTime, time) => {
    this.setState({ time, formattedTime, undo: false });
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
          <p>
            A time picker can be controlled as well. The <code>onChange</code> function will only
            be triggered when the user hits the OK button.
          </p>
          <TimePicker
            label="Select your appointment time"
            value={this.state.time}
            onChange={this.handleTimeChange}
          />
        </div>
      </div>
    );
  }
}
