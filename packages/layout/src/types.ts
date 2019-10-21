import { CSSProperties, ElementType, ReactElement, ReactNode } from "react";
import { AppBarTheme } from "@react-md/app-bar";
import { BaseTreeItem, TreeData, TreeProps } from "@react-md/tree";

/**
 * Due to the limited screen size for phones, the layout only supports
 * having temporary navigation with an optional persistent mini navigation.
 *
 * A temporary navigation will create a `Sheet` that renders your navigation items
 * and will only become visible when the main `AppBarNav` component has been clicked.
 * Once a navigation item within this sheet has been clicked, the sheet will automatically
 * close.
 *
 * A temporary mini navigation will extend the temporary navigation as well as showing
 * a persistent mini navigation that is icons only for different routes.
 */
export type SupportedPhoneLayout = "temporary" | "temporary-mini";

/**
 * Since tablets have more real-estate than phones, they also support two more types of
 * navigation with a toggleable persistent navigation as well as a persistent navigation.
 *
 * The toggleable navigation will not be visible until the `AppBarNav` component has been
 * clicked in the main fixed header. This sort of navigation will be rendered inline with
 * the rest of your content and will persist until the user hides this sheet by clicking
 * the close button within this sheet.
 *
 * The toggleable mini navigation is just an expansion of this by also allowing a persistent
 * mini navigation that will be covered when the toggleable navigation becomes visible.
 */
export type SupportedTabletLayout =
  | SupportedPhoneLayout
  | "toggleable"
  | "toggleable-mini";

/**
 * Finally, when there is a lot of real estate, you can have three different types of static
 * navigation that will always be visible, can't be hidden, and are rendered inline with
 * the rest of your content.
 *
 * A floating navigation is a static sheet that will have a transparent background and no
 * elevation applied so it is really inline with the rest of the content on your page. It
 * will expand the entire viewport height except ensuring that the main fixed header does
 * not overlap the top of it.
 *
 * A clipped navigation is like the floating navigation except that it gains the main surface
 * background color and adds some default elevation to help draw focus to itself.
 *
 * Finally, a full-height navigation will cover the entire viewport height and shift the
 * main fixed header so that the left edge of the header stops at the right edge of the
 * navigation.
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
   * The type of layout to use when your app is viewed on a portrait tabled sized
   * screen.
   */
  tabletLayout?: SupportedTabletLayout;

  /**
   * The type of layout to use when your app is viewed on a landscape tablet sized
   * screen.
   */
  landscapeTabletLayout?: SupportedWideLayout;

  /**
   * The type of layout to use when your app is viewed on a desktop sized screen.
   */
  desktopLayout?: SupportedWideLayout;

  /**
   * The type of layout to use when your app is viewed on a large desktop sized
   * screen.
   *
   * Note: Unlike all the other layout types, this one will automatically inherit
   * the `desktopLayout` if it is omitted.
   */
  largeDesktopLayout?: SupportedWideLayout;
}

export interface LayoutAppBarProps {
  /**
   * The theme to provide to the main app bar.
   */
  appBarTheme?: AppBarTheme;

  /**
   * Boolean if the main app bar should be fixed to the top of the page.
   */
  fixedAppBar?: boolean;

  /**
   * Boolean if the main app bar should be dense.
   *
   * Note: this prop isn't super helpful since the dense theme is normally
   * automatically applied via media queries.
   */
  denseAppBar?: boolean;

  /**
   * An optional title to display in the main app bar. Note: this will always
   * be wrapped in the `AppBarTitle` component.
   */
  appBarTitle?: ReactNode;

  /**
   * Any optional children to display in the main app bar. This can be used to
   * add additional `AppBarAction`, or your own `AppBarTitle` if the default
   * `appBarTitle` prop isn't to your liking.
   *
   * Note: It is recommended to use the `appBarRenderer` prop for a more customized
   * app bar that allows you to have full control over how the `AppBar` is rendered.
   */
  appBarChildren?: ReactNode;

  /**
   * The icon that should be displayed in the `AppBarNav` component when the main
   * navigation is in a temporary or toggleable element.
   */
  navIcon?: ReactNode;

  /**
   * The `aria-label` to apply to the `AppBarNav` component when the main navigation
   * is in a temporary or toggleable element.
   */
  navIconLabel?: string;
}

/**
 * The "props" that are provided to a custom app bar renderer. This allows you to
 * implement your own functionality while still maintaining the default functionality
 * and styles of the main Layout.
 */
export interface LayoutAppBarRendererProps
  extends Required<Pick<LayoutAppBarProps, "navIconLabel">> {
  /**
   * The `className` to apply to the main `AppBar` so that it is positioned currently
   * relative to the main navigation.
   */
  className: string;

  /**
   * Boolean if the app bar is currently offset by the main navigation component.
   */
  offset: boolean;

  /**
   * A function to call that will show the main navigation when the main navigation is
   * temporary or toggleable.
   */
  showNav: () => void;

  /**
   * Boolean if the main navigation is currently visible.
   */
  isNavVisible: boolean;

  /**
   * Boolean if the main navigation is not temporary or toggleable.
   */
  isPersistent: boolean;
}

