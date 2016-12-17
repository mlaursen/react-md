import React from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

// or
// import { TimePicker } from 'react-md/lib/Pickers';

const todayAt1522 = new Date();
todayAt1522.setHours(15);
todayAt1522.setMinutes(22);
const LocaleExamples = () => (
  <div className="md-grid">
    <TimePicker
      id="locale1"
      label="Select a date"
      locales="en-US"
      defaultValue={todayAt1522}
      className="md-cell"
    />
    <TimePicker
      id="locale2"
      label="Vælg en aftale dato"
      locales="da-DK"
      defaultValue={todayAt1522}
      className="md-cell"
    />
    <TimePicker
      id="locale3"
      label="Pretend Translate to Browser Locale"
      defaultValue={todayAt1522}
      className="md-cell"
    />
  </div>
);

export default LocaleExamples;
