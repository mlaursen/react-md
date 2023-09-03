import { forwardRef } from "react";
import { AppBar } from "../app-bar/AppBar.js";
import { LayoutAppBarTitle } from "./LayoutAppBarTitle.js";
import { LayoutNavToggle } from "./LayoutNavToggle.js";
import { useLayoutConfig } from "./LayoutProvider.js";
import type { LayoutAppBarProps } from "./types.js";

/**
 * This is the default implementation for an `AppBar` within the `Layout` that
 * will conditionally render the default `LayoutNavToggle` button and
 * `AppBarTitle` depending on specific props that were provided.
 */
export const LayoutAppBar = forwardRef<HTMLDivElement, LayoutAppBarProps>(
  function LayoutAppBar(props, ref) {
    const {
      children,
      position = "fixed",
      navToggle: propNavToggle,
      navToggleProps,
      customTitle,
      title: titleChildren,
      titleProps,
      scrollbarOffset = true,
      ...remaining
    } = props;
    const { baseId, layout } = useLayoutConfig();

    let nav = propNavToggle;
    if (typeof nav === "undefined") {
      // set the key to the current layout since we want the button to re-mount
      // on layout changes so the transition does not occur
      nav = <LayoutNavToggle key={layout} {...navToggleProps} />;
    }

    let title = customTitle;
    if (typeof title === "undefined") {
      title = (
        <LayoutAppBarTitle keyline={nav ? "nav" : undefined} {...titleProps}>
          {titleChildren}
        </LayoutAppBarTitle>
      );
    }

    return (
      <AppBar
        id={`${baseId}-header`}
        {...remaining}
        ref={ref}
        position={position}
        scrollbarOffset={scrollbarOffset}
      >
        {nav}
        {title}
        {children}
      </AppBar>
    );
  }
);