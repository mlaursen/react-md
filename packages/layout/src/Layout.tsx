import React, { CSSProperties, FC, ReactNode, Ref, useMemo } from "react";
import cn from "classnames";
import { useIcon } from "@react-md/icon";
import { SkipToMainContent } from "@react-md/link";
import { bem, useIsUserInteractionMode } from "@react-md/utils";

import defaultNavigationItemRenderer from "./defaultNavigationItemRenderer";
import LayoutAppBar from "./LayoutAppBar";
import LayoutNavigation from "./LayoutNavigation";
import {
  LayoutAppBarProps,
  LayoutConfiguration,
  LayoutNavigationProps,
} from "./types";
import useLayout, {
  DEFAULT_DESKTOP_LAYOUT,
  DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  DEFAULT_PHONE_LAYOUT,
  DEFAULT_TABLET_LAYOUT,
  isToggleableLayout,
} from "./useLayout";
import { Provider } from "./useNavigationVisibility";

export interface LayoutProps
  extends LayoutConfiguration,
    LayoutAppBarProps,
    LayoutNavigationProps {
  /**
   * The base id to use for everything within the layout component. The `id`
   * will be applied to:
   *
   * - the main `AppBarTitle` as `${id}-title`
   * - the main `AppBarNav` as `${id}-nav`
   * - the `<main>` element as `${id}-main`
   */
  id?: string;

  /**
   * The children to display within the layout. This is pretty much required
   * since you'll have an empty app otherwise, but it's left as optional just
   * for prototyping purposes.
   */
  children?: ReactNode;

  /**
   * If the default app bar configuration doesn't allow you enough control due
   * to lacking props or styling, you can provide your own `AppBar`
   * implementation by using this render prop. It will replace the default
   * `AppBar` and provide the required styles and state for the `AppBar` and
   * controlling the main navigation element.
   */
  appBar?: ReactNode;

  /**
   * An optional ref to apply to the `AppBar` component.
   */
  appBarRef?: Ref<HTMLDivElement>;

  /**
   * An optional style to apply to the `AppBar` component.
   */
  appBarStyle?: CSSProperties;

  /**
   * An optional className to apply to the `AppBar` component.
   */
  appBarClassName?: string;

  /**
   * Boolean if the main app bar should appear after the navigation component.
   * It is generally recommended to enable this prop if the navigation component
   * as a focusable element in the header since it will have a better tab focus
   * order.
   */
  appBarAfterNav?: boolean;

  /**
   * An optional ref to apply to the `<main>` element.
   */
  mainRef?: Ref<HTMLDivElement>;

  /**
   * An optional style to apply to the `<main>` element.
   */
  mainStyle?: CSSProperties;

  /**
   * An optional className to apply to the `<main>` element.
   */
  mainClassName?: string;

  /**
   * The component to render the main element as. This should normally stay as
   * the default of `"main"`, but if you want to have multiple `Layout` on the
   * page for some reason, you'll need to use `"div"` for the other `Layout`s
   * since you can only have one `<main>` per page (unless you set the `hidden`
   * attribute on all the others).
   */
  mainComponent?: "main" | "div";
}

