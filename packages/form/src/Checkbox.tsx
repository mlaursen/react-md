import { forwardRef } from "react";
import type { CheckboxProps } from "./InputToggle";
import { InputToggle } from "./InputToggle";

/**
 * You'll generally want to use the `useCheckboxGroup` hook for managing the
 * checked state for groups of checkboxes and indeterminate checkbox behavior.
 *
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { Checkbox } from "@react-md/form";
 *
 * function Example(): ReactElement {
 *   return <Checkbox label="Checkbox" value="a" />;
 * }
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    return <InputToggle {...props} ref={ref} type="checkbox" />;
  }
);
