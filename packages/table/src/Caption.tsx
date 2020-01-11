import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

export type CaptionProps = HTMLAttributes<HTMLTableCaptionElement>;

type WithRef = WithForwardedRef<HTMLTableCaptionElement>;

/**
 * This component is really just a simple wrapper for applying the `<caption>`
 * typography styles and probably doesn't have much real use if you don't
 * use captions.
 */
const Caption: FC<CaptionProps & WithRef> = ({
  className,
  forwardedRef,
  children,
  ...props
}) => (
  <caption
    {...props}
    ref={forwardedRef}
    className={cn("rmd-caption", className)}
  >
    {children}
  </caption>
);

if (process.env.NODE_ENV !== "production") {
  Caption.displayName = "Caption";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Caption.propTypes = {
      className: PropTypes.string,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLTableCaptionElement, CaptionProps>(
  (props, ref) => <Caption {...props} forwardedRef={ref} />
);
