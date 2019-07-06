import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

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

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<ToggleContainerProps, "inline" | "stacked">>;
type WithDefaultProps = ToggleContainerProps & DefaultProps & WithRef;

const block = bem("rmd-toggle-container");

/**
 * @private
 */
const ToggleContainer: FC<ToggleContainerProps & WithRef> = providedProps => {
  const {
    className,
    inline,
    stacked,
    forwardedRef,
    children,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(block({ stacked, inline }), className)}
    >
      {children}
    </div>
  );
};

const defaultProps: DefaultProps = {
  inline: false,
  stacked: false,
};

ToggleContainer.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  ToggleContainer.displayName = "ToggleContainer";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    ToggleContainer.propTypes = {
      inline: PropTypes.bool,
      stacked: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLDivElement, ToggleContainerProps>(
  (props, ref) => <ToggleContainer {...props} forwardedRef={ref} />
);
