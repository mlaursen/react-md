import React, { FunctionComponent, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  stacked?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<DialogFooterProps, "stacked">>;
type WithDefaultProps = DialogFooterProps & DefaultProps & WithRef;

const block = bem("rmd-dialog");

const DialogFooter: FunctionComponent<
  DialogFooterProps & WithRef
> = providedProps => {
  const {
    children,
    className,
    forwardedRef,
    stacked,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <footer
      {...props}
      className={cn(block("footer", { stacked }), className)}
      ref={forwardedRef}
    >
      {children}
    </footer>
  );
};

export default forwardRef<HTMLDivElement, DialogFooterProps>((props, ref) => (
  <DialogFooter {...props} forwardedRef={ref} />
));
