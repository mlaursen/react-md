import { forwardRef } from "react";
import { useIcon } from "@react-md/icon";

import type { InputToggleProps } from "./InputToggle";
import { InputToggle } from "./InputToggle";

export interface RadioProps extends InputToggleProps {
  /**
   * A value is required for a radio button unlike a checkbox.
   */
  value: readonly string[] | string | number;
}

/**
 * The `Radio` component is just a wrapper for the `InputToggle` that
 * defaults to reasonable defaults for a radio input.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { icon: propIcon, ...props },
  ref
) {
  const icon = useIcon("radio", propIcon);

  return <InputToggle {...props} icon={icon} ref={ref} type="radio" />;
});
