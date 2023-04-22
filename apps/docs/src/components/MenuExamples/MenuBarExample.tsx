import { DropdownMenu, MenuBar, MenuItem } from "@react-md/core";
import type { ReactElement } from "react";
import { InfiniteDropdownMenu } from "./InfiniteDropdownMenu";

export function MenuBarExample(): ReactElement {
  return (
    <MenuBar>
      <DropdownMenu buttonChildren="Item 1">
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </DropdownMenu>
      <DropdownMenu buttonChildren="Item 2">
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </DropdownMenu>
      <DropdownMenu buttonChildren="Item 3">
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <InfiniteDropdownMenu buttonChildren="Menu Item 3" depth={0} />
        <MenuItem>Menu Item 4</MenuItem>
      </DropdownMenu>
      <DropdownMenu buttonChildren="Item 4">
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </DropdownMenu>
    </MenuBar>
  );
}
