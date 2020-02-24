/* eslint-disable react/prop-types */
import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

export type BadgeContainerProps = HTMLAttributes<HTMLSpanElement>;

const block = bem("rmd-badge-container");

/**
 * This is a really simple component that will just allow you to position a
 * badge relative to another component.
 */
function BadgeContainer(
  { className, children, ...props }: BadgeContainerProps,
  ref?: Ref<HTMLSpanElement>
): ReactElement {
  return (
    <span {...props} className={cnb(block(), className)} ref={ref}>
      {children}
    </span>
  );
}

export default forwardRef<HTMLSpanElement, BadgeContainerProps>(BadgeContainer);
