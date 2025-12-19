import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { type MarkClassNameOptions, mark } from "./markStyles.js";

/**
 * @since 6.0.0
 * @since 6.3.1 Extends MarkClassNameOptions for CSSProperties module
 * augmentation.
 */
export interface MarkProps
  extends HTMLAttributes<HTMLElement>, MarkClassNameOptions {
  ref?: Ref<HTMLElement>;
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
 * @see {@link https://react-md.dev/components/mark | Mark Demos}
 * @since 6.0.0
 */
export function Mark(props: MarkProps): ReactElement {
  const { ref, children, className, ...remaining } = props;

  return (
    <mark {...remaining} ref={ref} className={mark({ className })}>
      {children}
    </mark>
  );
}
