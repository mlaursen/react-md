import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';

// Numbers, strings, and objects will not require `key` while components will.

const MenuButtonExampes = () => (
  <div className="menu-examples">
    <MenuButton
      id="menu-button-1"
      label="Toggle the Menu"
      raised
      secondary
      menuItems={['Item One', 'Item Two', 'Item Three', 'Item Four']}
    >
      chat
    </MenuButton>
    <MenuButton
      id="menu-button-2"
      label="Toggle the Menu"
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
    />
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

export default MenuButtonExampes;
