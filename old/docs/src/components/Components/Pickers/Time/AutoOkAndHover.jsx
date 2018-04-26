import React from 'react';
import { TimePicker } from 'react-md';

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
    <TimePicker
      id="time-picker-show-seconds"
      placeholder="Select a time (with seconds)"
      className="md-cell md-cell--bottom"
      showSeconds
    />
  </div>
);

export default AutoOkAndHover;
