/* eslint-disable react/no-array-index-key, react/prop-types */
import React from 'react';
import {
  MenuButton,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  MenuButtonColumn,
} from 'react-md';

import AccountMenu from './DropdownMenuExamples/AccountMenu';

const items = ['Item One', 'Item Two', 'Item Three', 'Item Four'];

const xKeys = Object.keys(MenuButton.HorizontalAnchors);
const yKeys = Object.keys(MenuButton.VerticalAnchors);

const HEADER_CELLS = xKeys.map(key => <TableColumn key={key} adjusted={false}>{key}</TableColumn>);
HEADER_CELLS.unshift(<TableColumn key="y-title-placeholder" />);

// The MenuButtonColumn is the same as using the `MenuButton`, but it automatically
// sets some additional logic to "fix" itself to responsive data table scrolling.
const SmartMenuButton = ({ xKey, yKey }) => (
  <MenuButtonColumn
    adjusted={false}
    raised
    primary
    menuItems={items}
    simplifiedMenu={false}
    anchor={{
      x: MenuButton.HorizontalAnchors[xKey],
      y: MenuButton.VerticalAnchors[yKey],
    }}
    repositionOnScroll={false}
  >
    Click me
  </MenuButtonColumn>
);

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
    <h3 id="smart-menu-table-label">All smart menu positions</h3>
    <DataTable
      baseId="smart-menus"
      aria-labelledby="smart-menu-table-label"
      selectableRows={false}
      fullWidth={false}
    >
      <TableHeader>
        <TableRow>{HEADER_CELLS}</TableRow>
      </TableHeader>
      <TableBody>
        {yKeys.map(yKey => (
          <TableRow key={yKey}>
            {[
              <TableColumn header key="y-title" adjusted={false}>{yKey}</TableColumn>,
              ...xKeys.map(xKey => <SmartMenuButton key={xKey} xKey={xKey} yKey={yKey} />),
            ]}
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
  </div>
);
export default SmartPositioningMenus;
