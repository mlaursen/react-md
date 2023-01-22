import { forwardRef } from "react";
import type { RadioProps } from "./InputToggle";
import { InputToggle } from "./InputToggle";

/**
 * You'll generally want to use the `useRadioGroup` hook along with this
 * component.
 *
 * @example
 * Simple Example
 * ```tsx
 * const { value, getRadioProps } = useRadioGroup({ name: "group" });
 *
 * return (
 *   <>
 *     <Radio {...getRadioProps("a")} label="First" />
 *     <Radio {...getRadioProps("b")} label="Second" />
 *     <Radio {...getRadioProps("c")} label="Third" />
 *   </>
 * );
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  props,
  ref
) {
  return <InputToggle {...props} ref={ref} type="radio" />;
});