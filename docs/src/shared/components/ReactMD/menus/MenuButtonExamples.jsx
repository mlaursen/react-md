import React from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import ListItem from 'react-md/lib/Lists/ListItem';

const styles = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const MenuButtonExamples = () => (
  <div style={styles}>
    <MenuButton
      id="button-menu"
      label="Toggle Open a Menu"
      raised
      buttonChildren="chat"
      className="menu-example"
    >
      <ListItem primaryText="Item One" />
      <ListItem primaryText="Item Two" />
      <ListItem primaryText="Item Three" />
      <ListItem primaryText="Item Four" />
    </MenuButton>
    <MenuButton
      id="vert-menu"
      icon
      buttonChildren="more_vert"
      className="menu-example"
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
