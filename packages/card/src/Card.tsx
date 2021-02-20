import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the card should gain additional box-shadow elevation once
   * hovered.
   */
  raiseable?: boolean;

  /**
   * Boolean if the card should no longer be `display: inline-block`, but
   * instead `display: block; width: 100%;`.
   */
  fullWidth?: boolean;

  /**
   * Boolean if the card should use a border instead of box-shadow. Enabling
   * this prop will always disable the `raiseable` prop.
   */
  bordered?: boolean;
}

const block = bem("rmd-card");

/**
 * This is the root card component that should be used along side all the other
 * card parts. It adds some general styles and elevation to help show
 * prominence.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className,
    children,
    raiseable = false,
    fullWidth = false,
    bordered = false,
    ...props
  },
  ref
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        block({
          bordered,
          shadowed: !bordered,
          raiseable: !bordered && raiseable,
          "full-width": fullWidth,
        }),
        className
      )}
    >
      {children}
    </div>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Card.propTypes = {
      className: PropTypes.string,
      bordered: PropTypes.bool,
      raiseable: PropTypes.bool,
      fullWidth: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}
