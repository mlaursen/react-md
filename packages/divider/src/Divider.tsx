import React, { ElementType, forwardRef, FC, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export type DividerElement = HTMLHRElement | HTMLDivElement;

export interface DividerProps extends HTMLAttributes<DividerElement> {
  /**
   * Boolean if the divider should appear inset instead of full width. This
   * really just applied a margin-left (or margin-right when dir="rtl").
   *
   * If you want to create a divider that is centered, you most likely want
   * to use the `rmd-divider-theme-update-var` mixin instead to update the
   * `max-size` of the divider.
   */
  inset?: boolean;

  /**
   * Boolean if the divider should be vertical instead of horizontal. This
   * will change the divider to be rendered as a `<div>` instead of an `<hr>`.
   *
   * Note: If your parent element of the divider does not have a static height set,
   * you **must** manually set the height of the divider to a static non-percentage
   * number OR use the `VerticalDivider` component instead to automagically create
   * a valid percentage height.
   */
  vertical?: boolean;
}

type WithRef = WithForwardedRef<DividerElement>;
type DefaultProps = Required<Pick<DividerProps, "inset" | "vertical">>;
type WithDefaultProps = DividerProps & DefaultProps & WithRef;

const block = bem("rmd-divider");

const Divider: FC<DividerProps & WithRef> = providedProps => {
  const {
    inset,
    vertical,
    forwardedRef,
    className,
    ...props
  } = providedProps as WithDefaultProps;

  const Component = (vertical ? "div" : "hr") as ElementType;

  return (
    <Component
      {...props}
      ref={forwardedRef}
      className={cn(block({ inset: !vertical && inset, vertical }), className)}
    />
  );
};

const defaultProps: DefaultProps = {
  inset: false,
  vertical: false,
};

Divider.defaultProps = defaultProps;
if (process.env.NODE_ENV !== "production") {
  Divider.displayName = "Divider";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Divider.propTypes = {
      inset: PropTypes.bool,
      vertical: PropTypes.bool,
    };
  }
}

export default forwardRef<DividerElement, DividerProps>((props, ref) => (
  <Divider {...props} forwardedRef={ref} />
));
