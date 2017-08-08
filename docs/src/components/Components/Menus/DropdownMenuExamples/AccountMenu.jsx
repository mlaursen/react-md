import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';
import DropdownMenu from 'react-md/lib/Menus/DropdownMenu';

const AccountMenu = () => (
  <DropdownMenu
    id="avatar-dropdown-menu"
    menuItems={['Preferences', 'About', { divider: true }, 'Log out']}
    anchor={{
      x: DropdownMenu.HorizontalAnchors.CENTER,
      y: DropdownMenu.VerticalAnchors.OVERLAP,
    }}
    position={DropdownMenu.Positions.TOP_LEFT}
    animationPosition="below"
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
      <Avatar suffix="pink">S</Avatar>
    </AccessibleFakeButton>
  </DropdownMenu>
);

export default AccountMenu;
