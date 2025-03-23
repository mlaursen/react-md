import { type HTMLAttributes, forwardRef } from "react";

import { dialogHeader } from "./styles.js";

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

/**
 * The `DialogHeader` component should be rendered within a `Dialog` component
 * and generally contains the `DialogTitle`. Look at the `Dialog` or
 * `FixedDialog` components for example usage.
 *
 * @see {@link https://next.react-md.dev/components/dialog|Dialog Demos}
 */
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader(props, ref) {
    const { children, className, ...remaining } = props;

    return (
      <div {...remaining} ref={ref} className={dialogHeader({ className })}>
        {children}
      </div>
    );
  }
);
