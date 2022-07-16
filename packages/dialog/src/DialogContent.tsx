import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { DialogContentCLassNameOptions } from "./styles";
import { dialogContent } from "./styles";

export interface DialogContentProps
  extends HTMLAttributes<HTMLDivElement>,
    DialogContentCLassNameOptions {}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(
    { children, className, disablePadding = false, ...props },
    ref
  ) {
    return (
      <div
        {...props}
        ref={ref}
        className={dialogContent({
          className,
          disablePadding,
        })}
      >
        {children}
      </div>
    );
  }
);
