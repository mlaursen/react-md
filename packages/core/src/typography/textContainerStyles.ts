import { cnb } from "cnbuilder";
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

  return cnb(styles(), className);
}
