import React from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

// or
// import { TimePicker } from 'react-md/lib/Pickers';


const OrientationExamples = () => (
  <div className="md-grid">
    <TimePicker
      id="appointment"
      placeholder="Select an appointment time"
      className="md-cell md-cell--bottom"
    />
    <TimePicker
      id="appointmentPortrait"
      label="Portrait Mode"
      displayMode="portrait"
      className="md-cell"
    />
    <TimePicker
      id="appointmentLandscape"
      label="Landscape Mode"
      displayMode="landscape"
      className="md-cell"
    />
  </div>
);

export default OrientationExamples;
