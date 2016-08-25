import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

// or
// import { DatePicker } from 'react-md/lib/Pickers';

const InlineExamples = () => (
  <div>
    <DatePicker label="Select a date" inline fullWidth lineDirection="center" />
    <DatePicker
      label="Custom Format Options"
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
      adjustMinWidth
    />
  </div>
);

export default InlineExamples;
