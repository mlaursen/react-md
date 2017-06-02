import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

export default class FullyControlledExample extends PureComponent {
  state = { value: null, visible: false };

  _reset = () => {
    this.setState({ value: null });
  };

  _openPicker = () => {
    this.setState({ visible: true });
  };

  _handleChange = (value) => {
    this.setState({ value });
  };

  _handleVisibilityChange = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { value, visible } = this.state;
    return (
      <div>
        <Button raised onClick={this._openPicker}>Open the Picker</Button>
        <div className="md-grid">
          <DatePicker
            id="fully-controlled"
            label="Select some date"
            className="md-cell"
            visible={visible}
            value={value}
            onChange={this._handleChange}
            onVisibilityChange={this._handleVisibilityChange}
          />
          <Button icon onClick={this._reset} className="md-cell--bottom">close</Button>
        </div>
      </div>
    );
  }
}
