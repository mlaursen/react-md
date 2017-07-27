import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

const DEFAULT_DATE = new Date(2017, 10, 22, 0, 0, 0);
const FORMAT_OPTIONS = {
  weekday: 'long',
  era: 'narrow',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'long',
};

const Formatting = () => (
  <div className="md-grid">
    <DatePicker
      id="date-picker-browser-locale"
      label="Browser locale"
      defaultValue={DEFAULT_DATE}
      className="md-cell"
    />
    <DatePicker
      id="date-picker-en-us-locale"
      label="en-US Locale"
      defaultValue={DEFAULT_DATE}
      locales="en-US"
      className="md-cell"
    />
    <DatePicker
      id="date-picker-da-dklocale"
      label="da-DK Locale"
      locales="da-DK"
      defaultValue={DEFAULT_DATE}
      className="md-cell"
    />
    <DatePicker
      id="date-picker-custom-format"
      label="Custom format"
      defaultValue={DEFAULT_DATE}
      className="md-cell md-cell--12"
      formatOptions={FORMAT_OPTIONS}
    />
  </div>
);
export default Formatting;
