import React from 'react';
import SelectField from 'react-md/lib/SelectFields';

const NUMBER_ITEMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const STRING_ITEMS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const OBJECT_ITEMS = [{
  label: 'Apples',
  value: 'A',
}, {
  label: 'Bananas',
  value: 'B',
}, {
  label: 'Cherries',
  value: 'C',
}, {
  label: 'Durian',
  value: 'D',
}, {
  label: 'Elderberry',
  value: 'E',
}];

const Simple = () => (
  <div className="md-grid">
    <h4 className="md-cell md-cell--12">Normal SelectFields</h4>
    <SelectField
      id="select-field-1"
      label="Numbers"
      placeholder="Placeholder"
      className="md-cell"
      menuItems={NUMBER_ITEMS}
    />
    <SelectField
      id="select-field-2"
      label="Strings"
      placeholder="Placeholder"
      className="md-cell"
      menuItems={STRING_ITEMS}
    />
    <SelectField
      id="select-field-3"
      label="Objects"
      placeholder="Placeholder"
      className="md-cell"
      menuItems={OBJECT_ITEMS}
    />
    <h4 className="md-cell md-cell--12">SelectField Buttons</h4>
    <SelectField
      id="select-field-4"
      placeholder="Numbers button"
      className="md-cell"
      menuItems={NUMBER_ITEMS}
      position={SelectField.Positions.BELOW}
    />
    <SelectField
      id="select-field-5"
      placeholder="Strings button"
      className="md-cell"
      menuItems={STRING_ITEMS}
      position={SelectField.Positions.BELOW}
    />
    <SelectField
      id="select-field-6"
      placeholder="Objects button"
      className="md-cell"
      menuItems={OBJECT_ITEMS}
      position={SelectField.Positions.BELOW}
    />
  </div>
);

export default Simple;
