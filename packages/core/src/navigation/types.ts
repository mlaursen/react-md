import {
  type AnchorHTMLAttributes,
  type ForwardRefExoticComponent,
  type ReactNode,
} from "react";
import { type DividerProps } from "../divider/Divider.js";
import { type ListSubheaderProps } from "../list/ListSubheader.js";

/**
 * Used to add a `Divider` to the navigation list.
 * @example Output
 * ```tsx
 * const { type, ...props } = item;
 * return <Divider {...props} />;
 * ```
 *
 * @since 6.0.0
 */
export interface NavigationItemDivider extends DividerProps {
  type: "divider";
}

/**
 * Used to add a `ListSubheader` to the navigation list.
 * @example Output
 * ```tsx
 * const { type, ...props } = item;
 * return <ListSubheader {...props} />;
 * ```
 *
 * @since 6.0.0
 */
export interface NavigationItemSubheader extends ListSubheaderProps {
  type: "subheader";
  children: ReactNode;
}

/**
 * Used to create a group of routes being prefixed with a `ListItemSubheader`.
 *
 * @example Output
 * ```tsx
 * const { items, type, ...props } = item;
 * return (
 *   <>
 *     <ListSubheader {...props} />
 *     {children}
 *   </>
 * );
 * ```
 *
 * Note: `children` are any child `items` that have been rendered.
 *
 * @since 6.0.0
 */
export interface NavigationItemGroup {
  type: "group";
  children: ReactNode;
  items: readonly NavigationItem[];
}

/**
 * @since 6.0.0
 */
export interface NavigationItemRoute {
  type: "route";
  href: string;
  items?: readonly NavigationItem[];
  children: ReactNode;
  beforeAddon?: ReactNode;
  afterAddon?: ReactNode;
}

/**
 * @since 6.0.0
 */
export type NavigationItem =
  | NavigationItemDivider
  | NavigationItemSubheader
  | NavigationItemGroup
  | NavigationItemRoute;

/**
 * @since 6.0.0
 */
export type NavigationLinkComponent =
  | "a"
  | ForwardRefExoticComponent<
      AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    >;

/**
 * @since 6.0.0
 */
export interface NavigationRenderData {
  /**
   * This is used to set the `active` state on a `NavItemLink`
   */
  pathname: string;
  linkComponent: NavigationLinkComponent;
}
