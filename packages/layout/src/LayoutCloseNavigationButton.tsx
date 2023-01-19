import { Button, useIcon } from "@react-md/core";
import type { MouseEvent } from "react";
import { forwardRef, useCallback } from "react";

import { useLayoutConfig } from "./LayoutProvider";
import type { LayoutCloseNavigationButtonProps } from "./types";
import { isToggleableLayout } from "./utils";

/**
 * The `LayoutCloseNavigationButton` is used to close the navigation panel for
 * toggleable layouts.
 */
export const LayoutCloseNavigationButton = forwardRef<
  HTMLButtonElement,
  LayoutCloseNavigationButtonProps
>(function LayoutCloseNavigationButton(props, ref) {
  const {
    id: propId,
    "aria-labelledby": ariaLabelledBy,
    "aria-label": ariaLabel = ariaLabelledBy ? undefined : "Hide Navigation",
    onClick,
    buttonType = "icon",
    children: propChildren,
    rendered,
    ...remaining
  } = props;

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
    <Button
      {...remaining}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      ref={ref}
      buttonType={buttonType}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
});
