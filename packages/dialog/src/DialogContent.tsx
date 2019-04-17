import React, { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {}

type WithRef = WithForwardedRef<HTMLDivElement>;

const block = bem("rmd-dialog");

const DialogContent: FunctionComponent<DialogContentProps & WithRef> = ({
  children,
  className,
  forwardedRef,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(block("content"), className)}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
};

export default forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => (
  <DialogContent {...props} forwardedRef={ref} />
));
