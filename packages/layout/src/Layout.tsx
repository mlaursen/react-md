import React, { CSSProperties, FC, Fragment, ReactNode, Ref } from "react";
import cn from "classnames";
import { FontIcon } from "@react-md/icon";
import { SkipToMainContent } from "@react-md/link";
import { bem, useInteractionModeContext } from "@react-md/utils";

import {
  DEFAULT_DESKTOP_LAYOUT,
  DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  DEFAULT_PHONE_LAYOUT,
  DEFAULT_TABLET_LAYOUT,
} from "./getLayout";
import LayoutAppBar from "./LayoutAppBar";
import LayoutNavigation from "./LayoutNavigation";
import {
  LayoutAppBarProps,
  LayoutAppBarRenderer,
  LayoutConfiguration,
  LayoutNavigationProps,
} from "./types";
import useLayout from "./useLayout";
import defaultNavigationItemRenderer from "./defaultNavigationItemRenderer";

export interface LayoutProps
  extends LayoutConfiguration,
    LayoutAppBarProps,
    LayoutNavigationProps {
  /**
   * The base id to use for everything within the layout component. The `id` will
   * be applied to:
   *
   * - the main `AppBarTitle` as `${id}-title`
   * - the main `AppBarNav` as `${id}-nav`
   * - the `<main>` element as `${id}-main`
   */
  id?: string;

  /**
   * The children to display within the layout. This is pretty much required since
   * you'll have an empty app otherwise, but it's left as optional just for prototyping
   * purposes.
   */
  children?: ReactNode;

  /**
   * If the default app bar configuration doesn't allow you enough control due to lacking
   * props or styling, you can provide your own `AppBar` implementation by using this render
   * prop. It will replace the default `AppBar` and provide the required styles and state
   * for the `AppBar` and controlling the main navigation element.
   */
  appBarRenderer?: LayoutAppBarRenderer;

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
   * The component to render the main element as. This should normally stay as the default
   * of `"main"`, but if you want to have multiple `Layout` on the page for some reason,
   * you'll need to use `"div"` for the other `Layout`s since you can only have one `<main>`
   * per page (unless you set the `hidden` attribute on all the others).
   */
  mainComponent?: "main" | "div";
}

type DefaultProps = Required<
  Pick<
    LayoutProps,
    | "id"
    | "appBarTheme"
    | "fixedAppBar"
    | "denseAppBar"
    | "navIcon"
    | "navIconLabel"
    | "navLabel"
    | "sheetLabel"
    | "phoneLayout"
    | "tabletLayout"
    | "landscapeTabletLayout"
    | "desktopLayout"
    | "itemRenderer"
    | "labelKey"
    | "valueKey"
    | "mainComponent"
  >
>;
type WithDefaultProps = LayoutProps & DefaultProps;

const main = bem("rmd-layout-main");

/**
 * The layout to use for your app. There are 9 different types of layouts supported
 * out of the box that work for a decent amount of apps out of the box.
 *
 * Note: You will need to ensure that the base `Configuration` component is a parent
 * of this `Layout` component to work since it relies on the `AppSizeContext` for
 * automatically updating the layout based on media queries.
 */
const Layout: FC<LayoutProps> = providedProps => {
  const {
    id,
    appBarTheme,
    fixedAppBar,
    denseAppBar,
    navIcon,
    navIconLabel,
    appBarTitle,
    appBarChildren,
    appBarRenderer,
    appBarRef,
    appBarStyle,
    appBarClassName,
    mainRef,
    mainStyle,
    mainClassName,
    phoneLayout,
    tabletLayout,
    landscapeTabletLayout,
    desktopLayout,
    largeDesktopLayout,
    children,
    navItems,
    mainComponent: Main,
    ...props
  } = providedProps as WithDefaultProps;
  const {
    isFullHeight,
    isPersistent,
    showNav,
    hideNav,
    isNavVisible,
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
  if (useInteractionModeContext() === "keyboard") {
    mainTabIndex = -1;
  }

  return (
    <Fragment>
      <SkipToMainContent mainId={mainId} />
      <LayoutAppBar
        offset={isFullHeight}
        renderer={appBarRenderer}
        layoutId={id}
        theme={appBarTheme}
        fixed={fixedAppBar}
        dense={denseAppBar}
        isPersistent={isPersistent}
        navIcon={navIcon}
        navIconLabel={navIconLabel}
        appBarTitle={appBarTitle}
        showNav={showNav}
        isNavVisible={isNavVisible}
        style={appBarStyle}
        className={appBarClassName}
      >
        {appBarChildren}
      </LayoutAppBar>
      <LayoutNavigation
        {...props}
        offset={fixedAppBar && !isFullHeight}
        layoutId={id}
        navItems={navItems}
        visible={isNavVisible}
        hideNav={hideNav}
        isPersistent={isPersistent}
      />
      <Main
        id={mainId}
        ref={mainRef}
        tabIndex={mainTabIndex}
        style={mainStyle}
        className={cn(
          main({
            offset: fixedAppBar,
            "nav-offset": isPersistent,
          }),
          mainClassName
        )}
      >
        {children}
      </Main>
    </Fragment>
  );
};

const defaultProps: DefaultProps = {
  id: "layout",
  appBarTheme: "primary",
  fixedAppBar: true,
  denseAppBar: false,
  navIcon: <FontIcon>menu</FontIcon>,
  navIconLabel: "Navigation toggle",
  navLabel: "Navigation tree",
  sheetLabel: "Navigation",
  phoneLayout: DEFAULT_PHONE_LAYOUT,
  tabletLayout: DEFAULT_TABLET_LAYOUT,
  landscapeTabletLayout: DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  desktopLayout: DEFAULT_DESKTOP_LAYOUT,
  itemRenderer: defaultNavigationItemRenderer,
  mainComponent: "main",
  labelKey: "children",
  valueKey: "children",
};

Layout.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Layout.displayName = "Layout";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
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
      appBarTheme: PropTypes.oneOf([
        "primary",
        "secondary",
        "default",
        "clear",
      ]),
      fixedAppBar: PropTypes.bool,
      denseAppBar: PropTypes.bool,
      appBarTitle: PropTypes.node,
      appBarChildren: PropTypes.node,
      navIcon: PropTypes.node,
      navIconLabel: PropTypes.string,
      appBarRenderer: PropTypes.func,
      appBarRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      appBarStyle: PropTypes.object,
      appBarClassName: PropTypes.string,

      navLabel: PropTypes.string,
      navLabelledBy: PropTypes.string,
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
    };
  }
}

export default Layout;
