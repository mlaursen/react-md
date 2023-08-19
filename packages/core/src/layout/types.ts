import type { CSSProperties, ElementType, ReactNode } from "react";
import type { AppBarProps } from "../app-bar/AppBar.js";
import type { AppBarTitleProps } from "../app-bar/AppBarTitle.js";
import type { ButtonProps } from "../button/Button.js";
import type { SheetProps } from "../sheet/Sheet.js";
import type {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "../transition/types.js";
import type { TreeItemRendererProps } from "../tree/DefaultTreeItemRenderer.js";
import type { TreeProps } from "../tree/Tree.js";
import type {
  DefaultTreeItemNode,
  TreeData,
  TreeItemNode,
} from "../tree/types.js";
import type { PropsWithRef } from "../types.js";

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
   *
   * @defaultValue `"temporary"`
   */
  phoneLayout?: SupportedPhoneLayout;

  /**
   * The type of layout to use when your app is viewed on a portrait tabled
   * sized screen.
   *
   * @defaultValue `"toggleable"`
   */
  tabletLayout?: SupportedTabletLayout;

  /**
   * The type of layout to use when your app is viewed on a landscape tablet
   * sized screen.
   *
   * @defaultValue `"toggleable"`
   */
  landscapeTabletLayout?: SupportedWideLayout;

  /**
   * The type of layout to use when your app is viewed on a desktop sized
   * screen.
   *
   * @defaultValue `"full-height"`
   */
  desktopLayout?: SupportedWideLayout;

  /**
   * The type of layout to use when your app is viewed on a large desktop sized
   * screen.
   *
   * Note: Unlike all the other layout types, this one will automatically
   * inherit the `desktopLayout` if it is omitted.
   *
   * @defaultValue `desktopLayout`
   * @see {@link desktopLayout}
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
   * @defaultValue `false`
   */
  defaultToggleableVisible?: boolean | "toggleable" | "toggleable-mini";
}

/**
 * This is the "recommended" layout navigation item configuration that works
 * pretty well out of the box for creating a navigation tree.
 */
