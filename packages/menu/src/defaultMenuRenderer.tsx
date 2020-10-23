import React, { CSSProperties, ReactElement, ReactNode } from "react";
import { List } from "@react-md/list";
import { RenderConditionalPortalProps } from "@react-md/portal";
import { LabelRequiredForA11y } from "@react-md/utils";

import { ValidMenuItem } from "./defaultMenuItemRenderer";
import { Menu, MenuProps } from "./Menu";

export type MenuPositionProps = Pick<
  MenuProps,
  | "anchor"
  | "horizontal"
  | "positionOptions"
  | "closeOnScroll"
  | "closeOnResize"
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

export interface AllInjectedMenuProps
  extends MenuPositionProps,
    RequiredMenuProps,
    RenderConditionalPortalProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  style?: CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}

export type InjectedMenuProps = LabelRequiredForA11y<AllInjectedMenuProps>;

/**
 * A type that can be used to implement a custom menu renderer:
 *
 * ```ts
 * const customRenderer: MenuRenderer = (props, items) => {
 *   ... do stuff ...
 *
 *   return <MyComponent { ...whatever }>{children}</MyComponent>
 * };
 * ```
 */
export type MenuRenderer = (
  props: InjectedMenuProps,
  items: ValidMenuItem[]
) => ReactNode;

/**
 * The default menu renderer that will just render the `Menu` component along
 * with a `List` by passing all props down to the main `Menu` component.
 */
export function defaultMenuRenderer({
  horizontal,
  children,
  ...props
}: LabelRequiredForA11y<AllInjectedMenuProps>): ReactElement {
  return (
    <Menu {...props} horizontal={horizontal}>
      <List horizontal={horizontal}>{children}</List>
    </Menu>
  );
}
