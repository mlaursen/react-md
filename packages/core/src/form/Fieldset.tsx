import { cnb } from "cnbuilder";
import { type FieldsetHTMLAttributes, forwardRef } from "react";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-fieldset");

/** @since 6.0.0 */
export interface FieldsetClassNameOptions {
  className?: string;

  /**
   * Set this to `true` to enable the default browser styles for a fieldset.
   *
   * @since 6.0.0 This was renamed from `unstyled`.
   * @defaultValue `false`
   */
  browserStyles?: boolean;

  /**
   * @defaultValue `false`
   */
  fullWidth?: boolean;
}

/**
 * @since 6.0.0
 */
export function fieldset(options: FieldsetClassNameOptions = {}): string {
  const { className, fullWidth, browserStyles = false } = options;

  return cnb(
    styles({ unstyled: !browserStyles, "full-width": fullWidth }),
    className
  );
}

/**
 * @since 6.0.0 Removed the `legend`, `legendStyle`,
 * `legendClassName`, and `legendSROnly` props. You must provide a `Legend`
 * yourself manually instead of using a prop.
 */
export interface FieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement>,
    FieldsetClassNameOptions {}

/**
 * @example Simple Example
 * ```tsx
 * import { Form, Fieldset, Legend } from "@react-md/core";
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
    const {
      className,
      fullWidth = false,
      browserStyles = false,
      children,
      ...remaining
    } = props;

    return (
      <fieldset
        {...remaining}
        ref={ref}
        className={fieldset({
          className,
          fullWidth,
          browserStyles,
        })}
      >
        {children}
      </fieldset>
    );
  }
);
