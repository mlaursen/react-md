import React, { FC, ReactNode } from "react";
import { SkipToMainContent, SkipToMainContentProps } from "@react-md/link";
import { BaseTreeItem } from "@react-md/tree";
import { PropsWithRef } from "@react-md/utils";

import {
  DEFAULT_DESKTOP_LAYOUT,
  DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  DEFAULT_PHONE_LAYOUT,
  DEFAULT_TABLET_LAYOUT,
} from "./constants";
import LayoutAppBar, { LayoutAppBarProps } from "./LayoutAppBar";
import LayoutMain, { LayoutMainProps } from "./LayoutMain";
import LayoutNavigation, { LayoutNavigationProps } from "./LayoutNavigation";
import { LayoutWithNavToggle } from "./LayoutNavToggle";
import LayoutProvider from "./LayoutProvider";
import { LayoutTreeProps } from "./LayoutTree";
import {
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
 *   closeNavProps={{ disaled: true }}
 *   treeProps={useLayoutNavigation(navItems, window.location.pathname)}
 *   {...props}
 * />
 * ```
 */
export interface FlattenedLayoutComponentConfiguration<
  T extends BaseTreeItem = LayoutNavigationItem
> extends LayoutWithTitle, LayoutWithNavToggle {
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
   * `LayoutCloseNavigationButton` compoent.
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
    FlattenedLayoutComponentConfiguration<T> {
  /**
   * The base id to use for everything within the layout component. The `id`
   * will be applied to:
   *
   * - the `LayoutAppBar` as `${id}-header`
   * - the `AppBarTitle` as `${id}-title`
   * - the `LayoutNavToggle` as `${id}-nav-toggle`
   * - the `LayoutMain` element as `${id}-main`
   */
  id?: string;

  /**
   * The children to display within the layout. This is pretty much required
   * since you'll have an empty app otherwise, but it's left as optional just
   * for prototyping purposes.
   */
  children?: ReactNode;

  /**
   * Any additional props to provide to the `<SkipToMainContent />` link that is
   * automatically rendered in the layout.
   */
  skipProps?: Omit<SkipToMainContentProps, "mainId">;

  /**
   * Any optional props to provide to the `<main>` element of the page.
   */
  mainProps?: PropsWithRef<LayoutMainProps, HTMLDivElement>;

  /**
   * Boolean if the main app bar should appear after the navigation component.
   * It is generally recommended to enable this prop if the navigation component
   * as a focusable element in the header since it will have a better tab focus
   * order.
   */
  navAfterAppBar?: boolean;
}

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
const Layout: FC<LayoutProps> = ({
  id = "layout",
  appBar: propAppBar,
  appBarProps,
  navAfterAppBar = false,
  children,
  skipProps,
  mainProps,
  phoneLayout = DEFAULT_PHONE_LAYOUT,
  tabletLayout = DEFAULT_TABLET_LAYOUT,
  landscapeTabletLayout = DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  desktopLayout = DEFAULT_DESKTOP_LAYOUT,
  largeDesktopLayout,
  customTitle,
  title,
  titleProps,
  navToggle,
  navToggleProps,
  nav: propNav,
  navProps,
  navHeader,
  navHeaderProps,
  navHeaderTitle,
  navHeaderTitleProps,
  closeNav,
  closeNavProps,
  treeProps,
}) => {
  const fixedAppBar = appBarProps?.fixed ?? typeof propAppBar === "undefined";
  const mainId = mainProps?.id || `${id}-main`;

  let appBar = propAppBar;
  if (typeof appBar === "undefined") {
    appBar = (
      <LayoutAppBar
        {...appBarProps}
        customTitle={customTitle}
        title={title}
        titleProps={titleProps}
        navToggle={navToggle}
        navToggleProps={navToggleProps}
      />
    );
  }

  let nav = propNav;
  if (typeof nav === "undefined") {
    nav = (
      <LayoutNavigation
        header={navHeader}
        headerProps={navHeaderProps}
        headerTitle={navHeaderTitle}
        headerTitleProps={navHeaderTitleProps}
        closeNav={closeNav}
        closeNavProps={closeNavProps}
        treeProps={treeProps}
        {...navProps}
      />
    );
  }

  return (
    <LayoutProvider
      baseId={id}
      phoneLayout={phoneLayout}
      tabletLayout={tabletLayout}
      landscapeTabletLayout={landscapeTabletLayout}
      desktopLayout={desktopLayout}
      largeDesktopLayout={largeDesktopLayout}
    >
      <SkipToMainContent {...skipProps} mainId={mainId} />
      {navAfterAppBar && appBar}
      {nav}
      {!navAfterAppBar && appBar}
      <LayoutMain headerOffset={fixedAppBar} {...mainProps} id={mainId}>
        {children}
      </LayoutMain>
    </LayoutProvider>
  );
};

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");
    const phoneLayouts = ["temporary", "temporary-mini"];
    const tabletLayouts = [...phoneLayouts, "toggleable", "toggleable-mini"];
    const wideLayouts = [
      ...tabletLayouts,
      "clipped",
      "floating",
      "full-height",
    ];

    Layout.propTypes = {
      id: PropTypes.string,
      children: PropTypes.node,
      phoneLayout: PropTypes.oneOf(phoneLayouts),
      tabletLayout: PropTypes.oneOf(tabletLayouts),
      landscapeTabletLayout: PropTypes.oneOf(wideLayouts),
      desktopLayout: PropTypes.oneOf(wideLayouts),
      largeDesktopLayout: PropTypes.oneOf(wideLayouts),

      appBar: PropTypes.node,
      appBarProps: PropTypes.object,
      navAfterAppBar: PropTypes.bool,

      customTitle: PropTypes.node,
      title: PropTypes.node,
      titleProps: PropTypes.object,

      navToggle: PropTypes.node,
      navToggleProps: PropTypes.object,

      skipProps: PropTypes.object,
      nav: PropTypes.node,
      navProps: PropTypes.object,
      navHeader: PropTypes.node,
      navHeaderProps: PropTypes.object,
      navHeaderTitle: PropTypes.node,
      navHeaderTitleProps: PropTypes.object,
      closeNav: PropTypes.node,
      closeNavProps: PropTypes.object,
      treeProps: PropTypes.object,

      mainProps: PropTypes.object,
    };
  } catch (error) {}
}

export default Layout;
