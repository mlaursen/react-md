import { forwardRef } from "react";
import {
  Typography,
  type CustomTypographyComponent,
  type TypographyHTMLElement,
  type TypographyProps,
} from "./Typography.js";
import { cssUtils } from "../cssUtils.js";

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
        className={cssUtils({
          srOnly: focusable ? "focusable" : true,
          className,
        })}
      >
        {children}
      </Typography>
    );
  }
);
