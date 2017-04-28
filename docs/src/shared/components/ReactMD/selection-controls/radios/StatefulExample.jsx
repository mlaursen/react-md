import React, { PureComponent } from 'react';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';

const controls = [{
  value: 'everything',
  label: 'I want to subscribe to everything!',
}, {
  value: 'lil',
  label: 'I want to subscribe to just a lil\' bit.',
}, {
  value: 'none',
  label: 'I do not want to subscribe.',
}];

export default class StatefulExample extends PureComponent {
  state = { value: controls[0].value };

  _handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <SelectionControlGroup
        id="subscription"
        name="subscriptions"
        type="radio"
        value={this.state.value}
        onChange={this._handleChange}
        controls={controls}
      />
    );
  }
}
