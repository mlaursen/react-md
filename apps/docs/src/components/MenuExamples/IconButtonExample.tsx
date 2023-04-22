import { DropdownMenu, MenuItem } from "@react-md/core";
import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
import type { ReactElement } from "react";

export function IconButtonExample(): ReactElement {
  return (
    <DropdownMenu
      aria-label="Options"
      buttonType="icon"
      buttonChildren={<MoreVertIcon />}
    >
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </DropdownMenu>
  );
}
