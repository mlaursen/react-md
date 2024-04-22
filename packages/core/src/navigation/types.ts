import {
  type AnchorHTMLAttributes,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { type DividerProps } from "../divider/Divider.js";
import { type ListSubheaderProps } from "../list/ListSubheader.js";
import {
  type TooltipOptions,
  type TooltippedElementEventHandlers,
} from "../tooltip/useTooltip.js";

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
 * This is used to either create a route group which update all child routes to
 * be prefixed with the optional `href`.
 *
 * @example Route Group Output
 * ```tsx
 * const nextParents = [item, ...parents];
 * return (
 *   <CollapsibleNavGroup
 *     depth={nextParents.length})
 *     defaultCollapsed={() =>
 *       !data.pathname.includes(getHrefFromParents(nextParents))
 *     }
 *     buttonChildren={item.children}
 *   >
 *     {children}
 *   </CollapsibleNavGroup>
 * );
 * ```
 *
 * Note: `children` are any child `items` that have been rendered.
 *
 * @since 6.0.0
 */
export interface NavigationItemGroup {
  type: "group";
  href?: string;
  children: ReactNode;
  items: readonly NavigationItem[];
}

/**
 * @since 6.0.0
 */
export interface NavigationItemRoute {
  type: "route";
  href: string;
  children: ReactNode;
  active?: boolean;
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

/**
 * @since 6.0.0
 */
export interface NavItemContentProps {
  /**
   * Any additional props to provide the `<span>` element that wraps the
   * children such as `style`, `className`, and `ref`.
   */
  spanProps?: HTMLAttributes<HTMLSpanElement>;

  /**
   * An optional addon to render before the `children` and will not be wrapped
   * in the `span` that adds ellipsis overflow.
   */
  beforeAddon?: ReactNode;

  /**
   * An optional addon to render after the `children` and will not be wrapped
   * in the `span` that adds ellipsis overflow.
   */
  afterAddon?: ReactNode;

  /**
   * This should contain accessible text for the page that this will link to and
   * will automatically be truncated with ellipsis if it is too large. A tooltip
   * will also appear only when it has been truncated.
   */
  children: ReactNode;

  /**
   * This most likely will never need to be used, but it's a way to override any
   * tooltip options. The default behavior will position the tooltip to the
   * right and only appear if the `children` are overflown.
   *
   * @example Customize
   * ```tsx
   * <NavItemLink
   *   {...props}
   *   tooltipOptions={{
   *     overflowOnly: false,
   *     defaultPosition: "above",
   *     vhMargin: "1rem",
   *     vwMargin: "1rem",
   *   }}
   * >
   * ```
   */
  tooltipOptions?: Omit<
    TooltipOptions<HTMLAnchorElement>,
    keyof TooltippedElementEventHandlers<HTMLAnchorElement>
  >;
}
