import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';
import DropdownMenu from 'react-md/lib/Menus/DropdownMenu';
import TextField from 'react-md/lib/TextFields';

import states from 'constants/states';
import vacationSpots from 'constants/vacationSpots';

const menuItems = states.map(({ name, abbreviation }) => ({ primaryText: name, secondaryText: abbreviation, key: name }));

const DropdownMenuExamples = () => (
  <div>
    <DropdownMenu
      id="avatar-dropdown-menu"
      menuItems={menuItems}
      anchor={{
        x: DropdownMenu.HorizontalAnchors.CENTER,
        y: DropdownMenu.VerticalAnchors.OVERLAP,
      }}
      position={DropdownMenu.Positions.TOP_LEFT}
      sameWidth
    >
      <AccessibleFakeButton
        component={IconSeparator}
        iconBefore
        label={
          <IconSeparator label="some.email@example.com">
            <FontIcon>arrow_drop_down</FontIcon>
          </IconSeparator>
        }
      >
        <Avatar random>S</Avatar>
      </AccessibleFakeButton>
    </DropdownMenu>
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
  </div>
);
export default DropdownMenuExamples;
