import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { type ReactElement } from "react";

export default function DisablePortalExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Options..." disablePortal>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </DropdownMenu>
  );
}
