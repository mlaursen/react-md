import { forwardRef, type HTMLAttributes } from "react";
import { dialogFooter, type DialogFooterClassNameOptions } from "./styles.js";

export interface DialogFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    DialogFooterClassNameOptions {}

/**
 * The `DialogFooter` is a simple `<footer>` with simple `display: flex` styles
 * applied. Look at the `Dialog` or `FixedDialog` components for example usage.
 */
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
