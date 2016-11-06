import React from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import ListItem from 'react-md/lib/Lists/ListItem';

const ToolbarMenu = (props) => (
  <MenuButton id="woop" buttonChildren="more_vert" icon {...props}>
    <ListItem primaryText="Settings" />
    <ListItem primaryText="Help" />
    <ListItem primaryText="Feedback" />
  </MenuButton>
);

export default ToolbarMenu;
