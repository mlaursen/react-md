import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

// or
// import { DatePicker } from 'react-md/lib/Pickers';

const InlineExamples = () => (
  <div className="md-grid no-padding">
    <DatePicker
      id="inlineCenter"
      label="Select a date"
      inline
      lineDirection="center"
      className="md-cell"
    />
    <DatePicker
      id="customFormat"
      label="Custom Format Options"
      className="md-cell"
      formatOptions={{
        weekday: 'long',
        era: 'narrow',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'long',
      }}
    />
  </div>
);

export default InlineExamples;
