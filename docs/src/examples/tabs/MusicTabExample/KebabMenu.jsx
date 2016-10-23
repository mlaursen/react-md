import React from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import ListItem from 'react-md/lib/Lists/ListItem';

const KebabMenu = (props) => (
  <MenuButton buttonChildren="more_vert" icon {...props}>
    <ListItem primaryText="Buy" />
    <ListItem primaryText="Listen" />
    <ListItem primaryText="About" />
  </MenuButton>
);

export default KebabMenu;
