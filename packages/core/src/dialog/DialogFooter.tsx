import { type HTMLAttributes, type ReactElement, type Ref } from "react";

import { type DialogFooterClassNameOptions, dialogFooter } from "./styles.js";

export interface DialogFooterProps
  extends HTMLAttributes<HTMLDivElement>, DialogFooterClassNameOptions {
  ref?: Ref<HTMLDivElement>;
}

/**
 * The `DialogFooter` is a simple `<footer>` with simple `display: flex` styles
 * applied. Look at the `Dialog` or `FixedDialog` components for example usage.
 *
 * @see {@link https://react-md.dev/components/dialog | Dialog Demos}
 */
export const DialogFooter = function DialogFooter(
  props: DialogFooterProps
): ReactElement {
  const { ref, children, className, align = "end", ...remaining } = props;

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
};
