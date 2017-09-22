import React from 'react';
// import Divider from 'react-md/lib/Dividers';
import Subheader from 'react-md/lib/Subheaders';
import SelectField from 'react-md/lib/SelectFields';

const ITEMS_WITH_DISABLED = [...new Array(15)].map((_, i) => ({
  label: `Item ${i + 1}`,
  value: i,
  disabled: i === 3 || i === 4 || i === 9 || i === 13,
}));

const ITEMS_WITH_ELEMENTS = [
  <Subheader key="subheader-1" primaryText="Items 1 - 5" className="md-divider-border md-divider-border--bottom" />,
  'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
  <Subheader key="subheader-2" primaryText="Items 6 - 10" className="md-divider-border md-divider-border--bottom" />,
  'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
  <Subheader key="subheader-3" primaryText="Items 11 - 15" className="md-divider-border md-divider-border--bottom" />,
  'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15',
];

const ElementsAndDisabledItems = () => (
  <div className="md-grid">
    <SelectField
      id="select-field-with-disabled"
      label="Has Disabled Items"
      placeholder="Select something"
      menuItems={ITEMS_WITH_DISABLED}
      className="md-cell md-cell--6"
      sameWidth
    />
    <SelectField
      id="select-field-with-elements"
      label="Has Element Items"
      placeholder="Select something"
      menuItems={ITEMS_WITH_ELEMENTS}
      className="md-cell md-cell--6"
      sameWidth
    />
  </div>
);
export default ElementsAndDisabledItems;
