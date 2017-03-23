import React from 'react';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';
import MenuButton from 'react-md/lib/Menus/MenuButton';

const BaseToolbarExample = (props) => <Toolbar {...props} />;

BaseToolbarExample.propTypes = Toolbar.propTypes;
BaseToolbarExample.defaultProps = {
  ...Toolbar.defaultProps,
  nav: <Button icon>menu</Button>,
  title: 'Page title',
  actions: [
    <Button icon key="search">search</Button>,
    <MenuButton key="menu" id="woop-woop" icon menuItems={['Settings', 'Help', 'Feedback']}>
      more_vert
    </MenuButton>,
  ],
};

export default BaseToolbarExample;
