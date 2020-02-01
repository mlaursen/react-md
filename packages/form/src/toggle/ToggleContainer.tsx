import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export interface ToggleContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the input toggle should be rendered as `inline-flex` instead of
   * `flex`.
   */
  inline?: boolean;

  /**
   * Boolean if the label should be stacked above/below the input toggle instead
   * of being rendered on the same line.
   */
  stacked?: boolean;
}

const block = bem("rmd-toggle-container");

/**
 * @private
 */
function ToggleContainer(
  {
    className,
    inline = false,
    stacked = false,
    children,
    ...props
  }: ToggleContainerProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(block({ stacked, inline }), className)}
    >
      {children}
    </div>
  );
}

const ForwardedToggleContainer = forwardRef<
  HTMLDivElement,
  ToggleContainerProps
>(ToggleContainer);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedToggleContainer.propTypes = {
      inline: PropTypes.bool,
      stacked: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedToggleContainer;
