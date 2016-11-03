import React, { PropTypes } from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import mapToListParts from 'react-md/lib/utils/mapToListParts';

const KebabMenu = ({ items, ...props }) => (
  <MenuButton buttonChildren="more_vert" icon {...props}>
    {items.map(mapToListParts)}
  </MenuButton>
);

KebabMenu.propTypes = {
  items: PropTypes.array.isRequired,
};

KebabMenu.defaultProps = {
  items: ['Buy', 'Listen', 'About'],
};

export default KebabMenu;
