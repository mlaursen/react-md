import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { bem } from "../utils";

const styles = bem("rmd-text-container");

/**
 * A union of the available text container sizes. One of these values must be
 * chosen to help set the max width for text.
 */
export type TextContainerSize = "auto" | "mobile" | "desktop";

export interface TextContainerClassNameOptions {
  /**
   * @defaultValue `"auto"`
   * @see {@link TextContainerSize}
   */
  size?: TextContainerSize;

  /**
   * An optional className to merge with typography text container styles.
   */
  className?: string;
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { getTextContainerClassName, Typography } from "@react-md/core";
 *
 * function Example() {
 *   return (
 *     <main className={getTextContainerClassName()}>
 *       <Typography type="headline-1">Heading</Typography>
 *       <Typography>
 *         Pretend this is a giant paragraph of text that wraps multiple lines.
 *       </Typography>
 *       <Typography>
 *         Pretend this is another giant paragraph of text that wraps multiple
 *         lines.
 *       </Typography>
 *     </main>
 *   ):
 * }
 * ```
 *
 * @param options - An optional object of options used to create the text
 * container class name.
 * @returns the text container class name
 * @see {@link TextContainer}
 * @remarks \@since 6.0.0
 */
export function textContainer(
  options: TextContainerClassNameOptions = {}
): string {
  const { size = "auto", className } = options;

  return cnb(styles({ [size]: true }), className);
}

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