const main = bem("rmd-layout-main");

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
  appBarTheme = "primary",
  appBarAfterNav = false,
  fixedAppBar = true,
  fixedAppBarElevation = true,
  denseAppBar = false,
  navIcon: propNavIcon,
  navIconLabel = "Navigation toggle",
  navIconLabelledBy,
  appBarTitle,
  appBarChildren,
  appBarRef,
  appBarStyle,
  appBarClassName,
  mainRef,
  mainStyle,
  mainClassName,
  navTreeLabel = "Navigation tree",
  hideNavLabel = "Hide navigation",
  sheetLabel = "Navigation",
  phoneLayout = DEFAULT_PHONE_LAYOUT,
  tabletLayout = DEFAULT_TABLET_LAYOUT,
  landscapeTabletLayout = DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  desktopLayout = DEFAULT_DESKTOP_LAYOUT,
  largeDesktopLayout,
  children,
  navItems,
  itemRenderer = defaultNavigationItemRenderer,
  mainComponent: Main = "main",
  labelKey = "children",
  valueKey = "children",
  disableTemporaryAutoclose = false,
  ...props
}) => {
  const {
    showNav,
    hideNav,
    layout,
    isNavVisible,
    isFullHeight,
    isPersistent,
  } = useLayout({
    phoneLayout,
    tabletLayout,
    landscapeTabletLayout,
    desktopLayout,
    largeDesktopLayout,
  });

  const mainId = `${id}-main`;
  // this makes it so that the SkipToMainContent button can still
  // focus the `<main>` element, but the `<main>` will no longer be
  // focused if the user clicks inside. This is super nice since one
  // of my bigger patterns is to click somewhere then press tab to
  // focus a specific element. Without this fix, the first element in
  // the `<main>` tag would be focused instead of the closest focusable
  // element to the click area.
  let mainTabIndex: number | undefined;
  if (useIsUserInteractionMode("keyboard")) {
    mainTabIndex = -1;
  }

  const navIcon = useIcon("menu", propNavIcon);
  const value = useMemo(
    () => ({
      showNav,
      hideNav,
      layout,
      isNavVisible,
      isFullHeight,
      isPersistent,
    }),
    [hideNav, isFullHeight, isNavVisible, isPersistent, layout, showNav]
  );

  let appBar = propAppBar;
  if (typeof propAppBar === "undefined") {
    appBar = (
      <LayoutAppBar
        style={appBarStyle}
        className={appBarClassName}
        layoutId={id}
        theme={appBarTheme}
        dense={denseAppBar}
        fixed={fixedAppBar}
        fixedElevation={fixedAppBarElevation}
        appBarTitle={appBarTitle}
        appBarRef={appBarRef}
        navIcon={navIcon}
        navIconLabel={navIconLabel}
        navIconLabelledBy={navIconLabelledBy}
      >
        {appBarChildren}
      </LayoutAppBar>
    );
  }

  return (
    <Provider value={value}>
      <SkipToMainContent mainId={mainId} />
      {!appBarAfterNav && appBar}
      <LayoutNavigation
        {...props}
        fixedAppBar={fixedAppBar}
        layoutId={id}
        navItems={navItems}
        navTreeLabel={navTreeLabel}
        hideNavLabel={hideNavLabel}
        sheetLabel={sheetLabel}
        itemRenderer={itemRenderer}
        labelKey={labelKey}
        valueKey={valueKey}
        disableTemporaryAutoclose={disableTemporaryAutoclose}
      />
      {appBarAfterNav && appBar}
      <Main
        id={mainId}
        ref={mainRef}
        tabIndex={mainTabIndex}
        style={mainStyle}
        className={cn(
          main({
            offset: fixedAppBar,
            "nav-offset":
              isPersistent || (isNavVisible && isToggleableLayout(layout)),
          }),
          mainClassName
        )}
      >
        {children}
      </Main>
    </Provider>
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
      appBar: PropTypes.node,
      appBarTheme: PropTypes.oneOf([
        "primary",
        "secondary",
        "default",
        "clear",
      ]),
      fixedAppBar: PropTypes.bool,
      fixedAppBarElevation: PropTypes.bool,
      denseAppBar: PropTypes.bool,
      appBarTitle: PropTypes.node,
      appBarChildren: PropTypes.node,
      navIcon: PropTypes.node,
      navIconLabel: PropTypes.string,
      navIconLabelledBy: PropTypes.string,
      hideNavIcon: PropTypes.node,
      hideNavLabel: PropTypes.string,
      hideNavLabelledBy: PropTypes.string,
      appBarRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      appBarStyle: PropTypes.object,
      appBarClassName: PropTypes.string,
      appBarAfterNav: PropTypes.bool,

      navTreeLabel: PropTypes.string,
      navTreeLabelledBy: PropTypes.string,
      sheetLabel: PropTypes.string,
      sheetLabelledBy: PropTypes.string,

      mainRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      mainStyle: PropTypes.object,
      mainClassName: PropTypes.string,
      mainComponent: PropTypes.oneOf(["main", "div"]),
      children: PropTypes.node,
      phoneLayout: PropTypes.oneOf(phoneLayouts),
      tabletLayout: PropTypes.oneOf(tabletLayouts),
      landscapeTabletLayout: PropTypes.oneOf(wideLayouts),
      desktopLayout: PropTypes.oneOf(wideLayouts),
      largeDesktopLayout: PropTypes.oneOf(wideLayouts),

      labelKey: PropTypes.string,
      valueKey: PropTypes.string,
      itemRenderer: PropTypes.func,
      navItems: PropTypes.object.isRequired,

      disableTemporaryAutoclose: PropTypes.bool,
    };
  } catch (e) {}
}

export default Layout;
