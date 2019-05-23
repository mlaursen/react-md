import React from "react";
import { List } from "@react-md/list";
import Menu, { MenuProps } from "./Menu";
import { RequireAtLeastOne } from "@react-md/utils";

export type MenuPositionProps = Pick<
  MenuProps,
  "anchor" | "onResize" | "onPageScroll" | "horizontal"
>;

type InjectedMenuProps = Required<
  Pick<
    MenuProps,
    "id" | "visible" | "onRequestClose" | "controlId" | "onClick" | "children"
  >
> &
  MenuPositionProps &
  RequireAtLeastOne<MenuProps, "aria-label" | "aria-labelledby">;

export default function defaultMenuRenderer({
  horizontal,
  children,
  ...props
}: InjectedMenuProps) {
  return (
    <Menu {...props} horizontal={horizontal}>
      <List horizontal={horizontal}>{children}</List>
    </Menu>
  );
}
