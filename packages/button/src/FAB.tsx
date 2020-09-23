/* eslint-disable react/prop-types */
import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

/**
 * The position within the viewport for the floating action button.
 */
export type FABPosition =
  | null
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

export interface FABProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The position within the viewport to display the button as a floating action
   * button.
   */
  position?: FABPosition;
}

const styles = bem("rmd-fab");

/**
 * This is a simple wrapper for the `Button` component that will conditionally
 * render the `Button` in a `<span>` to render as a floating action button.
 *
 * Note: You probably don't really want to use this externally since this is
 * really just required so that the click and focus states behavior will still
 * be contained within the button. The states behavior requires
 * `position: relative` to work while changing into a floating action button
 * makes it `position: fixed`.
 */
export const FAB = forwardRef<HTMLSpanElement, FABProps>(function FAB(
  { position = null, children, className, ...props },
  ref
) {
  if (!position) {
    return <>{children}</>;
  }

  return (
    <span
      {...props}
      ref={ref}
      className={cn(
        styles({
          tl: position === "top-left",
          tr: position === "top-right",
          bl: position === "bottom-left",
          br: position === "bottom-right",
        }),
        className
      )}
    >
      {children}
    </span>
  );
});
