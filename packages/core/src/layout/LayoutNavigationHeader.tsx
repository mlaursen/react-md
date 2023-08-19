import { cnb } from "cnbuilder";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import { AppBar } from "../app-bar/AppBar.js";
import { AppBarTitle } from "../app-bar/AppBarTitle.js";
import { bem } from "../utils/bem.js";
import { LayoutCloseNavigationButton } from "./LayoutCloseNavigationButton.js";
import { useLayoutConfig } from "./LayoutProvider.js";
import type { LayoutNavigationHeaderProps } from "./types.js";

const styles = bem("rmd-layout-nav-header");

/**
 * The default implementation for the `AppBar` within the `LayoutNavigation`
 * that allows for rendering a title along with the `LayoutCloseNavigationButton`.
 */
export const LayoutNavigationHeader = forwardRef<
  HTMLDivElement,
  LayoutNavigationHeaderProps
>(function LayoutNavigationHeader(props, ref) {
  const {
    theme = "clear",
    children,
    className,
    closeNav,
    closeNavProps,
    title: propTitle,
    titleProps,
    disableBorderBottom = false,
    ...remaining
  } = props;

  const { layout } = useLayoutConfig();
  if (layout === "clipped" || layout === "floating") {
    return null;
  }

  let title: ReactNode = null;
  if (propTitle) {
    title = (
      <AppBarTitle key="title" {...titleProps}>
        {propTitle}
      </AppBarTitle>
    );
  }

  let action = closeNav;
  if (typeof action === "undefined") {
    action = <LayoutCloseNavigationButton key="close" {...closeNavProps} />;
  }

  return (
    <AppBar
      {...remaining}
      ref={ref}
      theme={theme}
      className={cnb(styles({ bordered: !disableBorderBottom }), className)}
    >
      {title}
      {children}
      {action}
    </AppBar>
  );
});
