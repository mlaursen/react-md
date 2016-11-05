import React from 'react';
// import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

// or
import { TimePicker } from 'react-md/lib/Pickers';


const OrientationExamples = () => (
  <div>
    <TimePicker
      id="appointment"
      placeholder="Select an appointment time"
    />
    <TimePicker
      id="appointmentPortrait"
      label="Portrait Mode"
      displayMode="portrait"
    />
    <TimePicker
      id="appointmentLandscape"
      label="Landscape Mode"
      displayMode="landscape"
    />
  </div>
);

export default OrientationExamples;
