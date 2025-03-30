import { type ElementType, type HTMLAttributes, forwardRef } from "react";

import { cssUtils } from "../cssUtils.js";
import {
  type CustomTypographyComponent,
  type TypographyHTMLElement,
} from "./Typography.js";

export interface SrOnlyProps extends HTMLAttributes<TypographyHTMLElement> {
  /** @defaultValue `"span"` */
  as?: CustomTypographyComponent;

  /**
   * Set this to `true` if the content should only be screen reader only text on
   * phones. This is useful for only displaying an icon on phones when there is
   * limited space and then displaying an icon and text on larger devices.
   *
   * @defaultValue `false`
   */
  phoneOnly?: boolean;

  /**
   * Set this to `true` if the element should be keyboard focusable.
   *
   * @defaultValue `false`
   */
  focusable?: boolean;
}

/**
 * The `SrOnly` component is used to render content that is only visible to
 * screen readers.
 *
 * @example Simple Example
 * ```tsx
 * import { SrOnly } from "@react-md/core/typography/SrOnly";
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
 *
 * @see {@link https://next.react-md.dev/components/sr-only | SrOnly Demos}
 */
export const SrOnly = forwardRef<TypographyHTMLElement, SrOnlyProps>(
  function SrOnly(props, ref) {
    const {
      as: AsComponent = "span",
      className,
      phoneOnly,
      focusable,
      children,
      tabIndex,
      ...remaining
    } = props;

    // do some type-casting so ref works
    const Component = AsComponent as ElementType;

    return (
      <Component
        {...remaining}
        ref={ref}
        tabIndex={tabIndex ?? (focusable ? 0 : undefined)}
        className={cssUtils({
          srOnly: focusable ? "focusable" : phoneOnly ? "phone" : true,
          className,
        })}
      >
        {children}
      </Component>
    );
  }
);
