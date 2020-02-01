import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

const block = bem("rmd-dialog");

/**
 * This component doesn't do anything to complex. It really just applies custom
 * styles so that when the `DialogContent` component is used, the header will be
 * "fixed" to the top of the dialog while the content scrolls. It also applies
 * some minimal padding.
 */
function DialogHeader(
  { children, className, ...props }: DialogHeaderProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  return (
    <header {...props} ref={ref} className={cn(block("header"), className)}>
      {children}
    </header>
  );
}

const ForwardedDialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  DialogHeader
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedDialogHeader.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedDialogHeader;
