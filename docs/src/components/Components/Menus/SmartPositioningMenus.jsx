import React from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import AccountMenu from './DropdownMenuExamples/AccountMenu';

const items = ['Item One', 'Item Two', 'Item Three', 'Item Four'];

const SmartPositioningMenus = () => (
  <div className="menus__examples">
    <MenuButton
      id="smart-menu-button-1"
      raised
      secondary
      menuItems={items}
      simplifiedMenu={false}
    >
      Repositions on Scroll
    </MenuButton>
    <MenuButton
      id="smart-menu-button-1"
      primary
      raised
      menuItems={items}
      simplifiedMenu={false}
      repositionOnScroll={false}
    >
      Hides on Scroll
    </MenuButton>
    <AccountMenu simplifiedMenu={false} />
  </div>
);
export default SmartPositioningMenus;
