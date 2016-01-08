import React from 'react';
import { Checkbox } from 'react-md/SelectionControls';

export default function CheckboxExamples() {
  return (
    <div>
      <Checkbox label="Default" />
      <Checkbox isInitiallyChecked={true} label="Initially Checked" />
      <Checkbox disabled label="Disabled" />
    </div>
  );
}
