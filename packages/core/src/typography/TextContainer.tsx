import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { TextContainerClassNameOptions } from "./styles";
import { textContainer } from "./styles";

export interface TextContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    TextContainerClassNameOptions {}

/**
 * This component should be used to render text based content with an
 * appropriate max line length to optimize legibility.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { TextContainer, Typography } from "@react-md/core";
 *
 * function Example() {
 *   return (
 *     <TextContainer>
 *       <Typography type="headline-1">Heading</Typography>
 *       <Typography>
 *         Pretend this is a giant paragraph of text that wraps multiple lines.
 *       </Typography>
 *       <Typography>
 *         Pretend this is another giant paragraph of text that wraps multiple
 *         lines.
 *       </Typography>
 *     </TextContainer>
 *   );
 * }
 * ```
 */
export const TextContainer = forwardRef<HTMLDivElement, TextContainerProps>(
  function TextContainer(props, ref) {
    const { size = "auto", className, children, ...remaining } = props;

    return (
      <div
        {...remaining}
        ref={ref}
        className={textContainer({ size, className })}
      >
        {children}
      </div>
    );
  }
);
