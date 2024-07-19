import { forwardRef, type HTMLAttributes } from "react";
import {
  textContainer,
  type TextContainerClassNameOptions,
} from "./textContainerStyles.js";

/**
 * @since 6.0.0 Removed the `size` option since there is no longer a
 * different line-length for mobile and desktop.
 * @since 6.0.0 Removed the `clone` prop and the children render function
 * behavior. Use the `textContainer` class name utility instead.
 */
export interface TextContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    TextContainerClassNameOptions {}

/**
 * This component should be used to render text based content with an
 * appropriate max line length to optimize legibility.
 *
 * @example Simple Example
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
 *
 * @see {@link textContainer} If you only want to apply this class to an
 * element.
 * @since 6.0.0 Removed the `size` option since there is no longer a
 * different line-length for mobile and desktop.
 * @since 6.0.0 Removed the `clone` prop and the children render function
 * behavior. Use the `textContainer` class name utility instead.
 */
export const TextContainer = forwardRef<HTMLDivElement, TextContainerProps>(
  function TextContainer(props, ref) {
    const { className, children, ...remaining } = props;

    return (
      <div {...remaining} ref={ref} className={textContainer({ className })}>
        {children}
      </div>
    );
  }
);
