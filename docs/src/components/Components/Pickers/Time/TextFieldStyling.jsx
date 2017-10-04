import React from 'react';
import { TimePicker } from 'react-md';

const TextFieldStyling = () => (
  <div className="md-grid">
    <TimePicker
      id="time-picker-with-help-text"
      label="Select a time"
      helpText="This one has some helpful text!"
      className="md-cell"
    />
    <TimePicker
      id="time-picker-required"
      label="Select a time"
      required
      errorText="This is required!"
      className="md-cell"
    />
    <TimePicker
      id="time-picker-line-direction"
      label="Special line direction"
      lineDirection="center"
      error
      errorText="Constant error"
      className="md-cell"
    />
  </div>
);
export default TextFieldStyling;
