import { ElementType, ReactNode } from "react";
import { AppBarTitleProps } from "@react-md/app-bar";
import { BaseTreeItem, TreeData } from "@react-md/tree";
import { PropsWithRef } from "@react-md/utils";

/**
 * Due to the limited screen size for phones, the layout only supports having
 * temporary navigation with an optional persistent mini navigation.
 *
 * A temporary navigation will create a `Sheet` that renders your navigation
 * items and will only become visible when the main `AppBarNav` component has
 * been clicked.  Once a navigation item within this sheet has been clicked, the
 * sheet will automatically close.
 *
 * A temporary mini navigation will extend the temporary navigation as well as
 * showing a persistent mini navigation that is icons only for different routes.
 */
export type SupportedPhoneLayout = "temporary" | "temporary-mini";

/**
 * Since tablets have more real-estate than phones, they also support two more
 * types of navigation with a toggleable persistent navigation as well as a
 * persistent navigation.
 *
 * The toggleable navigation will not be visible until the `AppBarNav` component
 * has been clicked in the main fixed header. This sort of navigation will be
 * rendered inline with the rest of your content and will persist until the user
 * hides this sheet by clicking the close button within this sheet.
 *
 * The toggleable mini navigation is just an expansion of this by also allowing
 * a persistent mini navigation that will be covered when the toggleable
 * navigation becomes visible.
 */
export type SupportedTabletLayout =
  | SupportedPhoneLayout
  | "toggleable"
  | "toggleable-mini";

/**
 * Finally, when there is a lot of real estate, you can have three different
 * types of static navigation that will always be visible, can't be hidden, and
 * are rendered inline with the rest of your content.
 *
 * A floating navigation is a static sheet that will have a transparent
 * background and no elevation applied so it is really inline with the rest of
 * the content on your page. It will expand the entire viewport height except
 * ensuring that the main fixed header does not overlap the top of it.
 *
 * A clipped navigation is like the floating navigation except that it gains the
 * main surface background color and adds some default elevation to help draw
 * focus to itself.
 *
 * Finally, a full-height navigation will cover the entire viewport height and
 * shift the main fixed header so that the left edge of the header stops at the
 * right edge of the navigation.
 */
export type SupportedWideLayout =
  | SupportedTabletLayout
  | "floating"
  | "clipped"
  | "full-height";

/**
 * The configuration for the layout based on media sizes.
 */
export interface LayoutConfiguration {
  /**
   * The type of layout to use when your app is viewed on a phone sized screen.
   */
  phoneLayout?: SupportedPhoneLayout;

  /**
   * The type of layout to use when your app is viewed on a portrait tabled
   * sized screen.
   */
  tabletLayout?: SupportedTabletLayout;

  /**
   * The type of layout to use when your app is viewed on a landscape tablet
   * sized screen.
   */
  landscapeTabletLayout?: SupportedWideLayout;

  /**
   * The type of layout to use when your app is viewed on a desktop sized
   * screen.
   */
  desktopLayout?: SupportedWideLayout;

  /**
   * The type of layout to use when your app is viewed on a large desktop sized
   * screen.
   *
   * Note: Unlike all the other layout types, this one will automatically
   * inherit the `desktopLayout` if it is omitted.
   */
  largeDesktopLayout?: SupportedWideLayout;

  /**
   * This prop is used to be able to update the toggleable layouts to start
   * visible/expanded instead of requiring the toggle button to be pressed.
   *
   * If this is:
   * - `"toggleable"` - the `"toggleable-mini"` variant will still require a
   *   button click to be visible
   * - `"toggleable-mini"` - the `"toggleable"` variant will still require a
   *   button click to be visible
   * - `true` - both toggleable variants will start visible
   * - `false | undefined` - both toggleable variants will require a button
   *   click to be visible
   *
   * @remarks \@since 2.6.0
   */
  defaultToggleableVisible?: boolean | "toggleable" | "toggleable-mini";
}

/**
 * This is the "recommended" layout navigation item configuration that works
 * pretty well out of the box for creating a navigation tree.
 */
