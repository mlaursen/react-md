import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>;

const block = bem("rmd-dialog");

/**
 * This component adds some base styles to an `<h2>` element for a title within
 * a `Dialog`.
 */
function DialogTitle(
  { children, className, ...props }: DialogTitleProps,
  ref?: Ref<HTMLHeadingElement>
): ReactElement {
  return (
    <h2 {...props} ref={ref} className={cnb(block("title"), className)}>
      {children}
    </h2>
  );
}

const ForwardedDialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  DialogTitle
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedDialogTitle.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedDialogTitle;
