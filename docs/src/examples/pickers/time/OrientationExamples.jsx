import React from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

// or
// import { TimePicker } from 'react-md/lib/Pickers';


const OrientationExamples = () => (
  <div>
    <TimePicker
      label="Select an appointment time"
      floatingLabel={false}
      adjustMinWidth
    />
    <TimePicker
      label="Portrait Mode"
      displayMode="portrait"
      adjustMinWidth
    />
    <TimePicker
      label="Landscape Mode"
      displayMode="landscape"
      adjustMinWidth
    />
  </div>
);

export default OrientationExamples;
