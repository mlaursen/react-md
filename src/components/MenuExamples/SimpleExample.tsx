import { DropdownMenu, MenuItem } from "@react-md/core";
import type { ReactElement } from "react";

export function SimpleExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Options...">
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </DropdownMenu>
  );
}
