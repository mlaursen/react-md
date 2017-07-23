import React, { PureComponent } from 'react';
import TextField from 'react-md/lib/TextFields';

export default class AutoResizing extends PureComponent {
  state = {
    value: 'This is some default text to place',
    max: 340,
  };

  setDiv = (div) => {
    this.div = div;
    this.setMaxWidth();
  };

  setMaxWidth = () => {
    // Make sure mobile devices don't overflow
    if (this.div) {
      this.setState({ max: Math.min(340, this.div.offsetWidth) });
    }
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { value, max } = this.state;
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12" ref={this.setDiv}>
          <TextField
            id="autoresizing-1"
            label="Floating resize"
            placeholder="Resize when typing"
            resize={{ max }}
          />
        </div>
        <div className="md-cell md-cell--12">
          <TextField
            id="autoresizing-2"
            label="Multiline text field"
            placeholder="Some placeholder"
            resize={{ min: 200, max }}
            rows={2}
            value={value}
            onChange={this.handleChange}
          />
        </div>
        <div className="md-cell md-cell--12">
          <TextField
            id="autoresizing-3"
            placeholder="Placeholder only resize"
            resize={{ max, disableShrink: true }}
            helpText="This field will not shrink"
          />
        </div>
      </div>
    );
  }
}
