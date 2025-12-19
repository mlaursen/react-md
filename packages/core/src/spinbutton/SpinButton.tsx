"use client";

import { type HTMLAttributes, type ReactElement, type Ref } from "react";

import { type LabelRequiredForA11y } from "../types.js";
import { defaultGetSpinButtonTextContent } from "./defaults.js";
import {
  type SpinButtonOptions,
  type SpinButtonUncontrolledValueOptions,
} from "./types.js";
import { useSpinButton } from "./useSpinButton.js";

/**
 * @since 6.4.0
 */
export interface SpinButtonProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, keyof SpinButtonOptions>,
    Omit<SpinButtonOptions<HTMLDivElement>, "ref" | "children"> {
  ref?: Ref<HTMLDivElement>;
}

/**
 * The `SpinButton` component can be used as a simple wrapper around the
 * {@link useSpinButton} hook if it should be rendered within a `<div>` and
 * only the rendering behavior is required.
 *
 * @since 6.4.0
 */
export function SpinButton(
  props: LabelRequiredForA11y<SpinButtonProps>
): ReactElement {
  const {
    ref,
    id,
    min,
    max,
    minDigits,
    maxDigits,
    step,
    form,
    error,
    disabled,
    readOnly,
    required,
    fallback,
    mappings,
    value,
    defaultValue,
    onValueChange,
    getValueText,
    getTextContent = defaultGetSpinButtonTextContent,
    placeholderChar,
    defaultKeyboardValue,
    ...remaining
  } = props;

  const valueProps = {
    value,
    defaultValue,
  } as SpinButtonUncontrolledValueOptions<HTMLDivElement>;

  const { value: currentValue, spinButtonProps } = useSpinButton({
    id,
    ref,
    min,
    max,
    minDigits,
    maxDigits,
    step,
    form,
    fallback,
    mappings,
    error,
    disabled,
    readOnly,
    required,
    ...valueProps,
    onValueChange,
    getValueText,
    getTextContent,
    placeholderChar,
    defaultKeyboardValue,
  });

  return (
    <div {...remaining} {...spinButtonProps}>
      {getTextContent({
        min,
        max,
        minDigits,
        maxDigits,
        value: currentValue,
        fallback,
        placeholderChar,
      })}
    </div>
  );
}
