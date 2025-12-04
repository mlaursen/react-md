import { type HTMLAttributes, forwardRef } from "react";

import { type DialogContentClassNameOptions, dialogContent } from "./styles.js";

export interface DialogContentProps
  extends HTMLAttributes<HTMLDivElement>, DialogContentClassNameOptions {}

/**
 * The `DialogContent` component should be used as a child of the `Dialog`
 * component that applies some reasonable default styles. Look at the `Dialog`
 * or `FixedDialog` components for example usage.
 *
 * @see {@link https://react-md.dev/components/dialog | Dialog Demos}
 */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(props, ref) {
    const { children, className, disablePadding = false, ...remaining } = props;
    return (
      <div
        {...remaining}
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
