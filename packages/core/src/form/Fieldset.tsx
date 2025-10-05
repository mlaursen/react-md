import { type FieldsetHTMLAttributes, forwardRef } from "react";

import { type FieldsetClassNameOptions, fieldset } from "./fieldsetStyles.js";

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
 * import { Form } from "@react-md/core/form/Form";
 * import { Fieldset } from "@react-md/core/form/Fieldset";
 * import { Legend } from "@react-md/core/form/Legend";
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
 *
 * @example Floating Legend Example
 * ```tsx
 * import { Form } from "@react-md/core/form/Form";
 * import { Fieldset } from "@react-md/core/form/Fieldset";
 * import { Legend } from "@react-md/core/form/Legend";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Form>
 *       <Fieldset floatingLegend>
 *         <Legend floating>Some Title</Legend>
 *         // form components
 *       </Fieldset>
 *     </Form>
 *   );
 * }
 * ```
 * ```
 *
 * @see {@link https://react-md.dev/components/fieldset | Fieldset Demos}
 */
export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function Fieldset(props, ref) {
    const {
      className,
      fullWidth,
      browserStyles,
      floatingLegend,
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
          floatingLegend,
        })}
      >
        {children}
      </fieldset>
    );
  }
);
