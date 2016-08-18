import React from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

// or
// import { TimePicker } from 'react-md/lib/Pickers';


const OrientationExamples = () => (
  <div>
    <TimePicker
      label="Select an appointment time"
      floatingLabel={false}
      fullWidth
    />
    <TimePicker
      label="Portrait Mode"
      displayMode="portrait"
      fullWidth
    />
    <TimePicker
      label="Landscape Mode"
      displayMode="landscape"
      fullWidth
    />
  </div>
);

export default OrientationExamples;
