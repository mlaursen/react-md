import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { isEmpty } from "./isEmpty";

export type BadgeTheme = "primary" | "secondary" | "default" | "clear";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The id for the badge. This is required for a11y since the element that the
   * badge is fixed to should include this id in the `aria-describedby` list.
   */
  id: string;

  /**
   * The theme to use for the badge.
   */
  theme?: BadgeTheme;

  /**
   * The children to display in the badge. If the children is `0` or `null`, the
   * default behavior is to not render the badge.
   */
  children?: ReactNode;

  /**
   * Boolean if the badge should still display if the children is set to `0`, or
   * `null`.  The default behavior is to render null for these cases since it
   * isn't extremely helpful to display an "empty" badge.
   */
  disableNullOnZero?: boolean;
}

const block = bem("rmd-badge");

/**
 * This component is generally used for displaying notifications with a count
 * relative to another element with the `BadgeContainer` component. However, it
 * can be used by itself to display any subpplementary content if needed.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    className,
    theme = "default",
    children = null,
    disableNullOnZero = false,
    ...props
  },
  ref
) {
  if (isEmpty(children, disableNullOnZero)) {
    return null;
  }

  return (
    <span
      {...props}
      ref={ref}
      className={cn(block({ [theme]: theme !== "clear" }), className)}
    >
      {children}
    </span>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Badge.propTypes = {
      id: PropTypes.string.isRequired,
      theme: PropTypes.oneOf(["primary", "secondary", "default", "clear"]),
      className: PropTypes.string,
      children: PropTypes.node,
      disableNullOnZero: PropTypes.bool,
    };
  } catch (e) {}
}
