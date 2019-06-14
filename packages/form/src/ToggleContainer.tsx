import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface ToggleContainerProps extends HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
  stacked?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<ToggleContainerProps, "inline" | "stacked">>;
type WithDefaultProps = ToggleContainerProps & DefaultProps & WithRef;

const block = bem("rmd-form-toggle-container");

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

export default forwardRef<HTMLDivElement, ToggleContainerProps>(
  (props, ref) => <ToggleContainer {...props} forwardedRef={ref} />
);
