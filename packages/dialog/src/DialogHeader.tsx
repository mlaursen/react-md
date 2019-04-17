import React, { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

type WithRef = WithForwardedRef<HTMLDivElement>;

const block = bem("rmd-dialog");

const DialogHeader: FunctionComponent<DialogHeaderProps & WithRef> = ({
  children,
  className,
  forwardedRef,
  ...props
}) => {
  return (
    <header
      {...props}
      className={cn(block("header"), className)}
      ref={forwardedRef}
    >
      {children}
    </header>
  );
};

export default forwardRef<HTMLDivElement, DialogHeaderProps>((props, ref) => (
  <DialogHeader {...props} forwardedRef={ref} />
));
