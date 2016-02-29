import React from 'react';

import TimePicker from 'react-md/lib/TimePickers';

const todayAt322 = new Date();
todayAt322.setHours(15);
todayAt322.setMinutes(22);

export default function TimePickerExamples() {
  return (
    <div>
      <TimePicker label="Select a time" />
      <TimePicker label="Select a time" displayMode="portrait" />
      <TimePicker label="Select a time" autoOk={true} defaultValue={todayAt322} />
      <TimePicker label="Vælg et tidspunkt" locales="da-DK" defaultValue={todayAt322} />
      <TimePicker label="Select a time" inline={true} />
      <TimePicker label="Select a time" inline={true} displayMode="portrait" />
      <TimePicker label="Select a time" inline={true} autoOk={true} />
    </div>
  );
}
