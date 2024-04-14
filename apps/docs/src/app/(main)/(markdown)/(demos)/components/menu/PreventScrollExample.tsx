import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { type ReactElement } from "react";

export default function PreventScrollExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Options..." preventScroll>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </DropdownMenu>
  );
}
