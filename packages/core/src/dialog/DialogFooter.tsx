import { type HTMLAttributes, forwardRef } from "react";

import { type DialogFooterClassNameOptions, dialogFooter } from "./styles.js";

export interface DialogFooterProps
  extends HTMLAttributes<HTMLDivElement>, DialogFooterClassNameOptions {}

/**
 * The `DialogFooter` is a simple `<footer>` with simple `display: flex` styles
 * applied. Look at the `Dialog` or `FixedDialog` components for example usage.
 *
 * @see {@link https://react-md.dev/components/dialog | Dialog Demos}
 */
export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter(props, ref) {
    const { children, className, align = "end", ...remaining } = props;
    return (
      <footer
        {...remaining}
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
