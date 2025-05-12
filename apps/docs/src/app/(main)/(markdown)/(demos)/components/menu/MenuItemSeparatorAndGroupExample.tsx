import { useRadioGroup } from "@react-md/core/form/useRadioGroup";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { MenuItemGroup } from "@react-md/core/menu/MenuItemGroup";
import { MenuItemRadio } from "@react-md/core/menu/MenuItemRadio";
import { MenuItemSeparator } from "@react-md/core/menu/MenuItemSeparator";
import { type ReactElement } from "react";

export default function MenuItemSeparatorAndGroupExample(): ReactElement {
  const { getRadioProps } = useRadioGroup({
    menu: true,
  });

  return (
    <DropdownMenu buttonChildren="Dropdown" themeType="outline">
      <MenuItemGroup aria-label="Example Radio Group">
        <MenuItemRadio {...getRadioProps("a")}>Radio 1</MenuItemRadio>
        <MenuItemRadio {...getRadioProps("b")}>Radio 2</MenuItemRadio>
        <MenuItemRadio {...getRadioProps("c")}>Radio 3</MenuItemRadio>
      </MenuItemGroup>
      <MenuItemSeparator />
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <MenuItem>Menu Item 3</MenuItem>
    </DropdownMenu>
  );
}
