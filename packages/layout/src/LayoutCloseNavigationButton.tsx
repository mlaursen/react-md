import React, { forwardRef, MouseEvent, useCallback } from "react";
import { AppBarAction, AppBarActionProps } from "@react-md/app-bar";
import { useIcon } from "@react-md/icon";

import { useLayoutConfig } from "./LayoutProvider";
import { isToggleableLayout } from "./utils";

export interface LayoutCloseNavigationButtonProps extends AppBarActionProps {
  /**
   * Boolean if the button should be rendered. If this is omitted, it will only
   * be rendered for toggleable layouts.
   */
  rendered?: boolean;
}

/**
 * The `LayoutCloseNavigationButton` is used to close the navigation panel for
 * toggleable layouts.
 */
export const LayoutCloseNavigationButton = forwardRef<
  HTMLButtonElement,
  LayoutCloseNavigationButtonProps
>(function LayoutCloseNavigationButton(
  {
    id: propId,
    "aria-labelledby": ariaLabelledBy,
    "aria-label": ariaLabel = ariaLabelledBy ? undefined : "Hide Navigation",
    onClick,
    first = true,
    last = true,
    buttonType = "icon",
    children: propChildren,
    rendered,
    ...props
  },
  ref
) {
  const children = useIcon("back", propChildren);
  const { baseId, layout, hideNav } = useLayoutConfig();
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
      }

      hideNav();
    },
    [onClick, hideNav]
  );

  const id = propId ?? `${baseId}-nav-x`;
  const isRendered = rendered ?? isToggleableLayout(layout);
  if (!isRendered) {
    return null;
  }

  return (
    <AppBarAction
      {...props}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      ref={ref}
      first={first}
      last={last}
      buttonType={buttonType}
      onClick={handleClick}
    >
      {children}
    </AppBarAction>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    LayoutCloseNavigationButton.propTypes = {
      id: PropTypes.string,
      "aria-label": PropTypes.string,
      "aria-labelledby": PropTypes.string,
      first: PropTypes.bool,
      last: PropTypes.bool,
      onClick: PropTypes.func,
      children: PropTypes.node,
      buttonType: PropTypes.oneOf(["icon", "text"]),
      rendered: PropTypes.bool,
    };
  } catch (error) {}
}
