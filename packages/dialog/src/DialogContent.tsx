import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the default padding for the content should be removed. This is
   * helpful when the child elements already have the required padding (such as lists).
   * In all other cases, it is recommended to apply a custom className with the
   * padding overrides instead.
   */
  disablePadding?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<DialogContentProps, "disablePadding">>;
type WithDefaultProps = DialogContentProps & DefaultProps & WithRef;

const block = bem("rmd-dialog");

/**
 * This component is used to render the main content within a dialog. There are really
 * only benefits when using the component alongside the `DialogHeader` and/or `DialogFooter`
 * since it is set up so only the content will scroll while the header and footer will
 * be "fixed".
 */
const DialogContent: FC<DialogContentProps & WithRef> = providedProps => {
  const {
    children,
    className,
    forwardedRef,
    disablePadding,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <div
      {...props}
      className={cn(
        block("content", {
          padded: !disablePadding,
        }),
        className
      )}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
};

const defaultProps: DefaultProps = {
  disablePadding: false,
};

DialogContent.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  DialogContent.displayName = "DialogContent";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    DialogContent.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      disablePadding: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => (
  <DialogContent {...props} forwardedRef={ref} />
));
