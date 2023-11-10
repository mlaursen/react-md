import { DropdownMenu, MenuItem } from "@react-md/core";
import { type ReactElement } from "react";

export default function HorizontalMenuExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Dropdown" horizontal>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </DropdownMenu>
  );
}
