import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import cn from "classnames";

export type CaptionProps = HTMLAttributes<HTMLTableCaptionElement>;

/**
 * This component is really just a simple wrapper for applying the `<caption>`
 * typography styles and probably doesn't have much real use if you don't use
 * captions.
 */
export const Caption = forwardRef<HTMLTableCaptionElement, CaptionProps>(
  function Caption({ className, children, ...props }, ref) {
    return (
      <caption {...props} ref={ref} className={cn("rmd-caption", className)}>
        {children}
      </caption>
    );
  }
);
