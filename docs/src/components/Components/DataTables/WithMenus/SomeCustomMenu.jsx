import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-md/lib/Avatars';
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';
import DropdownMenuColumn from 'react-md/lib/DataTables/DropdownMenuColumn';
import SVGIcon from 'react-md/lib/SVGIcons';

import arrow from 'icons/arrow_drop_down.svg';

const SomeCustomMenu = ({ id, suffix, letter }) => (
  <DropdownMenuColumn
    id={`purcahse-type-menu-${id}`}
    menuItems={['Preferences', 'About', { divider: true }, 'Log out']}
    anchor={{
      x: DropdownMenuColumn.HorizontalAnchors.CENTER,
      y: DropdownMenuColumn.VerticalAnchors.OVERLAP,
    }}
    position={DropdownMenuColumn.Positions.TOP_LEFT}
    animationPosition="below"
    sameWidth
  >
    <AccessibleFakeButton
      component={IconSeparator}
      iconBefore
      label={
        <IconSeparator label="Some Custom Menu">
          <SVGIcon use={arrow.url} />
        </IconSeparator>
      }
    >
      <Avatar suffix={suffix}>{letter}</Avatar>
    </AccessibleFakeButton>
  </DropdownMenuColumn>
);

SomeCustomMenu.propTypes = {
  id: PropTypes.number.isRequired,
  suffix: PropTypes.string.isRequired,
  letter: PropTypes.string.isRequired,
};

export default SomeCustomMenu;
