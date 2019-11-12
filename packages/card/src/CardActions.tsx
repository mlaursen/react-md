import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The alignment to use for the card actions. This is really just a simple
   * pass through to the `justify-content` flex property.
   */
  align?: "start" | "end" | "center";
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<CardActionsProps, "align">>;
type WithDefaultProps = CardActionsProps & DefaultProps & WithRef;

const block = bem("rmd-card");

/**
 * This component is generally used to hold the main actions for the `Card`.
 * It's a good place to add additional buttons or expansion toggles.
 */
const CardActions: FC<CardActionsProps & WithRef> = providedProps => {
  const {
    className,
    align,
    children,
    forwardedRef,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <div
      {...props}
      className={cn(block("actions", { align: align !== "end" }), className)}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
};

const defaultProps: DefaultProps = {
  align: "end",
};

CardActions.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  CardActions.displayName = "CardActions";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    CardActions.propTypes = {
      align: PropTypes.oneOf(["start", "end", "center"]),
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLDivElement, CardActionsProps>((props, ref) => (
  <CardActions {...props} forwardedRef={ref} />
));
