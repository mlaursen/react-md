import { forwardRef } from "react";

import { Box, type BoxProps } from "../box/Box.js";
import { type BoxAlignItems } from "../box/styles.js";
import { dialogHeader } from "./styles.js";

/**
 * @since 6.0.0 Extends the `BoxProps`.
 */
export interface DialogHeaderProps extends BoxProps {
  /** @defaultValue `"center"` */
  align?: BoxAlignItems;

  /** @defaultValue `true` */
  disableWrap?: boolean;
}

/**
 * The `DialogHeader` component should be rendered within a `Dialog` component
 * and generally contains the `DialogTitle`. Look at the `Dialog` or
 * `FixedDialog` components for example usage.
 *
 * @see {@link https://next.react-md.dev/components/dialog | Dialog Demos}
 * @since 6.0.0 Extends the `Box` component.
 */
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader(props, ref) {
    const {
      align = "center",
      disableWrap = true,
      children,
      className,
      ...remaining
    } = props;

    return (
      <Box
        {...remaining}
        align={align}
        disableWrap={disableWrap}
        ref={ref}
        className={dialogHeader({ className })}
      >
        {children}
      </Box>
    );
  }
);