export interface LayoutNavigationItem extends DefaultTreeItemNode {
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
 *     leftAddon: <HomeIcon />,
 *     to: "/",
 *     contentComponent: Link,
 *   },
 *   "/route-1": {
 *     itemId: "/route-1",
 *     parentId: null,
 *     children: "Route 1",
 *     leftAddon: <TvIcon />,
 *     to: "/route-1",
 *     contentComponent: Link,
 *   },
 *   "/route-2": {
 *     itemId: "/route-2",
 *     parentId: null,
 *     children: "Route 2",
 *     leftAddon: <AppsIcon />,
 *     to: "/route-2",
 *     contentComponent: Link,
 *   },
 *   "/route-3": {
 *     itemId: "/route-3",
 *     parentId: null,
 *     children: "Route 3",
 *     leftAddon: <BookIcon />,
 *     to: "/route-3",
 *     contentComponent: Link,
 *   },
 * };
 * ```
 *
 * This will work amazingly with the provided `useLayoutNavigation` hook.
 */
export type LayoutNavigationTree<
  T extends TreeItemNode = LayoutNavigationItem,
> = TreeData<T>;

export interface BaseLayoutAppBarProps extends Omit<AppBarProps, "title"> {
  /**
   * Boolean if the `AppBar` should be fixed to the top of the page. Unlike the
   * regular `AppBar`, this will be defaulted to `true`
   *
   * @defaultValue `"fixed"`
   */
  position?: AppBarProps["position"];
}

export interface LayoutAppBarProps
  extends BaseLayoutAppBarProps,
    LayoutWithNavToggle,
    LayoutWithTitle {}

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

export interface LayoutNavToggleProps extends ButtonProps {
  /**
   * An optional `aria-label` to provide to the nav toggle button that can be
   * used instead of the `aria-labelledby` prop to describe the button for
   * screen readers. When this and the `aria-labelledby` props are undefined, it
   * will default to:
   *
   * - `"Show Navigation"` for temporary layouts so that it will be read as
   *   `"Show Navigation Button"` by screen readers
   * - `"Navigation"` for toggleable layouts so that it will be read as
   *   `"Navigation Toggle Button"` by screen readers
   */
  "aria-label"?: string;

  /**
   * Boolean if the button should offset the rest of the components in the
   * `AppBar` by the current size of the navigation panel. When this is
   * `undefined`, it will be `true` when a toggleable layout is visible.
   */
  offset?: boolean;

  /**
   * Boolean if this component should be rendered. When this is `undefined`, it
   * will not be rendered for temporary layouts as well as when the toggleable
   * navigation panel is not visible.
   */
  rendered?: boolean;

  /**
   * The transition timeout to use for the toggleable `LayoutNavigation` either
   * comes into view or expands from mini to full-width. The transition can be
   * disabled by setting this value to `0`.
   */
  timeout?: TransitionTimeout;

  /**
   * The transition classnames to use for the toggleable `LayoutNavigation`
   * either comes into view or expands from mini to full-width.
   */
  classNames?: CSSTransitionClassNames;
}

export interface LayoutWithNavToggle {
  /**
   * An optional custom nav toggle to use within the `Layout` or `LayoutAppBar`
   * instead of the default implementation.
   */
  navToggle?: ReactNode;

  /**
   * Any optional props to provide to the default `LayoutNavToggle`
   * implementation.
   */
  navToggleProps?: PropsWithRef<LayoutNavToggleProps, HTMLButtonElement>;
}

export interface LayoutCloseNavigationButtonProps extends ButtonProps {
  /**
   * Boolean if the button should be rendered. If this is omitted, it will only
   * be rendered for toggleable layouts.
   */
  rendered?: boolean;
}

export interface LayoutNavigationHeaderProps
  extends Omit<AppBarProps, "title"> {
  /**
   * An optional title to display that will be wrapped in the `AppBarTitle`
   * component.
   *
   * Note: If you do not want to wrap the title with the `AppBarTitle` component
   * and want additional configuration, just provide your own `children`
   * instead.
   */
  title?: ReactNode;

  /**
   * Any additional props to provide to the `AppBarTitle` when the `title` prop
   * was provided.
   */
  titleProps?: PropsWithRef<AppBarProps, HTMLDivElement>;

  /**
   * Boolean if the header should gain a border-bottom.
   */
  disableBorderBottom?: boolean;

  /**
   * An optional close navigation button to use instead of the default
   * `LayoutCloseNavigationButton`.
   */
  closeNav?: ReactNode;

  /**
   * Any props to pass to the default `LayoutCloseNavigationButton` when the
   * `closeNav` prop was omitted.
   */
  closeNavProps?: PropsWithRef<
    LayoutCloseNavigationButtonProps,
    HTMLButtonElement
  >;
}

export type BaseLayoutTreeProps<T extends TreeItemNode = LayoutNavigationItem> =
  Omit<TreeProps<T>, "id" | "data" | "aria-label" | "aria-labelledby">;

export interface LayoutTreeProps<T extends TreeItemNode = LayoutNavigationItem>
  extends BaseLayoutTreeProps<T> {
  /**
   * The id to use for the tree. When this is omitted, it will be set to
   * `${baseId}-navigation-tree` where the `baseId` is the `id` provided to the
   * parent `Layout` component.
   */
  id?: string;

  /**
   * An optional `aria-label` to provide to the tree. This will be defaulted to
   * `"Navigation"`.
   */
  "aria-label"?: string;

  /**
   * An optional space-delimited list of ids that help describe this tree. This
   * can be used instead of an `aria-label` or alongside for additional screen
   * reader description.
   */
  "aria-labelledby"?: string;

  /**
   * Boolean if the `LayoutTree` is being rendered as the mini variant. This
   * will update the `itemRenderer` to default to the
   * `defaultMiniNavigationItemRenderer` instead of the
   * `defaultNavigationItemRenderer`.
   *
   * @remarks \@since 2.7.0
   * @defaultValue `false`
   */
  mini?: boolean;

  /**
   * Boolean if the mini navigation should be treated as a "sticky" element.
   * This should really only be `true` if disabling the fixed `AppBar` behavior
   * in the `Layout`.
   *
   * @remarks \@since 2.8.3
   * @defaultValue `false`
   */
  sticky?: boolean;

  /**
   * The {@link TreeItemRenderer} to use if the `mini` prop is enabled.
   *
   * @remarks \@since 2.8.3
   */
  miniItemRenderer?: ElementType<TreeItemRendererProps<T>>;

  /**
   * Optional style to provide to the `<nav>` element surrounding the tree
   */
  navStyle?: CSSProperties;

  /**
   * Optional className to provide to the `<nav>` element surrounding the tree
   */
  navClassName?: string;

  /**
   * The navigation items to render.
   */
  navItems: TreeData<T>;

  /**
   * Boolean if the temporary navigation type should no longer automatically
   * close when the `selectedIds` updates to contain a new route when using the
   * `useLayoutNavigation` hook.  This makes it so when a user on mobile clicks
   * a route within your app in the main navigation pane, it will automatically
   * close if it was a link.
   *
   * @defaultValue `false`
   */
  disableTemporaryAutoClose?: boolean;
}

export type LayoutNavigationSheetProps = Omit<
  SheetProps,
  | "id"
  | "role"
  | "component"
  | "visible"
  | "onRequestClose"
  | "disableScrollLock"
  | "disableTabFocusWrap"
>;

export interface LayoutNavigationProps<
  T extends TreeItemNode = LayoutNavigationItem,
> extends LayoutNavigationSheetProps {
  /**
   * The id to use for the main navigation sheet element. When this is omitted,
   * this will be defaulted to: `${baseId}-nav-container`.
   */
  id?: string;

  /**
   * An optional header element to display before the navigation tree and
   * children. When this is omitted, it will default to the
   * `LayoutNavigationHeader` component with some reasonable defaults.
   */
  header?: ReactNode;

  /**
   * Any additional props to provide to the default `LayoutNavigationHeader`
   * component.
   */
  headerProps?: PropsWithRef<LayoutNavigationHeaderProps, HTMLDivElement>;

  /**
   * An optional title to display within the `LayoutNavigationHeader` component
   * that will be wrapped in an `AppBarTitle`.
   */
  headerTitle?: LayoutNavigationHeaderProps["title"];

  /**
   * Any additional props that should be passed to the `AppBarTitle` that
   * surrounds the `headerTitle`.
   */
  headerTitleProps?: PropsWithRef<
    Required<LayoutNavigationHeaderProps>["titleProps"],
    HTMLDivElement
  >;

  /**
   * An optional component to use instead of the default
   * `LayoutCloseNavigationButton` in the header.
   */
  closeNav?: ReactNode;

  /**
   * Any additional props to provide the `LayoutCloseNavigationButton`.
   */
  closeNavProps?: PropsWithRef<
    LayoutCloseNavigationButtonProps,
    HTMLButtonElement
  >;

  /**
   * When this is omitted, the default navigation tree will not be rendered and
   * the only content that will be displayed will be the optional `header`
   * element and any provided `children`.
   */
  treeProps?: LayoutTreeProps<T>;

  /**
   * Boolean if being rendered as the `mini` variant. This will override some
   * other behavior and styling within this component.
   *
   * @remarks \@since 2.7.0
   * @defaultValue `false`
   */
  mini?: boolean;

  /**
   * Boolean if the mini navigation should be treated as a "sticky" element.
   * This should really only be `true` if disabling the fixed `AppBar` behavior
   * in the `Layout`.
   *
   * @remarks \@since 2.8.3
   * @defaultValue `false`
   */
  sticky?: boolean;

  /** @remarks \@since 2.8.3 */
  miniNavItemRenderer?: ElementType<TreeItemRendererProps<T>>;
}

/**
 * Since the layout is a combination of multiple nested configurable components,
 * it can be annoying to have to apply multiple levels of prop configurations to
 * this root component. The main `Layout` flattens some of these props and
 * components if this is preferable.
 *
 * Example:
 *
 * ```tsx
 * <Layout
 *   appBarProps={{
 *     title: "Current Page Title",
 *     navToggleProps: {
 *       "aria-label": "A custom label"
 *     }
 *   }}
 *   navProps={{
 *     navHeaderProps: {
 *       title: "Company Name"
 *       closeNavProps: {
 *         disabled: true,
 *       },
 *       treeProps: useLayoutNavigation(navItems, window.location.pathname),
 *     },
 *   }}
 *   {...props}
 * />
 *
 *
 * // can also be written as
 * <Layout
 *   title="Current Page Title"
 *   navToggleProps={{
 *     "aria-label": "A custom label"
 *   }}
 *   navHeaderTitle="Current Page Title"
 *   closeNavProps={{ disabled: true }}
 *   treeProps={useLayoutNavigation(navItems, window.location.pathname)}
 *   {...props}
 * />
 * ```
 */
export interface FlattenedLayoutComponentConfiguration<
  T extends TreeItemNode = LayoutNavigationItem,
> extends LayoutWithTitle,
    LayoutWithNavToggle {
  /**
   * A custom implementation for the main `AppBar` within the `Layout` that will
   * be used instead of the default `LayoutAppBar` if it is not `undefined`.
   * This means that if you don't want to use an `AppBar` at all in your
   * application, set this value to `null`.
   *
   * Using this prop will make the following props do nothing:
   *
   * - `appBarProps`
   * - `customTitle`
   * - `title`
   * - `titleProps`
   */
  appBar?: ReactNode;

  /**
   * Any additional props to provide to the default `LayoutAppBar`
   */
  appBarProps?: PropsWithRef<LayoutAppBarProps, HTMLDivElement>;

  /**
   * A custom implementation for the main navigation component within the
   * `Layout`. If this is not `undefined`, it will be used instead of the
   * default implementation.
   *
   * Using this prop will make the following props do nothing:
   *
   * - `navProps`
   * - `navHeader`
   * - `navHeaderProps`
   * - `navHeaderTitle`
   * - `navHeaderTitleProps`
   * - `closeNav`
   * - `closeNavProps`
   * - `treeProps`
   */
  nav?: ReactNode;

  /**
   * A custom implementation for the main mini navigation component within the
   * `Layout`. If this is not `undefined`, it will be used instead of the
   * default implementation.
   *
   * Using this prop will make the following props do nothing for the mini nav:
   *
   * - `navProps`
   * - `navHeader`
   * - `navHeaderProps`
   * - `navHeaderTitle`
   * - `navHeaderTitleProps`
   * - `closeNav`
   * - `closeNavProps`
   * - `treeProps`
   *
   * @remarks \@since.2.7.0
   */
  miniNav?: ReactNode;

  /**
   * Any additional props to provide to the default `LayoutNavigation`.
   */
  navProps?: PropsWithRef<LayoutNavigationProps<T>, HTMLDivElement>;

  /**
   * A custom implementation for the main navigation component's header element
   * within the `Layout`. If this is not `undefined`, it will be used instead of
   * the default implementation.
   *
   * Using this prop will make the following props do nothing:
   *
   * - `navHeaderProps`
   * - `navHeaderTitle`
   * - `navHeaderTitleProps`
   * - `closeNav`
   * - `closeNavProps`
   */
  navHeader?: LayoutNavigationProps["header"];

  /**
   * Any additional props to provide to the default `LayoutNavigation`
   * component.
   */
  navHeaderProps?: PropsWithRef<
    Required<LayoutNavigationProps<T>>["headerProps"],
    HTMLDivElement
  >;

  /**
   * An optional title to display within the `LayoutNavigation`'s header
   * component. This will be defaulted to being wrapped with an `AppBarTitle`
   * component for additional styling.
   */
  navHeaderTitle?: LayoutNavigationProps["headerTitle"];

  /**
   * Any additional props to provide to the `AppBarTitle` surrounding the
   * `navHeaderTitle`.
   */
  navHeaderTitleProps?: PropsWithRef<
    Required<LayoutNavigationProps>["headerTitleProps"],
    HTMLDivElement
  >;

  /**
   * A custom implementation for the button that closes the toggleable layouts.
   * If this is not `undefined`, it will be used instead of the default
   * implementation.
   *
   * The default implementation for this component will be to only render for
   * toggleable layouts and close the navigation panel once clicked.
   *
   * Using this prop will make the `closeNavProps` do nothing.
   */
  closeNav?: LayoutNavigationProps["closeNav"];

  /**
   * Any additional props to provide to the default
   * `LayoutCloseNavigationButton` component.
   */
  closeNavProps?: PropsWithRef<
    Required<LayoutNavigationProps>["closeNavProps"],
    HTMLButtonElement
  >;

  /**
   * This is the most important prop within the `Layout` if you want to have a
   * navigation tree. This prop should normally be created by using the
   * `useLayoutNavigation` hook but you can always provide any additional props
   * that are required to style or customize your tree.
   *
   * Example:
   *
   * ```tsx
   * <Layout
   *   treeProps={useLayoutNavigation(navItems, window.location.pathname)}
   *   {...props}
   * />
   * ```
   *
   * or with additional props:
   *
   * ```tsx
   * <Layout
   *   treeProps={{
   *     ...useLayoutNavigation(navItems, window.location.pathname),
   *     ...otherTreeProps
   *   }}
   *   {...props}
   * />
   * ```
   *
   * Please see the `useLayoutNavigation` hook for additional documentation.
   */
  treeProps?: PropsWithRef<LayoutTreeProps<T>, HTMLUListElement>;
}
