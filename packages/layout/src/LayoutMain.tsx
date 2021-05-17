import React, { forwardRef, HTMLAttributes, useRef } from "react";
import cn from "classnames";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { DEFAULT_SHEET_TIMEOUT } from "@react-md/sheet";
import { TransitionTimeout, useCSSTransition } from "@react-md/transition";
import { bem, useIsUserInteractionMode } from "@react-md/utils";

import { DEFAULT_LAYOUT_MAIN_CLASSNAMES } from "./constants";
import { useLayoutConfig } from "./LayoutProvider";
import { isTemporaryLayout, isToggleableLayout } from "./utils";

export interface LayoutMainProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The component to render the main element as. This should normally stay as
   * the default of `"main"`, but if you want to have multiple `Layout` on the
   * page for some reason, you'll need to use `"div"` for the other `Layout`s
   * since you can only have one `<main>` per page (unless you set the `hidden`
   * attribute on all the others).
   */
  component?: "div" | "main";

  /**
   * Boolean if the main element should be offset by the current navigation
   * tree's width.
   */
  navOffset?: boolean;

  /**
   * Boolean if the main element should be ofset by the `AppBar`'s height
   */
  headerOffset?: boolean;

  /**
   * Boolean of there is a mini nav visible within the layout. This makes sure
   * that the content if offset by the current nav's width when needed.
   *
   * @remarks \@since 2.7.0
   */
  mini?: boolean;

  /**
   * Boolean if the mini layout is currently hidden to help determine if
   * specific mini styles should be applied when the {@link LayoutContext.fixedAppBar}
   * config is `false`.
   *
   * @internal
   * @remarks \@since 2.8.3
   */
  miniHidden?: boolean;

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

const styles = bem("rmd-layout-main");

/**
 * This is the `<main>` element for your app that has some built in styles to be
 * able to update based on the current layout types.
 */
export const LayoutMain = forwardRef<HTMLDivElement, LayoutMainProps>(
  function LayoutMain(
    {
      className: propClassName,
      tabIndex: propTabIndex,
      component: Component = "main",
      navOffset: propNavOffset,
      headerOffset = false,
      timeout: propTimeout = DEFAULT_SHEET_TIMEOUT,
      classNames = DEFAULT_LAYOUT_MAIN_CLASSNAMES,
      mini = false,
      miniHidden = false,
      ...props
    },
    forwardedRef
  ) {
    // this makes it so that the SkipToMainContent button can still
    // focus the `<main>` element, but the `<main>` will no longer be
    // focused if the user clicks inside. This is super nice since one
    // of my bigger patterns is to click somewhere then press tab to
    // focus a specific element. Without this fix, the first element in
    // the `<main>` tag would be focused instead of the closest focusable
    // element to the click area.
    let tabIndex = propTabIndex;
    if (
      useIsUserInteractionMode("keyboard") &&
      typeof propTabIndex === "undefined"
    ) {
      tabIndex = -1;
    }

    const { layout, visible, fixedAppBar } = useLayoutConfig();
    let navOffset = propNavOffset;
    if (typeof navOffset === "undefined") {
      navOffset = visible && !isTemporaryLayout(layout);
    }

    let timeout = propTimeout;
    const prevLayout = useRef(layout);
    if (prevLayout.current !== layout) {
      // this is kind of weird and hacky, but this will allow for the required
      // classnames to be applied to the main element based on the current
      // layout type without needing a unique `key` for the main content. this
      // is super nice since we really don't want to remount the full app each
      // time the layout changes.
      timeout = 0;
    }

    const [, { ref, className }] = useCSSTransition<HTMLDivElement>({
      ref: forwardedRef,
      transitionIn: !!navOffset,
      temporary: false,
      className: propClassName,
      timeout,
      classNames,
      onEntered: () => {
        prevLayout.current = layout;
      },
      onExited: () => {
        prevLayout.current = layout;
      },
    });

    const isMini = mini && (fixedAppBar || miniHidden);
    const isMiniOffset =
      mini &&
      navOffset &&
      !fixedAppBar &&
      visible &&
      isToggleableLayout(layout);

    return (
      <Component
        {...props}
        ref={ref}
        tabIndex={tabIndex}
        className={cn(
          styles({
            mini: isMini && (isTemporaryLayout(layout) || !visible),
            "nav-offset": isMini,
            "mini-offset": isMiniOffset,
            "header-offset": headerOffset,
          }),
          className
        )}
      />
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    LayoutMain.propTypes = {
      component: PropTypes.oneOf(["div", "main"]),
      className: PropTypes.string,
      tabIndex: PropTypes.number,
      navOffset: PropTypes.bool,
      headerOffset: PropTypes.bool,
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          appear: PropTypes.number,
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      classNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          appear: PropTypes.string,
          appearActive: PropTypes.string,
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          enterDone: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
          exitDone: PropTypes.string,
        }),
      ]),
    };
  } catch (error) {}
}
