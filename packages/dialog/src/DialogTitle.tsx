import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>;

type WithRef = WithForwardedRef<HTMLHeadingElement>;

const block = bem("rmd-dialog");

/**
 * This component adds some base styles to an `<h2>` element for a title within
 * a `Dialog`.
 */
const DialogTitle: FC<DialogTitleProps & WithRef> = ({
  children,
  className,
  forwardedRef,
  ...props
}) => (
  <h2 {...props} className={cn(block("title"), className)} ref={forwardedRef}>
    {children}
  </h2>
);

if (process.env.NODE_ENV !== "production") {
  DialogTitle.displayName = "DialogTitle";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    DialogTitle.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    };
  }
}

export default forwardRef<HTMLHeadingElement, DialogTitleProps>(
  (props, ref) => <DialogTitle {...props} forwardedRef={ref} />
);
