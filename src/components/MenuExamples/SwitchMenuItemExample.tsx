import { MenuItemSwitch } from "@react-md/form";
import { DropdownMenu } from "@react-md/menu";
import type { ReactElement } from "react";
import { useState } from "react";

export function SwitchMenuItemExample(): ReactElement {
  const [checked, setChecked] = useState(false);
  return (
    <DropdownMenu buttonChildren="Dropdown" themeType="outline">
      <MenuItemSwitch
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked)}
      >
        Label
      </MenuItemSwitch>
      <MenuItemSwitch
        iconAfter
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked)}
      >
        Label
      </MenuItemSwitch>
      <MenuItemSwitch
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked)}
        preventMenuHideOnClick
      >
        Label
      </MenuItemSwitch>
    </DropdownMenu>
  );
}
