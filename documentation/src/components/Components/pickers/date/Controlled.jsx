import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

export default class Controlled extends PureComponent {
  state = {
    value: null,
    visible: false,
  };

  componentWillUnmount() {
    this.clearTimeout();
  }

  clearTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = null;
  };

  reset = () => {
    this.setState({ value: null });
  };

  show = () => {
    this.clearTimeout();
    this.setState({ visible: true });
  };

  hideAfter3Seconds = () => {
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ visible: false });
    }, 3000);

    this.setState({ visible: true });
  };

  handleVisibilityChange = (visible) => {
    this.clearTimeout();
    this.setState({ visible });
  };

  handleChange = (value, dateValue, event) => { // eslint-disable-line no-unused-vars
    this.setState({ value });
  };

  render() {
    const { visible, value } = this.state;
    return (
      <div>
        <Button raised onClick={this.show}>
          Open the Picker
        </Button>
        <Button raised onClick={this.hideAfter3Seconds}>
          Open and close after 3 seconds
        </Button>
        <div className="md-grid">
          <DatePicker
            id="date-picker-controlled"
            label="Select date"
            visible={visible}
            value={value}
            className="md-cell"
            onChange={this.handleChange}
            onVisibilityChange={this.handleVisibilityChange}
          />
          <Button icon onClick={this.reset} type="reset" className="md-cell--bottom">
            close
          </Button>
        </div>
      </div>
    );
  }
}
