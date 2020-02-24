import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
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
function Card(
  {
    className,
    children,
    raiseable = false,
    fullWidth = false,
    bordered = false,
    ...props
  }: CardProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  return (
    <div
      {...props}
      ref={ref}
      className={cnb(
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
}

const ForwardedCard = forwardRef<HTMLDivElement, CardProps>(Card);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedCard.propTypes = {
      bordered: PropTypes.bool,
      raiseable: PropTypes.bool,
      fullWidth: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedCard;
