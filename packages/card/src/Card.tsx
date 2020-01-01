import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the card should gain additional box-shadow elevation once hovered.
   */
  raiseable?: boolean;

  /**
   * Boolean if the card should no longer be `display: inline-block`, but instead
   * `display: block; width: 100%;`.
   */
  fullWidth?: boolean;

  /**
   * Boolean if the card should use a border instead of box-shadow. Enabling this
   * prop will always disable the `raiseable` prop.
   */
  bordered?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<CardProps, "raiseable" | "bordered" | "fullWidth">
>;
type WithDefaultProps = CardProps & DefaultProps & WithRef;

const block = bem("rmd-card");

/**
 * This is the root card component that should be used along side all the
 * other card parts. It adds some general styles and elevation to help show
 * prominence.
 */
const Card: FC<CardProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    children,
    raiseable,
    fullWidth,
    bordered,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <div
      {...props}
      className={cn(
        block({
          bordered,
          shadowed: !bordered,
          raiseable: !bordered && raiseable,
          "full-width": fullWidth,
        }),
        className
      )}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
};

const defaultProps: DefaultProps = {
  bordered: false,
  raiseable: false,
  fullWidth: false,
};

Card.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Card.displayName = "Card";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Card.propTypes = {
      bordered: PropTypes.bool,
      raiseable: PropTypes.bool,
      fullWidth: PropTypes.bool,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <Card {...props} forwardedRef={ref} />
));
