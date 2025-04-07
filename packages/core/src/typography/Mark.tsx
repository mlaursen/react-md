import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { mark } from "./markStyles.js";

/**
 * @since 6.0.0
 */
export interface MarkProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

/**
 * The `Mark` component can be used in place of the `mark` HTMLElement with
 * some default styles.
 *
 * @example Simple Example
 * ```tsx
 * import { Mark } from "@react-md/core/typography/Mark";
 *
 * export function Example() {
 *   return (
 *     <>
 *       Some text <Mark>that has highlights</Mark> and some other text.
 *     </>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export const Mark = forwardRef<HTMLElement, MarkProps>(
  function Mark(props, ref) {
    const { children, className, ...remaining } = props;
    return (
      <mark {...remaining} ref={ref} className={mark({ className })}>
        {children}
      </mark>
    );
  }
);
