import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

// or
// import { DatePicker } from 'react-md/lib/Pickers';


const OrientationExamples = () => (
  <div>
    <DatePicker
      label="Select an appointment date"
      floatingLabel={false}
      adjustMinWidth
    />
    <DatePicker
      label="Portrait Mode"
      displayMode="portrait"
      adjustMinWidth
    />
    <DatePicker
      label="Landscape Mode"
      displayMode="landscape"
      adjustMinWidth
    />
  </div>
);

export default OrientationExamples;
