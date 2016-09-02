import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

// or
// import { DatePicker } from 'react-md/lib/Pickers';

const today = new Date();
const twoMonthsAgo = new Date(new Date().setMonth(today.getMonth() - 2));
const oneYearFuture = new Date(new Date().setYear(today.getFullYear() + 1));

const MinMaxExamples = () => (
  <div>
    <DatePicker
      id="autoOk"
      label="Auto OK"
      autoOk
      defaultValue={today}
      minDate={twoMonthsAgo}
    />
    <DatePicker
      id="minMaxDates"
      label="Min and max dates"
      minDate={twoMonthsAgo}
      maxDate={oneYearFuture}
    />
  </div>
);

export default MinMaxExamples;
