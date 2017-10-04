import React from 'react';
import { FontIcon, ListItem, MenuButton } from 'react-md';

const MenuButtonExamples = () => (
  <div className="menus__examples">
    <MenuButton
      id="menu-button-1"
      raised
      secondary
      menuItems={['Item One', 'Item Two', 'Item Three', 'Item Four']}
      iconChildren="chat"
    >
      Toggle the Menu
    </MenuButton>
    <MenuButton
      id="menu-button-2"
      anchor={{
        x: MenuButton.HorizontalAnchors.INNER_LEFT,
        y: MenuButton.VerticalAnchors.TOP,
      }}
      position={MenuButton.Positions.TOP_LEFT}
      flat
      primary
      menuItems={[{
        primaryText: 'Item One',
        rightIcon: <FontIcon>home</FontIcon>,
      }, {
        primaryText: 'Item Two',
      }, {
        primaryText: 'Item Three',
        secondaryText: 'Sub item three',
      }]}
    >
      Toggle the Menu
    </MenuButton>
    <MenuButton
      id="menu-button-2"
      icon
      menuItems={[
        <ListItem key={1} primaryText="Item One" />,
        <ListItem key={2} primaryText="Item Two" />,
      ]}
      listInline
      centered
      anchor={{
        x: MenuButton.HorizontalAnchors.CENTER,
        y: MenuButton.VerticalAnchors.CENTER,
      }}
    >
      more_vert
    </MenuButton>
  </div>
);

export default MenuButtonExamples;
