import React from 'react';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
//
// or if you don't care about the inclusion of SelectonControlGroup
// import SelectionControl from 'react-md/lib/SelectionControls';

const SimpleSwitchExamples = () => (
  <div>
    <SelectionControl
      id="lights"
      type="switch"
      label="Turn the lights on"
      name="lights"
      defaultChecked
    />
    <SelectionControl
      type="switch"
      label="Power outage"
      id="power"
      name="power"
      disabled
    />
  </div>
);

export default SimpleSwitchExamples;
