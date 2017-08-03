import React from 'react';
import DropdownMenu from 'react-md/lib/Menus/DropdownMenu';
import TextField from 'react-md/lib/TextFields';

import vacationSpots from 'constants/sampleData/vacationSpots';

const TextDropdown = () => (
  <DropdownMenu
    id="textfield-dropdown-menu"
    menuItems={vacationSpots}
    toggleQuery=".md-text-field-container"
    anchor={{
      x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
      y: DropdownMenu.VerticalAnchors.BOTTOM,
    }}
    position={DropdownMenu.Positions.BELOW}
  >
    <TextField
      id="dropdown-menu-textfield"
      label="Some text"
      placeholder="Vacation Spot"
    />
  </DropdownMenu>
);

export default TextDropdown;
