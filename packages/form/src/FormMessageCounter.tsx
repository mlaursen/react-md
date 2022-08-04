import type { HTMLAttributes, ReactElement, ReactNode } from "react";

import { formMessageCounter } from "./formMessageStyles";

/** @remarks \@since 2.9.0 */
export interface FormMessageCounterProps
  extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The children to display in the counter. This is normally a string like:
   *
   * @example
   * String Example
   * ```ts
   * `${min} / ${max}`
   * ```
   */
  children: ReactNode;
}

/**
 * This component can be used to create a "counter" within the
 * {@link FormMessage} component.
 *
 * Note: This is really only useful when using the {@link FormMessage} component
 * without a {@link TextField}.
 *
 * @example
 * Example Usage
 * ```ts
 * interface ExampleProps {
 *   min: number;
 *   max: number;
 * }
 *
 * function Example({ min, max }: ExampleProps) {
 *   return (
 *     <FormMessage disableWrap>
 *       <FormMessageCounter>
 *         {`${min} / ${max}`}
 *       </FormMessageCounter>
 *     </FormMessage>
 *   );
 * }
 * ```
 *
 * @remarks \@since 2.9.0
 */
export function FormMessageCounter(
  props: FormMessageCounterProps
): ReactElement {
  const { children, className, ...remaining } = props;

  return (
    <span {...remaining} className={formMessageCounter({ className })}>
      {children}
    </span>
  );
}
