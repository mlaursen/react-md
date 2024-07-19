import { forwardRef, type HTMLAttributes } from "react";
import { dialogContent, type DialogContentClassNameOptions } from "./styles.js";

export interface DialogContentProps
  extends HTMLAttributes<HTMLDivElement>,
    DialogContentClassNameOptions {}

/**
 * The `DialogContent` component should be used as a child of the `Dialog`
 * component that applies some reasonable default styles. Look at the `Dialog`
 * or `FixedDialog` components for example usage.
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