/**
 * A custom `AppBar` renderer that can be used for additional flexibility and customization
 * for a layout's AppBar. This _looks_ like the normal interface for a React component,
 * but you should always use it to return a React component so you can have access
 * to hooks.
 *
 * ```tsx
 * // This technically works, but is not recommended since you won't be able to use
 * // React hooks this way
 * <Layout
 *   appBarRenderer={props => <AppBar {...props}> ... Implementation ... </AppBar>}
 *   {...otherProps}
 * />
 *
 *
 * // This is recommended even though it looks like it isn't really doing anything other
 * // than a bit more boilerplate. This pattern will allow you to use hooks though in
 * // your implementation since you've now created a React element instead of just a
 * // function renderer
 * const MyCustomAppBar: FC<LayoutAppBarRendererProps> = props => {
 *   ... Implementation ...
 * }
 * const appBarRenderer: LayoutAppBarRenderer = props => <MyCustomAppBar {...props} />
 * ```
 *
 * TODO: Look into moving this into Context + hook for this instead so you don't need
 * this weird workaround just so hooks can be used. It'll just be
 * {customAppBar || <LayoutAppBar {...props} />}
 */
export type LayoutAppBarRenderer = (
  props: LayoutAppBarRendererProps
) => ReactElement | null;

/**
 * This is the "recommended" layout navigation item configuration that works pretty
 * well out of the box for creating a navigation tree.
 */
export interface LayoutNavigationItem extends BaseTreeItem {
  /**
   * The children to display for each item. This **should** actually be a string
   * unless you manually provide a `getTreeItemValue` prop and/or update the `valueKey`
   * to be a key referencing a stringified value of this item so it can be keyboard
   * searched.
   */
  children: ReactNode;

  /**
   * An optional link target. Example: "_blank".
   */
  target?: string;

  /**
   * If your routing library uses the `to` prop to render a link, this will be used
   * and assume the tree item is a link component.
   */
  to?: string;

  /**
   * This will make the tree item a link component and set this to the `href`.
   */
  href?: string;

  /**
   * An optional icon to display to the left of the `children`. See the `ListItem` component
   * for more details.
   */
  leftIcon?: ReactNode;

  /**
   * An optional `rel` attribute to apply when using rendering a link.
   */
  rel?: string;

  /**
   * The component that should be used to render the tree item content. This is normally
   * a custom `Link` component if using a routing library.
   *
   * Note: You can always provide a `linkComponent` prop on the main `Layout` component
   * instead which will be used whenever the `to` or `href` props exist on an item.
   */
  contentComponent?: ElementType;

  /**
   * Boolean if the item is just a placeholder `Divider` element. None of the other props
   * will be used.
   */
  divider?: boolean;

  /**
   * Boolean if the item is just a placeholder `ListSubheader` element. None of the other props
   * will be used other than `children` with the default item renderer.
   */
  subheader?: boolean;

  /**
   * Adding record syntax for the rest just to be safe.
   */
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * The layout navigation tree. It is recommended to set this up so that each `itemId` within
 * your tree is the route that the link should be. For example:
 *
 * ```ts
 * const navItems: LayoutNavigationTree = {
 *   "/": {
 *     itemId: "/",
 *     parentId: null,
 *     children: "Home",
 *     leftIcon: <HomeSVGIcon />,
 *     to: "/",
 *     contentComponent: Link,
 *   },
 *   "/route-1": {
 *     itemId: "/route-1",
 *     parentId: null,
 *     children: "Route 1",
 *     leftIcon: <TVSVGIcon />,
 *     to: "/route-1",
 *     contentComponent: Link,
 *   },
 *   "/route-2": {
 *     itemId: "/route-2",
 *     parentId: null,
 *     children: "Route 2",
 *     leftIcon: <AppsSVGIcon />,
 *     to: "/route-2",
 *     contentComponent: Link,
 *   },
 *   "/route-3": {
 *     itemId: "/route-3",
 *     parentId: null,
 *     children: "Route 3",
 *     leftIcon: <BookSVGIcon />,
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

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * The props for the main navigation element in the layout. This can either be a persistent
 * navigation that is displayed inline with the rest of the content, a temporary navigation
 * that appears in a sheet, or a toggleable navigation that dynamically appears as an inline
 * navigation but can be hidden again.
 */
export interface LayoutNavigationProps<
  T extends BaseTreeItem = LayoutNavigationItem
> extends Omit<TreeProps<T>, "id" | "data" | "aria-label" | "aria-labelledby"> {
  /**
   * An optional `aria-label` to apply to the navigation tree. Either this or the `navLabelledBy`
   * prop are required for a11y.
   */
  navLabel?: string;

  /**
   * An optional `aria-labelledby` to apply to the navigation tree. Either this or the `navLabel`
   * prop are required for a11y.
   */
  navLabelledBy?: string;

  /**
   * An optional `aria-label` to apply to the navigation tree's container sheet element. Either this
   * or the `sheetLabelledBy` prop are required for a11y.
   */
  sheetLabel?: string;

  /**
   * An optional `aria-labelledby` to apply to the navigation tree's container sheet element. Either
   * this or the `sheetLabel` prop are required for a11y.
   */
  sheetLabelledBy?: string;

  /**
   * An optional style to apply to the sheet element. This will be the main container for the navigation
   * tree.
   */
  sheetStyle?: CSSProperties;

  /**
   * An optional className to apply to the sheet element. This will be the main container for the
   * navigation tree.
   */
  sheetClassName?: string;

  /**
   * The navigation items to render. Check out the tree documentation a bit more for this,
   * but the default behavior will be to render in insert order (depending on browser). You
   * can always provided your own `sort` behavior though.
   */
  navItems: LayoutNavigationTree<T>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
