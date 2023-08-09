import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import { Button } from "../button/Button";
import { useIcon } from "../icon/IconProvider";
import { DEFAULT_SHEET_TIMEOUT } from "../sheet/Sheet";
import { useCSSTransition } from "../transition/useCSSTransition";
import { useLayoutConfig } from "./LayoutProvider";
import { DEFAULT_LAYOUT_NAV_TOGGLE_CLASSNAMES } from "./constants";
import type { LayoutNavToggleProps } from "./types";
import { isTemporaryLayout, isToggleableLayout } from "./utils";

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
>(function LayoutNavToggle(props, nodeRef) {
  const {
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
    ...remaining
  } = props;

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
    className: cnb("rmd-layout-nav-toggle", className),
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
    typeof remaining["aria-labelledby"] === "undefined"
  ) {
    ariaLabel = isToggleable ? "Navigation" : "Show Navigation";
  }

  return (
    <Button
      id={`${baseId}-nav-toggle`}
      {...remaining}
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
    </Button>
  );
});
