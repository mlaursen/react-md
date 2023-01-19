import { cnb } from "cnbuilder";
import type { FieldsetHTMLAttributes } from "react";
import { forwardRef } from "react";
import { bem } from "../utils";

const styles = bem("rmd-fieldset");

/** @remarks \@since 6.0.0 */
export interface FieldsetClassNameOptions {
  className?: string;

  /**
   * Set this to `true` to enable the default browser styles for a fieldset.
   *
   * @remarks \@since 6.0.0 This was renamed from `unstyled`.
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

/**
 * @remarks \@since 6.0.0 Removed the `legend`, `legendStyle`,
 * `legendClassName`, and `legendSROnly` props. You must provide a `Legend`
 * yourself manually instead of using a prop.
 */
export interface FieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement>,
    FieldsetClassNameOptions {}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { Form, Fieldset, Legend } from "@react-md/fcore";
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
