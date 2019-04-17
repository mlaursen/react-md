import React, { FunctionComponent, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

type WithRef = WithForwardedRef<HTMLHeadingElement>;

const block = bem("rmd-dialog");

const DialogTitle: FunctionComponent<DialogTitleProps & WithRef> = ({
  children,
  className,
  forwardedRef,
  ...props
}) => {
  return (
    <h2 {...props} className={cn(block("title"), className)} ref={forwardedRef}>
      {children}
    </h2>
  );
};

export default forwardRef<HTMLHeadingElement, DialogTitleProps>(
  (props, ref) => <DialogTitle {...props} forwardedRef={ref} />
);
