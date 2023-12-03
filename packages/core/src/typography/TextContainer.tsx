import { cnb } from "cnbuilder";
import { forwardRef, type HTMLAttributes } from "react";
import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-line-length"?: string | number;
    "--rmd-text-container-padding"?: string | number;
  }
}

const styles = bem("rmd-text-container");

/**
 * @remarks \@since 6.0.0
 */
export interface TextContainerClassNameOptions {
  /**
   * An optional className to merge with typography text container styles.
   */
  className?: string;
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { textContainer, Typography } from "@react-md/core";
 *
 * function Example() {
 *   return (
 *     <main className={textContainer()}>
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
 * @remarks \@since 6.0.0
 */
export function textContainer(
  options: TextContainerClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles(), cssUtils({ fullWidth: true }), className);
}

/**
 * @remarks \@since 6.0.0 Removed the `size` option since there is no longer a
 * different line-length for mobile and desktop.
 */
export interface TextContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    TextContainerClassNameOptions {}

/**
 * **Server Component**
 *
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
 *
 * @see {@link textContainer} If you only want to apply this class to an
 * element.
 * @remarks \@since 6.0.0 Removed the `size` option since there is no longer a
 * different line-length for mobile and desktop.
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
