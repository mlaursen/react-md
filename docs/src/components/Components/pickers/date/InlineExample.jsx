import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

const InlineExample = () => (
  <div>
    <DatePicker
      id="inline-date-picker-auto"
      label="Select a date"
      inline
      fullWidth={false}
    />
    <DatePicker
      id="inline-date-picker-portait"
      label="Select a date"
      inline
      displayMode="portrait"
      fullWidth={false}
    />
    <DatePicker
      id="inline-date-picker-portait"
      label="Select a date"
      inline
      displayMode="landscape"
      fullWidth={false}
    />
  </div>
);
export default InlineExample;
