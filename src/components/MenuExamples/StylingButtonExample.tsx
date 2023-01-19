import { DropdownMenu, MenuItem } from "@react-md/core";
import type { ReactElement } from "react";

export function StylingButtonExample(): ReactElement {
  return (
    <DropdownMenu
      theme="primary"
      themeType="contained"
      buttonChildren={<>Content</>}
    >
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </DropdownMenu>
  );
}
