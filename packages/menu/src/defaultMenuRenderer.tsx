import React, { ReactNode } from "react";
import { List } from "@react-md/list";
import Menu, { MenuProps } from "./Menu";
import { RequireAtLeastOne } from "@react-md/utils";
import { Item } from "./defaultItemRenderer";

export type MenuPositionProps = Pick<
  MenuProps,
  "anchor" | "onResize" | "onPageScroll" | "horizontal"
>;

type RequiredMenuProps = Required<
  Pick<
    MenuProps,
    | "id"
    | "visible"
    | "onRequestClose"
    | "controlId"
    | "onClick"
    | "children"
    | "defaultFocus"
  >
>;

export interface InjectedMenuProps
  extends MenuPositionProps,
    RequiredMenuProps {}

type LabelRequired = RequireAtLeastOne<
  MenuProps,
  "aria-label" | "aria-labelledby"
>;

export type MenuRenderer = (
  props: InjectedMenuProps & LabelRequired,
  items: Item[]
) => ReactNode;

export default function defaultMenuRenderer({
  horizontal,
  children,
  ...props
}: InjectedMenuProps & LabelRequired) {
  return (
    <Menu {...props} horizontal={horizontal}>
      <List horizontal={horizontal}>{children}</List>
    </Menu>
  );
}
