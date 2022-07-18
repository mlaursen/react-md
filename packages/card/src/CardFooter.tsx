import type { BoxJustifyContent, BoxProps } from "@react-md/core";
import { Box } from "@react-md/core";
import { forwardRef } from "react";
import { cardFooter } from "./styles";

export interface CardFooterProps extends BoxProps {
  /**
   * @defaultValue `"flex-end"`
   */
  justifyContent?: BoxJustifyContent;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter(props, ref) {
    const {
      className,
      children,
      justifyContent = "flex-end",
      ...remaining
    } = props;

    return (
      <Box
        {...remaining}
        ref={ref}
        className={cardFooter({ className })}
        justifyContent={justifyContent}
      >
        {children}
      </Box>
    );
  }
);
