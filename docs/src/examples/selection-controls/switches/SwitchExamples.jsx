import React, { PureComponent } from 'react';
import { Switch } from 'react-md/lib/SelectionControls';

export default class SwitchExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { toggled: false };
  }

  handleChange = (toggled, event) => { // eslint-disable-line no-unused-vars
    this.setState({ toggled });
  };

  render() {
    return (
      <div>
        <Switch />
        <Switch label="Turn the lights on" defaultToggled />
        <Switch label="Power outage" disabled />
        <Switch label="I am controlled" toggled={this.state.toggled} onChange={this.handleChange} />
      </div>
    );
  }
}
