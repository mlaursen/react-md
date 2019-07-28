/* eslint-disable react/prop-types */
import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

export type BadgeContainerProps = HTMLAttributes<HTMLSpanElement>;
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
