import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

// or
// import { DatePicker } from 'react-md/lib/Pickers';


const OrientationExamples = () => (
  <div>
    <DatePicker
      id="appointment"
      label="Select an appointment date"
      adjustMinWidth
    />
    <DatePicker
      id="appointmentPortrait"
      label="Portrait Mode"
      displayMode="portrait"
      adjustMinWidth
    />
    <DatePicker
      id="appointmentLandscape"
      label="Landscape Mode"
      displayMode="landscape"
      adjustMinWidth
    />
  </div>
);

export default OrientationExamples;
