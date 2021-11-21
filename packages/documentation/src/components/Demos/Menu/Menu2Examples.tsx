/* eslint-disable */
import React, { ReactElement } from "react";
import { Divider } from "@react-md/divider";
import { useFileUpload } from "@react-md/form";
import { DropdownMenu, MenuItem } from "@react-md/menu2";

import { MenuItemFileInput } from "./MenuItemFileInput";
import { MenuItemTextField } from "./MenuItemTextField";

export default function Menu2Examples(): ReactElement | null {
  const { accept, onChange, stats } = useFileUpload({ maxFiles: 1 });
  console.log("stats:", stats);

  return (
    <DropdownMenu id="dropdown-menu-v2-api" buttonChildren="Toggle">
      <MenuItemTextField id="search-field" />
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <Divider />
      <MenuItem>Item 4</MenuItem>
      <MenuItem>Item 5</MenuItem>
      <MenuItemFileInput id="some-upload" accept={accept} onChange={onChange}>
        New Upload
      </MenuItemFileInput>
    </DropdownMenu>
  );
}
