import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

const styles = bem("rmd-time-sep");

/** @remarks \@since 2.7.0 */
export type TimeSeparatorProps = HTMLAttributes<HTMLSpanElement>;

/** @remarks \@since 2.7.0 */
export const TimeSeparator = forwardRef<HTMLSpanElement, TimeSeparatorProps>(
  function TimeSeparator({ className, children = ":", ...props }, ref) {
    return (
      <span {...props} ref={ref} className={cn(styles(), className)}>
        {children}
      </span>
    );
  }
);
