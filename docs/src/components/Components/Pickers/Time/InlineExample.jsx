import React from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

const InlineExample = () => (
  <div>
    <TimePicker
      id="inline-time-picker-auto"
      label="Select a time"
      inline
      fullWidth={false}
    />
    <TimePicker
      id="inline-time-picker-portait"
      label="Select a time"
      inline
      displayMode="portrait"
      fullWidth={false}
    />
    <TimePicker
      id="inline-time-picker-portait"
      label="Select a time"
      inline
      displayMode="landscape"
      fullWidth={false}
    />
  </div>
);
export default InlineExample;
