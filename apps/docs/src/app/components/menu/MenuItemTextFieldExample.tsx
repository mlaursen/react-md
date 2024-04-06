import {
  DropdownMenu,
  MenuItem,
  MenuItemSeparator,
  MenuItemTextField,
} from "react-md";
import SearchIcon from "@react-md/material-icons/SearchIcon";
import { type ReactElement } from "react";

export default function MenuItemTextFieldExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Dropdown" themeType="outline">
      <MenuItemTextField
        aria-label="Search"
        placeholder="Search"
        rightAddon={<SearchIcon />}
      />
      <MenuItemSeparator />
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </DropdownMenu>
  );
}
