import React, { forwardRef, FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface CardTitleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the title should be smaller than normal. You should usually
   * enable this prop when using the `CardSubtitle` with this component in
   * the `CardHeader`.
   */
  small?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<CardTitleProps, "small">>;
type WithDefaultProps = CardTitleProps & WithRef;

const block = bem("rmd-card");

const CardTitle: FunctionComponent<
  CardTitleProps & WithRef
> = providedProps => {
  const {
    className,
    forwardedRef,
    children,
    small,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <h5
      {...props}
      className={cn(block("title", { small }), className)}
      ref={forwardedRef}
    >
      {children}
    </h5>
  );
};

const defaultProps: DefaultProps = {
  small: false,
};

CardTitle.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  CardTitle.displayName = "CardTitle";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    CardTitle.propTypes = {
      small: PropTypes.bool,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLDivElement, CardTitleProps>((props, ref) => (
  <CardTitle {...props} forwardedRef={ref} />
));
