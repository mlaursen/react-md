import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { cnb } from "cnbuilder";

export type CaptionProps = HTMLAttributes<HTMLTableCaptionElement>;

/**
 * This component is really just a simple wrapper for applying the `<caption>`
 * typography styles and probably doesn't have much real use if you don't use
 * captions.
 */
export const Caption = forwardRef<HTMLTableCaptionElement, CaptionProps>(
  function Caption(props, ref) {
    const { className, children, ...remaining } = props;

    return (
      <caption
        {...remaining}
        ref={ref}
        className={cnb("rmd-caption", className)}
      >
        {children}
      </caption>
    );
  }
);
