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
 * const id = getNavigationGroupId(item, nextParents);
 * return (
 *   <CollapsibleNavGroup
 *     depth={nextParents.length}
 *     collapsed={!data?.expandedItems.has(id)}
 *     buttonChildren={item.children}
 *     toggleCollapsed={() => {
 *       data?.toggleExpandedItem(id);
 *     }}
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

  /**
   * An optional unique id to identify the group used for handling the expanded
   * state when the `href` can't be used.
   */
  id?: string;

  /**
   * An optional href to prefix all child routes with and can be used instead of
   * the {@link id} for handling the expanded state.
   *
   * @example
   * ```ts
   * {
   *   type: "group",
   *   href: "/some-path",
   *   children: "Some Name",
   *   items: [
   *     {
   *       type: "route",
   *       href: "/page-1",
   *       children: "Page 1",
   *     },
   *     {
   *       type: "route",
   *       href: "/page-2",
   *       children: "Page 2",
   *     },
   *   ],
   * }
   * ```
   *
   * Would result in:
   *
   * - Page 1 - `/some-path/page-1`
   * - Page 2 - `/some-path/page-2`
   */
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
export type CustomNavigationLinkComponent = ForwardRefExoticComponent<
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>;

/**
 * @since 6.0.0
 */
export type NavigationLinkComponent = "a" | CustomNavigationLinkComponent;

/**
 * @since 6.0.0
 */
export interface NavigationExpansion {
  expandedItems: ReadonlySet<string>;
  toggleExpandedItem: (id: string) => void;
}

/**
 * @since 6.0.0
 */
export interface NavigationRenderData extends NavigationExpansion {
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

/**
 * @since 6.0.0
 */
export interface HeadingReference {
  id: string;
}

/**
 * @since 6.0.0
 */
export interface HeadingReferenceWithChildren extends HeadingReference {
  items?: readonly HeadingReferenceWithChildren[];
}

/** @since 6.0.0 */
export interface TableOfContentsHeadingsOptions {
  /**
   * This should be a `document.querySelectorAll` query that returns elements
   * to display in a table of contents component that have a valid id.
   *
   * @see {@link DEFAULT_HEADING_SELECTOR}
   * @defaultValue `main :where(:not(nav *)):where(h1[id],h2[id],h3[id],h4[id],h5[id],h6[id])`
   */
  selector?: string;

  /**
   * @see {@link DEFAULT_GET_HEADING_DEPTH}
   * @defaultValue `(element) => parseInt(element.tagName.substring(1))`
   */
  getDepth?: (element: Element) => number;

  /**
   * This is used to get the text to display in a table of contents from each
   * heading element.
   *
   * @see {@link DEFAULT_GET_HEADING_TEXT}
   * @defaultValue `(element) => element.textContent || ""`
   */
  getHeadingText?: (element: Element) => string;
}

/** @since 6.0.0 */
export interface TableOfContentsHeading extends HeadingReference {
  depth: number;
  children: string;
}

/** @since 6.0.0 */
export interface TableOfContentsHeadingItem
  extends TableOfContentsHeading, HeadingReferenceWithChildren {
  items?: TableOfContentsHeadingItem[];
}

/** @since 6.0.0 */
export type TableOfContentsHeadings = readonly TableOfContentsHeadingItem[];