export interface LayoutNavigationItem extends BaseTreeItem {
  /**
   * The children to display for each item. This **should** actually be a string
   * unless you manually provide a `getTreeItemValue` prop and/or update the
   * `valueKey` to be a key referencing a stringified value of this item so it
   * can be keyboard searched.
   *
   * This is only optional by default in case you want to be able to render
   * custom dividers or subheaders within your navigation tree. Otherwise, this
   * should be required.
   */
  children?: ReactNode;

  /**
   * An optional link target. Example: "_blank".
   */
  target?: string;

  /**
   * If your routing library uses the `to` prop to render a link, this will be
   * used and assume the tree item is a link component.
   */
  to?: string;

  /**
   * This will make the tree item a link component and set this to the `href`.
   */
  href?: string;

  /**
   * An optional icon to display to the left of the `children`. See the
   * `ListItem` component for more details.
   */
  leftAddon?: ReactNode;

  /**
   * An optional `rel` attribute to apply when using rendering a link.
   */
  rel?: string;

  /**
   * The component that should be used to render the tree item content. This is
   * normally a custom `Link` component if using a routing library.
   *
   * Note: You can always provide a `linkComponent` prop on the main `Layout`
   * component instead which will be used whenever the `to` or `href` props
   * exist on an item.
   */
  contentComponent?: ElementType;

  /**
   * Boolean if the item is just a placeholder `Divider` element. None of the
   * other props will be used.
   */
  divider?: boolean;

  /**
   * Boolean if the item is just a placeholder `ListSubheader` element. None of
   * the other props will be used other than `children` with the default item
   * renderer.
   */
  subheader?: boolean;

  /**
   * Adding record syntax for the rest just to be safe.
   */
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * The layout navigation tree. It is recommended to set this up so that each
 * `itemId` within your tree is the route that the link should be. For example:
 *
 * ```ts
 * const navItems: LayoutNavigationTree = {
 *   "/": {
 *     itemId: "/",
 *     parentId: null,
 *     children: "Home",
 *     leftAddon: <HomeSVGIcon />,
 *     to: "/",
 *     contentComponent: Link,
 *   },
 *   "/route-1": {
 *     itemId: "/route-1",
 *     parentId: null,
 *     children: "Route 1",
 *     leftAddon: <TVSVGIcon />,
 *     to: "/route-1",
 *     contentComponent: Link,
 *   },
 *   "/route-2": {
 *     itemId: "/route-2",
 *     parentId: null,
 *     children: "Route 2",
 *     leftAddon: <AppsSVGIcon />,
 *     to: "/route-2",
 *     contentComponent: Link,
 *   },
 *   "/route-3": {
 *     itemId: "/route-3",
 *     parentId: null,
 *     children: "Route 3",
 *     leftAddon: <BookSVGIcon />,
 *     to: "/route-3",
 *     contentComponent: Link,
 *   },
 * };
 * ```
 *
 * This will work amazingly with the provided `useLayoutNavigation` hook.
 */
export type LayoutNavigationTree<
  T extends BaseTreeItem = LayoutNavigationItem
> = TreeData<T>;

export interface LayoutWithTitle {
  /**
   * A custom implementation for the main `AppBarTitle` within the `Layout` that
   * will be used instead of the default `LayoutAppBarTitle` if it is not
   * `undefined`. This means that if you don't want to have a title within the
   * main `AppBar`, set this value to `null`.
   *
   * Using this prop will make the following props do nothing:
   *
   * - `title`
   * - `titleProps`
   */
  customTitle?: ReactNode;

  /**
   * An optional main title to display in the `Layout`. This should normally be
   * something like the page title since it will be rendered in the default
   * `AppBar` for the `Layout`.
   */
  title?: ReactNode;

  /**
   * Any additional props that should be applied to the layout's default
   * `AppBarTitle`.
   */
  titleProps?: PropsWithRef<
    Omit<AppBarTitleProps, "children">,
    HTMLHeadingElement
  >;
}
