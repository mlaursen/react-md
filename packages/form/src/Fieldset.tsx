import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { FieldsetHTMLAttributes } from "react";
import { forwardRef } from "react";

const styles = bem("rmd-fieldset");

/** @remarks \@since 6.0.0 */
export interface FieldsetClassNameOptions {
  className?: string;
  /**
   *
   * @defaultValue `false`
   */
  browserStyles?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function fieldset(options: FieldsetClassNameOptions = {}): string {
  const { className, browserStyles = false } = options;

  return cnb(styles({ unstyled: !browserStyles }), className);
}

export interface FieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement>,
    FieldsetClassNameOptions {}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { Form, Fieldset, Legend } from "@react-md/form";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Form>
 *       <Fieldset>
 *         <Legend>Some Title</Legend>
 *         // form components
 *       </Fieldset>
 *     </Form>
 *   );
 * }
 * ```
 */
export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function Fieldset(props, ref) {
    const { className, browserStyles = false, children, ...remaining } = props;

    return (
      <fieldset
        {...remaining}
        ref={ref}
        className={fieldset({
          className,
          browserStyles,
        })}
      >
        {children}
      </fieldset>
    );
  }
);
