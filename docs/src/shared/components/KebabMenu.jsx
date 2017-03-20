import React, { PropTypes } from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';

const KebabMenu = ({ items, ...props }) => (
  <MenuButton icon {...props} menuItems={items}>
    more_vert
  </MenuButton>
);

KebabMenu.propTypes = {
  items: PropTypes.array.isRequired,
};

KebabMenu.defaultProps = {
  items: ['Buy', 'Listen', 'About'],
};

export default KebabMenu;
