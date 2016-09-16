import React from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import ListItem from 'react-md/lib/Lists/ListItem';

const MenuButtonExamples = () => (
  <div>
    <MenuButton
      label="Toggle Open a Menu"
      raised
      buttonChildren="chat"
      menuClassName="menu-example"
    >
      <ListItem primaryText="Item One" />
      <ListItem primaryText="Item Two" />
      <ListItem primaryText="Item Three" />
      <ListItem primaryText="Item Four" />
    </MenuButton>
    <MenuButton
      icon
      buttonChildren="more_vert"
      menuClassName="menu-example"
      tooltipLabel="Open some menu"
    >
      <ListItem primaryText="Item One" />
      <ListItem primaryText="Item Two" />
      <ListItem primaryText="Item Three" />
      <ListItem primaryText="Item Four" />
    </MenuButton>
  </div>
);

export default MenuButtonExamples;
