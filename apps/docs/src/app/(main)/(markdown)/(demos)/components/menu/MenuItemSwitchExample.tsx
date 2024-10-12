"use client";
import { MenuItemSwitch } from "@react-md/core/form/MenuItemSwitch";
import { useCheckboxGroup } from "@react-md/core/form/useCheckboxGroup";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { useState, type ReactElement } from "react";

export default function MenuItemSwitchExample(): ReactElement {
  const { getCheckboxProps } = useCheckboxGroup({ menu: true });
  const [checked, setChecked] = useState(false);

  return (
    <DropdownMenu buttonChildren="Dropdown" themeType="outline">
      <MenuItemSwitch
        checked={checked}
        onCheckedChange={(checked) => {
          setChecked(checked);
        }}
        preventMenuHideOnClick
      >
        Label
      </MenuItemSwitch>
      <MenuItemSwitch {...getCheckboxProps("0")}>Label</MenuItemSwitch>
      <MenuItemSwitch iconAfter {...getCheckboxProps("1")}>
        Label
      </MenuItemSwitch>
    </DropdownMenu>
  );
}
