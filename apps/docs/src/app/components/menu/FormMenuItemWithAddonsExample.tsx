import {
  Avatar,
  DropdownMenu,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuItemSwitch,
  useCheckboxGroup,
} from "@react-md/core";
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
