import React from 'react';
import { DatePicker } from 'react-md/Pickers';

export default function DatePickerExamples() {
  return (
    <div>
      <DatePicker label="Select a date" floatingLabel={false} />
      <DatePicker label="Potrait mode" mode="portrait" />
      <DatePicker label="Auto Ok" autoOk={true} />
      <DatePicker
        label="Min and max dates"
        minDate={new Date(new Date().setMonth(new Date().getMonth() - 2))}
        maxDate={new Date(new Date().setYear(new Date().getFullYear() + 1))}
      />
    </div>
  );
}
