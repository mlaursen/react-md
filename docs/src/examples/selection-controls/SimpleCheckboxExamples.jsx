import React from 'react';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
//
// or if you don't care about the inclusion of SelectonControlGroup
// import SelectionControl from 'react-md/lib/SelectionControls';

const SimpleCheckboxExamples = () => (
  <div>
    <SelectionControl
      id="readDocumentationPage"
      name="simpleCheckboxes[]"
      defaultChecked
      label="Open Checkbox Documentation Page"
      type="checkbox"
      value="docPage"
    />
    <SelectionControl
      id="readMDSpec"
      name="simpleCheckboxes[]"
      label="Read Material Design Specifications"
      type="checkbox"
      value="mdSpec"
    />
    <SelectionControl
      id="browserCompatibility"
      name="simpleCheckboxes[]"
      disabled
      label="Achieve 100% cross-browser compatibility"
      type="checkbox"
      value="compatibility"
    />
  </div>
);

export default SimpleCheckboxExamples;
