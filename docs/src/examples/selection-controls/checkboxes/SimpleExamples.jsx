import React from 'react';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

const SimpleExamples = () => (
  <div>
    <Checkbox
      id="readDocumentationPage"
      name="simpleCheckboxes"
      defaultChecked
      label="Open Checkbox Documentation Page"
    />
    <Checkbox
      id="readMDSpec"
      name="simpleCheckboxes"
      label="Read Material Design Specifications"
    />
    <Checkbox
      id="browserCompatibility"
      name="simpleCheckboxes"
      disabled
      label="Achieve 100% cross-browser compatibility"
    />
  </div>
);

export default SimpleExamples;
