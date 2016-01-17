import React from 'react';
import { DatePicker } from 'react-md/Pickers';

export default function DatePickerExamples() {
  return (
    <div>
      <DatePicker label="Select a date" floatingLabel={false} />
      <DatePicker label="Potrait mode" mode="portrait" />
    </div>
  );
}
