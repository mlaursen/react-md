import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

type WithRef = WithForwardedRef<HTMLDivElement>;

const block = bem("rmd-dialog");

/**
 * This component doesn't do anything to complex. It really just applies custom styles
 * so that when the `DialogContent` component is used, the header will be "fixed" to the
 * top of the dialog while the content scrolls. It also applies some minimal padding.
 */
const DialogHeader: FC<DialogHeaderProps & WithRef> = ({
  children,
  className,
  forwardedRef,
  ...props
}) => (
  <header
    {...props}
    className={cn(block("header"), className)}
    ref={forwardedRef}
  >
    {children}
  </header>
);

if (process.env.NODE_ENV !== "production") {
  DialogHeader.displayName = "DialogHeader";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    DialogHeader.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    };
  }
}

export default forwardRef<HTMLDivElement, DialogHeaderProps>((props, ref) => (
  <DialogHeader {...props} forwardedRef={ref} />
));
