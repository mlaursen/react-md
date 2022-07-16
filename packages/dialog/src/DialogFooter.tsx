import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { DialogFooterClassNameOptions } from "./styles";
import { dialogFooter } from "./styles";

export interface DialogFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    DialogFooterClassNameOptions {}

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({ children, className, align = "end", ...props }, ref) {
    return (
      <footer
        {...props}
        ref={ref}
        className={dialogFooter({
          align,
          className,
        })}
      >
        {children}
      </footer>
    );
  }
);
