import React from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

const OrientationExamples = () => (
  <div className="md-grid">
    <TimePicker
      id="appointment-time-auto"
      label="Select an appointment time"
      className="md-cell"
    />
    <TimePicker
      id="appointment-time-portrait"
      label="Portrait mode"
      className="md-cell"
      displayMode="portrait"
    />
    <TimePicker
      id="appointment-time-landscape"
      label="Landscape mode"
      className="md-cell"
      displayMode="landscape"
    />
  </div>
);
export default OrientationExamples;
