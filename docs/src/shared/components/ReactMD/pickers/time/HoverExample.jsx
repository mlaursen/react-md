import React from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

// or
// import { TimePicker } from 'react-md/lib/Pickers';


const HoverExample = () => (
  <div className="md-grid">
    <TimePicker
      id="appointment"
      placeholder="Select an appointment time"
      className="md-cell md-cell--bottom"
      hoverMode
    />
  </div>
);

export default HoverExample;
