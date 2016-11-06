import React, { PureComponent } from 'react';
import Switch from 'react-md/lib/SelectionControls/Switch';
// or
// import { Switch } from 'react-md/lib/SelectionControls';

export default class SimpleExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }

  _handleChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    const { checked } = this.state;

    return (
      <div>
        <Switch id="switch1" name="lights" label="Turn the lights on" defaultChecked />
        <Switch id="switch2" name="power" label="Power outage" disabled labelBefore />
        <Switch id="switch3" name="controlledSwitch" label="I am controlled" checked={checked} onChange={this._handleChange} />
      </div>
    );
  }
}
