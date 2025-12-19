import { type ReactElement, type Ref } from "react";

import { Box, type BoxProps } from "../box/Box.js";
import { type BoxJustifyContent } from "../box/styles.js";
import { cardFooter } from "./styles.js";

/** @since 6.0.0 */
export interface CardFooterProps extends BoxProps {
  ref?: Ref<HTMLDivElement>;

  /**
   * @defaultValue `"flex-end"`
   */
  justify?: BoxJustifyContent;
}

/**
 * A simple wrapper around the {@link Box} component that applies additional
 * padding and applies `justify-content: flex-end;` by default.
 *
 * @see {@link https://react-md.dev/components/card | Card Demos}
 * @since 6.0.0
 */
export function CardFooter(props: CardFooterProps): ReactElement {
  const {
    ref,
    className,
    children,
    justify = "flex-end",
    ...remaining
  } = props;

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
