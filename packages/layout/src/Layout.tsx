import React, { CSSProperties, FC, ReactNode, Ref, useMemo } from "react";
import cn from "classnames";
import { FontIcon } from "@react-md/icon";
import { SkipToMainContent } from "@react-md/link";
import { bem, useInteractionModeContext } from "@react-md/utils";

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
    | "hideNavIcon"
    | "hideNavLabel"
    | "navTreeLabel"
    | "sheetLabel"
    | "phoneLayout"
    | "tabletLayout"
    | "landscapeTabletLayout"
    | "desktopLayout"
    | "itemRenderer"
    | "labelKey"
    | "valueKey"
    | "mainComponent"
    | "disableTemporaryAutoclose"
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
    appBar: propAppBar,
    appBarTheme,
    fixedAppBar,
    denseAppBar,
    navIcon,
    navIconLabel,
    navIconLabelledBy,
    appBarTitle,
    appBarChildren,
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
  if (useInteractionModeContext() === "keyboard") {
    mainTabIndex = -1;
  }

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
        fixed={fixedAppBar}
        dense={denseAppBar}
        appBarTitle={appBarTitle}
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
      {appBar}
      <LayoutNavigation
        {...props}
        fixedAppBar={fixedAppBar}
        layoutId={id}
        navItems={navItems}
      />
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

const defaultProps: DefaultProps = {
  id: "layout",
  appBarTheme: "primary",
  fixedAppBar: true,
  denseAppBar: false,
  navIcon: <FontIcon>menu</FontIcon>,
  navIconLabel: "Navigation toggle",
  navTreeLabel: "Navigation tree",
  hideNavIcon: <FontIcon>keyboard_arrow_left</FontIcon>,
  hideNavLabel: "Hide navigation",
  sheetLabel: "Navigation",
  phoneLayout: DEFAULT_PHONE_LAYOUT,
  tabletLayout: DEFAULT_TABLET_LAYOUT,
  landscapeTabletLayout: DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  desktopLayout: DEFAULT_DESKTOP_LAYOUT,
  itemRenderer: defaultNavigationItemRenderer,
  mainComponent: "main",
  labelKey: "children",
  valueKey: "children",
  disableTemporaryAutoclose: false,
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
      appBar: PropTypes.node,
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
      navIconLabelledBy: PropTypes.string,
      hideNavIcon: PropTypes.node,
      hideNavLabel: PropTypes.string,
      hideNavLabelledBy: PropTypes.string,
      appBarRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      appBarStyle: PropTypes.object,
      appBarClassName: PropTypes.string,

      navStyle: PropTypes.object,
      navClassName: PropTypes.string,
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

      disableTemporaryAutoclose: PropTypes.bool,
    };
  }
}

export default Layout;
