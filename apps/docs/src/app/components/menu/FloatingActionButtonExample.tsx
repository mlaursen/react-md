import { DropdownMenu, MenuItem } from "react-md";
import MoreVertOutlinedIcon from "@react-md/material-icons/MoreVertOutlinedIcon";
import { type ReactElement } from "react";

export default function FloatingActionButtonExample(): ReactElement {
  return (
    <>
      <DropdownMenu
        floating="top-left"
        buttonChildren={<MoreVertOutlinedIcon />}
      >
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </DropdownMenu>
      <DropdownMenu
        aria-label="Options"
        floating="top-right"
        buttonType="text"
        buttonChildren="Options"
      >
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </DropdownMenu>
    </>
  );
}
