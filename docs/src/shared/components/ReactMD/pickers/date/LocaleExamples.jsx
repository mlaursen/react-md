import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

// or
// import { DatePicker } from 'react-md/lib/Pickers';

const today = new Date();
const LocaleExamples = () => (
  <div className="md-grid no-padding">
    <DatePicker
      id="local-en-US"
      label="Select a date"
      locales="en-US"
      defaultValue={today}
      className="md-cell"
    />
    <DatePicker
      id="locale-da-DK"
      label="Vælg en aftale dato"
      locales="da-DK"
      defaultValue={today}
      className="md-cell"
    />
    <DatePicker
      id="localeBrowser"
      label="Pretend Translate to Browser Locale"
      defaultValue={today}
      className="md-cell"
    />
  </div>
);

export default LocaleExamples;
