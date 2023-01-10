import type { BoxJustifyContent, BoxProps } from "@react-md/core";
import { Box } from "@react-md/core";
import { forwardRef } from "react";
import { cardFooter } from "./styles";

/** @remarks \@since 6.0.0 */
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
 * @remarks \@since 6.0.0
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
