import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

const DEFAULT_DATE = new Date(2017, 3, 15, 0, 0, 0);
const TWO_MONTHS_BEFORE = new Date(DEFAULT_DATE);
TWO_MONTHS_BEFORE.setMonth(DEFAULT_DATE.getMonth() - 2);

const ONE_YEAR_AFTER = new Date(DEFAULT_DATE);
ONE_YEAR_AFTER.setYear(DEFAULT_DATE.getFullYear() + 1);

const AutoOkAndRangeExamples = () => (
  <div className="md-grid">
    <DatePicker
      id="date-picker-auto-ok"
      label="Auto OK"
      autoOk
      defaultValue={DEFAULT_DATE}
      minDate={TWO_MONTHS_BEFORE}
    />
    <DatePicker
      id="date-picker-min-max"
      label="Min and Max Dates"
      defaultValue={DEFAULT_DATE}
      minDate={TWO_MONTHS_BEFORE}
      maxDate={ONE_YEAR_AFTER}
    />
  </div>
);
export default AutoOkAndRangeExamples;
