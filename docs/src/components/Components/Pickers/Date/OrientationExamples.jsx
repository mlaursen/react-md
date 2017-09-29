import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

const OrientationExamples = () => (
  <div className="md-grid">
    <DatePicker
      id="appointment-date-auto"
      label="Select an appointment date"
      className="md-cell"
    />
    <DatePicker
      id="appointment-date-portrait"
      label="Portrait mode"
      className="md-cell"
      displayMode="portrait"
    />
    <DatePicker
      id="appointment-date-landscape"
      label="Landscape mode with defined first weekday and all days"
      className="md-cell"
      displayMode="landscape"
      firstDayOfWeek={1}
      showAllDays
    />
  </div>
);
export default OrientationExamples;
