import { Avatar } from "@react-md/core/avatar/Avatar";
import { useCheckboxGroup } from "@react-md/core/form/useCheckboxGroup";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItemCheckbox } from "@react-md/core/menu/MenuItemCheckbox";
import { MenuItemRadio } from "@react-md/core/menu/MenuItemRadio";
import { MenuItemSwitch } from "@react-md/core/menu/MenuItemSwitch";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function FormMenuItemWithAddonsExample(): ReactElement {
  const { getCheckboxProps } = useCheckboxGroup({ menu: true });
  return (
    <DropdownMenu buttonChildren="Dropdown">
      <MenuItemCheckbox {...getCheckboxProps("a")} addon={<FavoriteIcon />}>
        With Icon
      </MenuItemCheckbox>
      <MenuItemRadio
        {...getCheckboxProps("b")}
        addon={<Avatar>A</Avatar>}
        addonType="avatar"
      >
        With Avatar
      </MenuItemRadio>
      <MenuItemSwitch
        {...getCheckboxProps("c")}
        addon={<img src="https://picsum.photos/56?image=700" alt="" />}
        addonType="media"
      >
        With Media
      </MenuItemSwitch>
      <MenuItemCheckbox
        {...getCheckboxProps("d")}
        addon={<img src="https://picsum.photos/100/56?image=800" alt="" />}
        addonType="large-media"
        iconAfter
      >
        With Large Media
      </MenuItemCheckbox>
    </DropdownMenu>
  );
}
