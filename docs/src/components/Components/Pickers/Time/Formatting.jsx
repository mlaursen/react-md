import React from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

const DEFAULT_DATE = new Date(2017, 10, 22, 2, 22, 56, 330);
const FORMAT_OPTIONS = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'long',
};

const Formatting = () => (
  <div className="md-grid">
    <TimePicker
      id="time-picker-browser-locale"
      label="Browser locale"
      defaultValue={DEFAULT_DATE}
      className="md-cell"
    />
    <TimePicker
      id="time-picker-en-us-locale"
      label="en-US Locale"
      defaultValue={DEFAULT_DATE}
      locales="en-US"
      className="md-cell"
    />
    <TimePicker
      id="time-picker-da-dklocale"
      label="da-DK Locale"
      locales="da-DK"
      defaultValue={DEFAULT_DATE}
      className="md-cell"
      formatOptions={FORMAT_OPTIONS}
    />
    <TimePicker
      id="time-picker-custom-format"
      label="Custom format"
      defaultValue={DEFAULT_DATE}
      className="md-cell md-cell--12"
      formatOptions={FORMAT_OPTIONS}
    />
  </div>
);
export default Formatting;
