import { DropdownMenu, MenuItem } from "react-md";
import MoreVertOutlinedIcon from "@react-md/material-icons/MoreVertOutlinedIcon";
import { type ReactElement } from "react";

export default function ButtonStyling(): ReactElement {
  return (
    <>
      <DropdownMenu
        theme="primary"
        themeType="outline"
        buttonChildren="Options..."
      >
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </DropdownMenu>
      <DropdownMenu
        theme="secondary"
        themeType="contained"
        iconSize="small"
        buttonType="icon"
        buttonChildren={<MoreVertOutlinedIcon />}
      >
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </DropdownMenu>
    </>
  );
}
