import React from 'react';
import DatePicker from 'react-md/DatePickers';

export default function DatePickerExamples() {
  const twoMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 2));
  const oneYearFuture = new Date(new Date().setYear(new Date().getFullYear() + 1));

  return (
    <div>
      <DatePicker label="Select a date" floatingLabel={false} />
      <DatePicker label="Potrait mode" mode="portrait" />
      <DatePicker label="Auto Ok" autoOk={true} defaultValue={new Date()} />
      <DatePicker
        label="Min and max dates"
        minDate={twoMonthsAgo}
        maxDate={oneYearFuture}
      />
      <DatePicker inline={true} label="Inline" floatingLabel={false} />
      <DatePicker inline={true} label="Inline portrait" mode="portrait" floatingLabel={false} />
    </div>
  );
}
