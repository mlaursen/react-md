import React, { ReactNode } from "react";
import { List } from "@react-md/list";
import { RequireAtLeastOne } from "@react-md/utils";

import { Item } from "./defaultItemRenderer";
import Menu, { MenuProps } from "./Menu";
import { RenderConditionalPortalProps } from "@react-md/portal";

export type MenuPositionProps = Pick<
  MenuProps,
  "anchor" | "onResize" | "onPageScroll" | "horizontal" | "positionOptions"
>;

type RequiredMenuProps = Required<
  Pick<
    MenuProps,
    | "id"
    | "visible"
    | "onRequestClose"
    | "controlId"
    | "children"
    | "defaultFocus"
  >
>;

export interface InjectedMenuProps
  extends MenuPositionProps,
    RequiredMenuProps,
    RenderConditionalPortalProps {}

type LabelRequired = RequireAtLeastOne<
  MenuProps,
  "aria-label" | "aria-labelledby"
>;

export type MenuRenderer = (
  props: InjectedMenuProps & LabelRequired,
  items: Item[]
) => ReactNode;

/**
 * The default menu renderer that will just render the `Menu` component along with
 * a `List` by passing all props down to the main `Menu` component.
 */
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
