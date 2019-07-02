import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface BadgeContainerProps extends HTMLAttributes<HTMLSpanElement> {}
type WithRef = WithForwardedRef<HTMLSpanElement>;

const block = bem("rmd-badge-container");

/**
 * This is a really simple component that will just allow you to position a badge
 * relative to another component.
 */
const BadgeContainer: FC<BadgeContainerProps & WithRef> = ({
  className,
  forwardedRef,
  children,
  ...props
}) => (
  <span {...props} className={cn(block(), className)} ref={forwardedRef}>
    {children}
  </span>
);

export default forwardRef<HTMLSpanElement, BadgeContainerProps>(
  (props, ref) => <BadgeContainer {...props} forwardedRef={ref} />
);
