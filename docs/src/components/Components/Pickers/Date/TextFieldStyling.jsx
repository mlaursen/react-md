import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

const TextFieldStyling = () => (
  <div className="md-grid">
    <DatePicker
      id="date-picker-with-help-text"
      label="Select a date"
      helpText="This one has some helpful text!"
      className="md-cell"
    />
    <DatePicker
      id="date-picker-required"
      label="Select a date"
      required
      errorText="This is required!"
      className="md-cell"
    />
    <DatePicker
      id="date-picker-line-direction"
      label="Special line direction"
      lineDirection="center"
      error
      errorText="Constant error"
      className="md-cell"
    />
  </div>
);
export default TextFieldStyling;
