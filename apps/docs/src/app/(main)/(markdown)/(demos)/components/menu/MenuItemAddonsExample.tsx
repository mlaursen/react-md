import { Avatar } from "@react-md/core/avatar/Avatar";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
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
