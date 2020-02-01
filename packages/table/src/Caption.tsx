import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import cn from "classnames";

export type CaptionProps = HTMLAttributes<HTMLTableCaptionElement>;

/**
 * This component is really just a simple wrapper for applying the `<caption>`
 * typography styles and probably doesn't have much real use if you don't use
 * captions.
 */
function Caption(
  { className, children, ...props }: CaptionProps,
  ref?: Ref<HTMLTableCaptionElement>
): ReactElement {
  return (
    <caption {...props} ref={ref} className={cn("rmd-caption", className)}>
      {children}
    </caption>
  );
}

const ForwardedCaption = forwardRef<HTMLTableCaptionElement, CaptionProps>(
  Caption
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedCaption.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedCaption;
