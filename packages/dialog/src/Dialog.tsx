import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Sheet, SheetProps } from "@react-md/sheet";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface DialogProps extends SheetProps {
  fullPage?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<DialogProps, "fullPage">>;
type WithDefaultProps = DialogProps & DefaultProps & WithRef;

const block = bem("rmd-dialog");

const Dialog: FunctionComponent<DialogProps & WithRef> = providedProps => {
  const {
    children,
    forwardedRef,
    className,
    fullPage,
    ...props
  } = providedProps as WithDefaultProps;
  return (
    <Sheet
      {...props}
      role="dialog"
      ref={forwardedRef}
      className={cn(block({ fullPage }), className)}
    >
      {children}
    </Sheet>
  );
};

const defaultProps: DefaultProps = {
  fullPage: false,
};

Dialog.defaultProps = defaultProps;

export default Dialog;
