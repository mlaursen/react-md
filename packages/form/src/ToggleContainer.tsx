import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface ToggleContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the input toggle should be rendered as `flex` instead of
   * `inline-flex`.
   */
  fullWidth?: boolean;

  /**
   * Boolean if the label should be stacked above/below the input toggle instead
   * of being rendered on the same line.
   */
  stacked?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<ToggleContainerProps, "fullWidth" | "stacked">
>;
type WithDefaultProps = ToggleContainerProps & DefaultProps & WithRef;

const block = bem("rmd-form-toggle-container");

/**
 * @private
 */
const ToggleContainer: FC<ToggleContainerProps & WithRef> = providedProps => {
  const {
    className,
    fullWidth,
    stacked,
    forwardedRef,
    children,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        block({
          stacked,
          "full-width": fullWidth,
        }),
        className
      )}
    >
      {children}
    </div>
  );
};

const defaultProps: DefaultProps = {
  fullWidth: false,
  stacked: false,
};

ToggleContainer.defaultProps = defaultProps;

export default forwardRef<HTMLDivElement, ToggleContainerProps>(
  (props, ref) => <ToggleContainer {...props} forwardedRef={ref} />
);
