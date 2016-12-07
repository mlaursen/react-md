import React from 'react';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';
import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';

const BaseToolbarExample = (props) => <Toolbar {...props} />;

BaseToolbarExample.propTypes = Toolbar.propTypes;
BaseToolbarExample.defaultProps = {
  ...Toolbar.defaultProps,
  nav: <Button icon>menu</Button>,
  title: 'Page title',
  actions: [
    <Button icon key="search">search</Button>,
    <MenuButton key="menu" id="woop-woop" icon buttonChildren="more_vert">
      <ListItem primaryText="Settings" />
      <ListItem primaryText="Help" />
      <ListItem primaryText="Feedback" />
    </MenuButton>,
  ],
};

export default BaseToolbarExample;
