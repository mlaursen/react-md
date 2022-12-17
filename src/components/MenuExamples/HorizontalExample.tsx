import { DropdownMenu, MenuItem } from "@react-md/menu";
import type { ReactElement } from "react";

export function HorizontalExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Options..." horizontal>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </DropdownMenu>
  );
}
