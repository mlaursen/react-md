import React from 'react';

import TimePicker from 'react-md/TimePickers';

export default function TimePickerExamples() {
  return (
    <div>
      <TimePicker label="Select a time" />
      <TimePicker label="Select a time" displayMode="portrait" />
      <TimePicker label="Select a time" autoOk={true} />
      <TimePicker label="Select a time" inline={true} />
      <TimePicker label="Select a time" inline={true} displayMode="portrait" />
      <TimePicker label="Select a time" inline={true} autoOk={true} />
    </div>
  );
}
