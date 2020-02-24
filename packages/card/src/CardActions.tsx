import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The alignment to use for the card actions. This is really just a simple
   * pass through to the `justify-content` flex property.
   */
  align?: "start" | "end" | "center";
}

const block = bem("rmd-card");

/**
 * This component is generally used to hold the main actions for the `Card`.
 * It's a good place to add additional buttons or expansion toggles.
 */
function CardActions(
  { className, align = "end", children, ...props }: CardActionsProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  return (
    <div
      {...props}
      ref={ref}
      className={cnb(
        block("actions", {
          [align]: align !== "end",
        }),
        className
      )}
    >
      {children}
    </div>
  );
}

const ForwardedCardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  CardActions
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedCardActions.propTypes = {
      align: PropTypes.oneOf(["start", "end", "center"]),
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedCardActions;
