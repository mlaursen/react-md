import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  forwardRef,
} from "react";

import { formMessageCounter } from "./formMessageStyles.js";

/** @since 2.9.0 */
export interface FormMessageCounterProps
  extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The children to display in the counter. This is normally a string like:
   *
   * @example String Example
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
 * @example Example Usage
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
 * @see {@link https://react-md.dev/components/form-message | FormMessage Demos}
 * @see {@link https://react-md.dev/components/text-field | TextField Demos}
 * @since 2.9.0
 * @since 6.3.0 Supports refs.
 */
export const FormMessageCounter = forwardRef<
  HTMLSpanElement,
  FormMessageCounterProps
>(function FormMessageCounter(props, ref): ReactElement {
  const { children, className, ...remaining } = props;

  return (
    <span
      ref={ref}
      {...remaining}
      className={formMessageCounter({ className })}
    >
      {children}
    </span>
  );
});
