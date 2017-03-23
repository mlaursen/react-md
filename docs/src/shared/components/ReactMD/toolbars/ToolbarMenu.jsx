import React from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';

const ToolbarMenu = (props) => (
  <MenuButton id="woop" icon {...props} menuItems={['Settings', 'Help', 'Feedback']}>
    more_vert
  </MenuButton>
);

export default ToolbarMenu;
