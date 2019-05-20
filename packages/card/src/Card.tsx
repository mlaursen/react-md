import React, { FunctionComponent, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the card should be raiseable when hovered.
   */
  raiseable?: boolean;

  /**
   * Boolean if the card should no longer be `display: inline-block`, but instead
   * `display: block; width: 100%;`.
   */
  fullWidth?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<CardProps, "raiseable" | "fullWidth">>;
type WithDefaultProps = CardProps & DefaultProps & WithRef;

const block = bem("rmd-card");

/**
 * This is the root card component that should be used along side all the
 * other card parts. It adds some general styles and elevation to help show
 * prominence.
 */
const Card: FunctionComponent<CardProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    children,
    raiseable,
    fullWidth,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <div
      {...props}
      className={cn(block({ raiseable, "full-width": fullWidth }), className)}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
};

const defaultProps: DefaultProps = {
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
      raiseable: PropTypes.bool,
      fullWidth: PropTypes.bool,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <Card {...props} forwardedRef={ref} />
));
