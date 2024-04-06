import { Avatar, DropdownMenu, MenuItem } from "react-md";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function MenuItemAddonsExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Dropdown">
      <MenuItem leftAddon={<FavoriteIcon />}>Item 1</MenuItem>
      <MenuItem rightAddon={<Avatar>I</Avatar>} rightAddonType="avatar">
        Item 1
      </MenuItem>
    </DropdownMenu>
  );
}
