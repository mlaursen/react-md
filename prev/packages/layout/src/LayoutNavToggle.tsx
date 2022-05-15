import type { ReactNode } from "react";
import { forwardRef } from "react";
import cn from "classnames";
import type { AppBarNavProps } from "@react-md/app-bar";
import { AppBarNav } from "@react-md/app-bar";
import { useIcon } from "@react-md/icon";
import { DEFAULT_SHEET_TIMEOUT } from "@react-md/sheet";
import type {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";
import { useCSSTransition } from "@react-md/transition";
import type { PropsWithRef } from "@react-md/utils";

import { DEFAULT_LAYOUT_NAV_TOGGLE_CLASSNAMES } from "./constants";
import { useLayoutConfig } from "./LayoutProvider";
import { isTemporaryLayout, isToggleableLayout } from "./utils";

export interface LayoutNavToggleProps extends AppBarNavProps {
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

/**
 * This is the default implementation for the navigation toggle button within
 * the `Layout` component and should normally be the first child for the
 * `LayoutAppBar`. In addition, this component will automatically update itself
 * to provide an accessible `aria-label` for screen readers and change to a
 * toggle button for toggleable layouts.
 */
export const LayoutNavToggle = forwardRef<
  HTMLButtonElement,
  LayoutNavToggleProps
>(function LayoutNavToggle(
  {
    "aria-label": propAriaLabel,
    "aria-pressed": propAriaPressed,
    children: propChildren,
    className,
    buttonType = "icon",
    onClick,
    offset: propOffset,
    rendered,
    tabIndex: propTabIndex,
    timeout = DEFAULT_SHEET_TIMEOUT,
    classNames = DEFAULT_LAYOUT_NAV_TOGGLE_CLASSNAMES,
    ...props
  },
  nodeRef
) {
  const icon = useIcon("menu");
  const { baseId, layout, showNav, hideNav, visible } = useLayoutConfig();
  const isToggleable = isToggleableLayout(layout);
  const isTemporary = isTemporaryLayout(layout);

  let isRendered = rendered;
  if (typeof isRendered === "undefined") {
    isRendered = isTemporary || isToggleable;
  }

  let offset = propOffset;
  if (typeof offset === "undefined") {
    offset = isToggleable && visible;
  }

  const { elementProps } = useCSSTransition<HTMLButtonElement>({
    nodeRef,
    transitionIn: offset,
    temporary: false,
    timeout,
    classNames,
    className: cn("rmd-layout-nav-toggle", className),
  });

  if (!isRendered) {
    return null;
  }

  let children = propChildren;
  if (buttonType === "icon" && typeof children === "undefined") {
    children = icon;
  }

  let tabIndex = propTabIndex;
  if (typeof tabIndex === "undefined" && visible && isToggleable) {
    // set to -1 so it isn't tab focusable but is still programmatically
    // focusable for temporary navigation drawers to re-focus once closed
    tabIndex = -1;
  }

  let ariaPressed = propAriaPressed;
  if (typeof ariaPressed === "undefined" && isToggleable) {
    ariaPressed = visible;
  }

  let ariaLabel = propAriaLabel;
  if (
    typeof ariaLabel === "undefined" &&
    typeof props["aria-labelledby"] === "undefined"
  ) {
    ariaLabel = isToggleable ? "Navigation" : "Show Navigation";
  }

  return (
    <AppBarNav
      id={`${baseId}-nav-toggle`}
      {...props}
      {...elementProps}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }

        if (!visible) {
          showNav();
        } else {
          hideNav();
        }
      }}
      buttonType={buttonType}
      tabIndex={tabIndex}
    >
      {children}
    </AppBarNav>
  );
});
