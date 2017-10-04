import React from 'react';
import { SelectionControl, Checkbox, Switch } from 'react-md';

const SimpleCheckboxesAndSwitches = () => (
  <div>
    <SelectionControl
      id="checkbox-read-documentation-page"
      name="simple-checkboxes[]"
      label="Open SelectionControl documentation page"
      type="checkbox"
      value="documentation"
      defaultChecked
    />
    <Checkbox
      id="checkbox-read-material-design-spec"
      name="simple-checkboxes[]"
      label="Read Material Design Specifications"
      value="material-design"
    />
    <SelectionControl
      id="checkbox-impossible"
      name="simple-checkboxes[]"
      label="Achieve 100% cross-browser compatibility"
      type="checkbox"
      value="impossible"
      disabled
    />
    <SelectionControl
      id="switch-lights"
      type="switch"
      label="Turn the lights on"
      name="lights"
      defaultChecked
    />
    <Switch
      id="switch-power"
      type="switch"
      label="Power outage"
      name="power"
      disabled
    />
  </div>
);
export default SimpleCheckboxesAndSwitches;
