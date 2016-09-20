import React, { PureComponent } from 'react';
import SelectField from 'react-md/lib/SelectFields';
import states from 'constants/states';

export default class SelectFieldButtonExamples extends PureComponent {
  render() {
    return (
      <div>
        <SelectField
          id="selectButtonStates"
          placeholder="State"
          menuItems={states}
          itemLabel="abbreviation"
          position={SelectField.Positions.BELOW}
        />
        <SelectField
          id="selectButtonNumbers"
          placeholder="Number"
          position={SelectField.Positions.BELOW}
          menuItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        />
        <p>
          Make sure to use the select field button version of the select field
          inside of a toolar or a table for correct styling.
        </p>
      </div>
    );
  }
}
