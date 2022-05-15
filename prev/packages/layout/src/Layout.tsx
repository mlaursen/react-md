import type { ReactNode, ReactElement } from "react";
import type { BaseTreeItem } from "@react-md/tree";
import type { PropsWithRef } from "@react-md/utils";

import {
  DEFAULT_DESKTOP_LAYOUT,
  DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  DEFAULT_PHONE_LAYOUT,
  DEFAULT_TABLET_LAYOUT,
} from "./constants";
import type { LayoutChildrenProps } from "./LayoutChildren";
import { LayoutChildren } from "./LayoutChildren";
import type { LayoutAppBarProps } from "./LayoutAppBar";
import type { LayoutNavigationProps } from "./LayoutNavigation";
import type { LayoutWithNavToggle } from "./LayoutNavToggle";
import { LayoutProvider } from "./LayoutProvider";
import type { LayoutTreeProps } from "./LayoutTree";
import type {
  LayoutConfiguration,
  LayoutNavigationItem,
  LayoutWithTitle,
} from "./types";

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
  T extends BaseTreeItem = LayoutNavigationItem
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

export interface LayoutProps<T extends BaseTreeItem = LayoutNavigationItem>
  extends LayoutConfiguration,
    LayoutChildrenProps<T> {}

/**
 * The layout to use for your app. There are 9 different types of layouts
 * supported out of the box that work for a decent amount of apps out of the
 * box.
 *
 * Note: You will need to ensure that the base `Configuration` component is a
 * parent of this `Layout` component to work since it relies on the
 * `AppSizeContext` for automatically updating the layout based on media
 * queries.
 */
export function Layout({
  id = "layout",
  phoneLayout = DEFAULT_PHONE_LAYOUT,
  tabletLayout = DEFAULT_TABLET_LAYOUT,
  landscapeTabletLayout = DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  desktopLayout = DEFAULT_DESKTOP_LAYOUT,
  largeDesktopLayout,
  defaultToggleableVisible = false,
  ...props
}: LayoutProps): ReactElement {
  return (
    <LayoutProvider
      baseId={id}
      fixedAppBar={
        props.appBarProps?.fixed ?? typeof props.appBar === "undefined"
      }
      phoneLayout={phoneLayout}
      tabletLayout={tabletLayout}
      landscapeTabletLayout={landscapeTabletLayout}
      desktopLayout={desktopLayout}
      largeDesktopLayout={largeDesktopLayout}
      defaultToggleableVisible={defaultToggleableVisible}
    >
      <LayoutChildren id={id} {...props} />
    </LayoutProvider>
  );
}
