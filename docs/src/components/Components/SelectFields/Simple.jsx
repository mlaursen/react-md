import React from 'react';
import PropTypes from 'prop-types';
import { SVGIcon, SelectField } from 'react-md';

import arrowDropDown from 'icons/arrow_drop_down.svg';

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

const icon = <SVGIcon use={arrowDropDown.url} />;

function getActiveLabel({ activeLabel, activeIndex }) {
  return activeIndex > -1 ? `#${activeIndex + 1}: ${activeLabel}` : activeLabel;
}

const Simple = ({ simplifiedMenu }) => (
  <div className="md-grid">
    <h4 className="md-cell md-cell--12">Normal SelectFields</h4>
    <SelectField
      id="select-field-1"
      label="Numbers"
      placeholder="Placeholder"
      className="md-cell"
      menuItems={NUMBER_ITEMS}
      simplifiedMenu={simplifiedMenu}
    />
    <SelectField
      id="select-field-2"
      label="Strings"
      placeholder="Placeholder"
      className="md-cell"
      menuItems={STRING_ITEMS}
      simplifiedMenu={simplifiedMenu}
    />
    <SelectField
      id="select-field-3"
      label="Objects"
      placeholder="Placeholder"
      className="md-cell"
      menuItems={OBJECT_ITEMS}
      simplifiedMenu={simplifiedMenu}
    />
    <h4 className="md-cell md-cell--12">SelectField Buttons</h4>
    <SelectField
      id="select-field-4"
      placeholder="Numbers button"
      className="md-cell"
      menuItems={NUMBER_ITEMS}
      position={SelectField.Positions.BELOW}
      simplifiedMenu={simplifiedMenu}
    />
    <SelectField
      id="select-field-5"
      placeholder="Strings button"
      className="md-cell"
      menuItems={STRING_ITEMS}
      position={SelectField.Positions.BELOW}
      simplifiedMenu={simplifiedMenu}
    />
    <SelectField
      id="select-field-6"
      placeholder="Objects button"
      className="md-cell"
      menuItems={OBJECT_ITEMS}
      position={SelectField.Positions.BELOW}
      simplifiedMenu={simplifiedMenu}
    />
    <h4 className="md-cell md-cell--12">Using SVGIcons</h4>
    <SelectField
      id="select-field-7"
      label="Numbers"
      placeholder="Placeholder"
      className="md-cell md-cell--bottom"
      menuItems={NUMBER_ITEMS}
      dropdownIcon={icon}
      simplifiedMenu={simplifiedMenu}
    />
    <SelectField
      id="select-field-8"
      placeholder="Strings button"
      className="md-cell md-cell--bottom"
      menuItems={STRING_ITEMS}
      position={SelectField.Positions.BELOW}
      dropdownIcon={icon}
      simplifiedMenu={simplifiedMenu}
    />
    <SelectField
      id="select-field-9"
      placeholder="Strings disabled"
      className="md-cell md-cell--bottom"
      menuItems={STRING_ITEMS}
      getActiveLabel={getActiveLabel}
      disabled
      dropdownIcon={icon}
      simplifiedMenu={simplifiedMenu}
    />
  </div>
);

Simple.propTypes = {
  simplifiedMenu: PropTypes.bool,
};

export default Simple;
