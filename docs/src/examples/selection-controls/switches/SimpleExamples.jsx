import React, { PureComponent } from 'react';
import Switch from 'react-md/lib/SelectionControls/Switch';

// or
// import { Switch } from 'react-md/lib/SelectionControls';

export default class SimpleExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { toggled: false };
  }

  _handleChange = (toggled) => {
    this.setState({ toggled });
  };

  render() {
    const { toggled } = this.state;

    return (
      <div>
        <Switch />
        <Switch label="Turn the lights on" defaultToggled />
        <Switch label="Power outage" disabled labelBefore />
        <Switch label="I am controlled" toggled={toggled} onChange={this._handleChange} />
      </div>
    );
  }
}
