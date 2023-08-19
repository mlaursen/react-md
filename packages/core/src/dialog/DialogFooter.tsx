import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { DialogFooterClassNameOptions } from "./styles.js";
import { dialogFooter } from "./styles.js";

export interface DialogFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    DialogFooterClassNameOptions {}

/**
 * **Server Component**
 *
 * Look at the `Dialog` or `FixedDialog` components for example usage.
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
