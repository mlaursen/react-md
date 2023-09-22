import { forwardRef, type HTMLAttributes } from "react";
import { dialogContent, type DialogContentClassNameOptions } from "./styles.js";

export interface DialogContentProps
  extends HTMLAttributes<HTMLDivElement>,
    DialogContentClassNameOptions {}

/**
 * **Server Component**
 *
 * Look at the `Dialog` or `FixedDialog` components for example usage.
 */
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
