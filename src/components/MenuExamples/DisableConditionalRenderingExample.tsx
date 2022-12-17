import { DropdownMenu, MenuItem } from "@react-md/menu";
import type { ReactElement } from "react";

export function DisableConditionalRenderingExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Options..." disablePortal temporary={false}>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </DropdownMenu>
  );
}
