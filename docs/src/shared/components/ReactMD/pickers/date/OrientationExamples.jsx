import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

// or
// import { DatePicker } from 'react-md/lib/Pickers';


const OrientationExamples = () => (
  <div className="md-grid" style={{ padding: 0 }}>
    <DatePicker
      id="appointment"
      label="Select an appointment date"
      className="md-cell"
    />
    <DatePicker
      id="appointmentPortrait"
      label="Portrait Mode"
      displayMode="portrait"
      className="md-cell"
    />
    <DatePicker
      id="appointmentLandscape"
      label="Landscape Mode"
      displayMode="landscape"
      className="md-cell"
    />
  </div>
);

export default OrientationExamples;
