import React from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

const AutoOkAndHover = () => (
  <div className="md-grid">
    <TimePicker
      id="time-picker-auto-ok"
      placeholder="Select an appointment time"
      className="md-cell md-cell--bottom"
      autoOk
    />
    <TimePicker
      id="time-picker-hover-mode"
      placeholder="Select an appointment time"
      className="md-cell md-cell--bottom"
      hoverMode
    />
  </div>
);

export default AutoOkAndHover;
