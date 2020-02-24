import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the default padding for the content should be removed. This is
   * helpful when the child elements already have the required padding (such as
   * lists).  In all other cases, it is recommended to apply a custom className
   * with the padding overrides instead.
   */
  disablePadding?: boolean;
}

const block = bem("rmd-dialog");

/**
 * This component is used to render the main content within a dialog. There are
 * really only benefits when using the component alongside the `DialogHeader`
 * and/or `DialogFooter` since it is set up so only the content will scroll
 * while the header and footer will be "fixed".
 */
function DialogContent(
  { children, className, disablePadding = false, ...props }: DialogContentProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  return (
    <div
      {...props}
      ref={ref}
      className={cnb(
        block("content", {
          padded: !disablePadding,
        }),
        className
      )}
    >
      {children}
    </div>
  );
}

const ForwardedDialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  DialogContent
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedDialogContent.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      disablePadding: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedDialogContent;
