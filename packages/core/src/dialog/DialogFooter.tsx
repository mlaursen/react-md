import { type HTMLAttributes, forwardRef } from "react";

import { type DialogFooterClassNameOptions, dialogFooter } from "./styles.js";

export interface DialogFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    DialogFooterClassNameOptions {}

/**
 * The `DialogFooter` is a simple `<footer>` with simple `display: flex` styles
 * applied. Look at the `Dialog` or `FixedDialog` components for example usage.
 *
 * @see {@link https://next.react-md.dev/components/dialog|Dialog Demos}
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
