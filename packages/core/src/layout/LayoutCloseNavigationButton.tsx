import type { MouseEvent } from "react";
import { forwardRef, useCallback } from "react";
import { Button } from "../button/Button.js";
import { useIcon } from "../icon/IconProvider.js";
import { useLayoutConfig } from "./LayoutProvider.js";
import type { LayoutCloseNavigationButtonProps } from "./types.js";
import { isToggleableLayout } from "./utils.js";

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
