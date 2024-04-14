import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuConfigurationProvider } from "@react-md/core/menu/MenuConfigurationProvider";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { type ReactElement } from "react";

export default function RenderingInASheet(): ReactElement {
  return (
    <>
      <MenuConfigurationProvider
        renderAsSheet
        // renderAsSheet={false}
        // renderAsSheet="phone"
      >
        <DropdownMenu buttonChildren="Dropdown">
          <MenuItem disabled>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
          <MenuItem>Item 4</MenuItem>
          <MenuItem>Item 5</MenuItem>
        </DropdownMenu>
      </MenuConfigurationProvider>
    </>
  );
}
