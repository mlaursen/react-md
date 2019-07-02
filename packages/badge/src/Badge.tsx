import React, { FC, HTMLAttributes, forwardRef, ReactNode } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

import isEmpty from "./isEmpty";

export type BadgeTheme = "primary" | "secondary" | "default" | "clear";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The id for the badge. This is required for a11y since the element that
   * the badge is fixed to should include this id in the `aria-describedby`
   * list.
   */
  id: string;

  /**
   * The theme to use for the badge.
   */
  theme?: BadgeTheme;

  /**
   * The children to display in the badge. If the children is `0` or `null`,
   * the default behavior is to not render the badge.
   */
  children?: ReactNode;

  /**
   * Boolean if the badge should still display if the children is set to `0`, or `null`.
   * The default behavior is to render null for these cases since it isn't extremely
   * helpful to display an "empty" badge.
   */
  disableNullOnZero?: boolean;
}

type WithRef = WithForwardedRef<HTMLSpanElement>;
type DefaultProps = Required<
  Pick<BadgeProps, "theme" | "children" | "disableNullOnZero">
>;
type WithDefaultProps = BadgeProps & DefaultProps & WithRef;

const block = bem("rmd-badge");

const Badge: FC<BadgeProps & WithRef> = providedProps => {
  const {
    className,
    theme,
    forwardedRef,
    children,
    disableNullOnZero,
    ...props
  } = providedProps as WithDefaultProps;

  if (isEmpty(children, disableNullOnZero)) {
    return null;
  }

  return (
    <span
      {...props}
      className={cn(block({ [theme]: theme !== "clear" }), className)}
      ref={forwardedRef}
    >
      {children}
    </span>
  );
};

const defaultProps: DefaultProps = {
  theme: "default",
  children: null,
  disableNullOnZero: false,
};

Badge.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Badge.displayName = "Badge";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Badge.propTypes = {
      id: PropTypes.string.isRequired,
      theme: PropTypes.oneOf(["primary", "secondary", "default", "clear"]),
      children: PropTypes.node,
      disableNullOnZero: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => (
  <Badge {...props} forwardedRef={ref} />
));
