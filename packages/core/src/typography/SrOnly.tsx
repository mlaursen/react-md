import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import { bem } from "../utils/bem.js";
import type {
  CustomTypographyComponent,
  TypographyHTMLElement,
  TypographyProps,
} from "./Typography.js";
import { Typography } from "./Typography.js";

const styles = bem("rmd-sr-only");

/** @remarks \@since 6.0.0 */
export interface SrOnlyClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  focusable?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function srOnly(options: SrOnlyClassNameOptions = {}): string {
  const { className, focusable = false } = options;

  return cnb(styles({ focusable }), className);
}

export interface SrOnlyProps extends TypographyProps {
  /** @defaultValue `"span"` */
  as?: CustomTypographyComponent;

  /**
   * Set this to `true` if the element should be keyboard focusable.
   *
   * @defaultValue `false`
   */
  focusable?: boolean;
}

/**
 * **Server Component**
 *
 * @example
 * Simple Example
 * ```tsx
 * import { SrOnly } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <>
 *       <SrOnly>
 *         I am only visible to screen readers.
 *       </SrOnly>
 *       <SrOnly focusable>
 *         I am only visible to screen readers but can be focused.
 *       </SrOnly>
 *     </>
 *   );
 * }
 * ```
 */
export const SrOnly = forwardRef<TypographyHTMLElement, SrOnlyProps>(
  function SrOnly(props, ref) {
    const {
      as = "span",
      className,
      focusable,
      children,
      tabIndex,
      ...remaining
    } = props;

    return (
      <Typography
        {...remaining}
        as={as}
        ref={ref}
        tabIndex={tabIndex ?? (focusable ? 0 : undefined)}
        className={srOnly({ focusable, className })}
      >
        {children}
      </Typography>
    );
  }
);
