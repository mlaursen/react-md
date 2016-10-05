import React from 'react';
// import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

// or
import { TimePicker } from 'react-md/lib/Pickers';


const OrientationExamples = () => (
  <div>
    <TimePicker
      id="appointment"
      placeholder="Select an appointment time"
      adjustMinWidth
    />
    <TimePicker
      id="appointmentPortrait"
      label="Portrait Mode"
      displayMode="portrait"
      adjustMinWidth
    />
    <TimePicker
      id="appointmentLandscape"
      label="Landscape Mode"
      displayMode="landscape"
      adjustMinWidth
    />
  </div>
);

export default OrientationExamples;
