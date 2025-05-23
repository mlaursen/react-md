import { forwardRef } from "react";

import { type CheckboxProps, InputToggle } from "./InputToggle.js";

/**
 * **Client Component**
 *
 * You'll generally want to use the `useCheckboxGroup` hook for managing the
 * checked state for groups of checkboxes and indeterminate checkbox behavior.
 *
 * @example Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { Checkbox } from "@react-md/core/form/Checkbox";
 *
 * function Example(): ReactElement {
 *   return <Checkbox label="Checkbox" value="a" />;
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/checkbox | Checkbox Demos}
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    return <InputToggle {...props} ref={ref} type="checkbox" />;
  }
);
