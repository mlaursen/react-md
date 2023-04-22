import { DropdownMenu, MenuItem } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import PlayArrowIcon from "@react-md/material-icons/PlayArrowIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import type { ReactElement } from "react";

export function MenuItemAddonExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Options...">
      <MenuItem leftAddon={<FavoriteIcon />}>Item 1</MenuItem>
      <MenuItem leftAddon={<StarIcon />}>Item 2</MenuItem>
      <MenuItem rightAddon={<PlayArrowIcon />}>Item 3</MenuItem>
    </DropdownMenu>
  );
}
