import React from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';

const KebabMenu = (props) => (
  <MenuButton id="woop" icon {...props} menuItems={['Buy', 'Listen', 'About']}>
    more_vert
  </MenuButton>
);

export default KebabMenu;
