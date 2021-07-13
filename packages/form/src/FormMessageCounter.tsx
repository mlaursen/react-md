import React, { HTMLAttributes, ReactElement, ReactNode } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

const block = bem("rmd-form-message");

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
export function FormMessageCounter({
  children,
  className,
  ...props
}: FormMessageCounterProps): ReactElement {
  return (
    <span {...props} className={cn(block("counter"), className)}>
      {children}
    </span>
  );
}
