import { forwardRef } from "react";

import { Box, type BoxProps } from "../box/Box.js";
import { type BoxJustifyContent } from "../box/styles.js";
import { cardFooter } from "./styles.js";

/** @since 6.0.0 */
export interface CardFooterProps extends BoxProps {
  /**
   * @defaultValue `"flex-end"`
   */
  justify?: BoxJustifyContent;
}

/**
 * A simple wrapper around the {@link Box} component that applies additional
 * padding and applies `justify-content: flex-end;` by default.
 *
 * @see {@link https://next.react-md.dev/components/card | Card Demos}
 * @since 6.0.0
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter(props, ref) {
    const { className, children, justify = "flex-end", ...remaining } = props;

    return (
      <Box
        {...remaining}
        ref={ref}
        className={cardFooter({ className })}
        justify={justify}
      >
        {children}
      </Box>
    );
  }
);
