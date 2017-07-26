import React from 'react';
import PropTypes from 'prop-types';
import MenuButton from 'react-md/lib/Menus/MenuButton';

const KebabMenu = ({ id, className, menuItems }) => (
  <MenuButton
    id={id}
    icon
    className={className}
    menuItems={menuItems}
  >
    more_vert
  </MenuButton>
);

KebabMenu.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  menuItems: PropTypes.array,
};

KebabMenu.defaultProps = {
  menuItems: ['Settings', 'Help', 'Feedback'],
};

export default KebabMenu;
