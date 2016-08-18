import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

// or
// import { DatePicker } from 'react-md/lib/Pickers';


const OrientationExamples = () => (
  <div>
    <DatePicker
      label="Select an appointment date"
      floatingLabel={false}
      fullWidth
    />
    <DatePicker
      label="Portrait Mode"
      displayMode="portrait"
      fullWidth
    />
    <DatePicker
      label="Landscape Mode"
      displayMode="landscape"
      fullWidth
    />
  </div>
);

export default OrientationExamples;
