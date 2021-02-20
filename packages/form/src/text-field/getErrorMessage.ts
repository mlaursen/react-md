import { InputHTMLAttributes } from "react";

/**
 * @remarks \@since 2.5.0
 */
export type TextConstraints = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "pattern" | "required" | "minLength" | "maxLength"
>;

/**
 * Since the default validation messages can be verbose, this type is used to
 * configure when/how to display the native browser messages when the validation
 * state changes during the `change` event phase. The validation message will
 * always be shown on blur.
 *
 * When this is:
 *
 * - `true` -&gt; always show the browser message when it exists
 * - `false` -&gt; never show the browser message
 * - `"recommended"` -&gt; only shows the browser message if it is not one of the
 *   `RECOMMENDED_IGNORED_KEYS` validation errors
 * - `keyof ValidityState` -&gt; only shows the browser message if it is not the
 *   specific validation error
 * - `(keyof ValidityState)[]` -&gt; only shows the browser message if it is not
 *   the specific validation errors
 *
 * @remarks \@since 2.5.0
 */
export type ChangeValidationBehavior =
  | boolean
  | "recommended"
  | "number-recommended"
  | keyof ValidityState
  | readonly (keyof ValidityState)[];

/**
 * @remarks \@since 2.5.0
 */
export interface ErrorMessageOptions extends TextConstraints {
  /**
   * The current input or textarea's validity state.
   */
  validity: ValidityState;

  /**
   * The browser defined validation message based on the validity state. This
   * will be the empty string when there are no errors.
   */
  validationMessage: string;

  /**
   * The current `TextField` or `TextArea` value.
   */
  value: string;

  /**
   * Boolean if this is triggered from a blur event instead of a change event.
   */
  isBlurEvent: boolean;

  /**
   * The change event validation behavior that is specified in the hook.
   */
  validateOnChange: ChangeValidationBehavior;
}

/**
 * A function to get a custom error message for specific errors. This is really
 * useful when using the `pattern` attribute to give additional information or
 * changing the native "language translated" error message.
 *
 * @param options - An object containing metadata that can be used to create an
 * error message for your `TextField` or `TextArea`.
 * @returns An error message to display or an empty string.
 * @remarks \@since 2.5.0
 */
export type GetErrorMessage = (options: ErrorMessageOptions) => string;

/**
 * @internal
 * @remarks \@since 2.5.0
 */
const VALIDITY_STATE_KEYS: readonly (keyof ValidityState)[] = [
  "badInput",
  "customError",
  "patternMismatch",
  "rangeOverflow",
  "rangeUnderflow",
  "stepMismatch",
  "tooLong",
  "tooShort",
  "typeMismatch",
  "valueMissing",
];

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export const RECOMMENDED_STATE_KEYS: readonly (keyof ValidityState)[] = [
  "badInput",
  "tooLong",
  "valueMissing",
];

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export const RECOMMENDED_NUMBER_STATE_KEYS: readonly (keyof ValidityState)[] = [
  ...RECOMMENDED_STATE_KEYS,
  "rangeOverflow",
  "rangeUnderflow",
  "tooShort",
  "typeMismatch",
];

/**
 * The validation message is actually kind of weird since it's possible for a
 * form element to have multiple errors at once. The validation message will be
 * the first error that appears, so need to make sure that the first error is
 * one of the recommended state keys so the message appears for only those types
 * of errors.
 *
 * @internal
 * @remarks \@since 2.5.0
 */
const isRecommended = (validity: ValidityState, isNumber: boolean): boolean => {
  const errorable = isNumber
    ? RECOMMENDED_NUMBER_STATE_KEYS
    : RECOMMENDED_STATE_KEYS;

  return VALIDITY_STATE_KEYS.every((key) => {
    const errored = validity[key];
    return !errored || errorable.includes(key);
  });
};

/**
 * The default implementation for getting an error message for the `TextField`
 * or `TextArea` components that relies on the behavior of the
 * {@link ChangeValidationBehavior}
 *
 * @remarks \@since 2.5.0
 */
export const defaultGetErrorMessage: GetErrorMessage = ({
  isBlurEvent,
  validity,
  validationMessage,
  validateOnChange,
}) => {
  if (isBlurEvent || !validationMessage || validateOnChange === true) {
    return validationMessage;
  }

  if (!validateOnChange) {
    return "";
  }

  if (
    validateOnChange === "recommended" ||
    validateOnChange === "number-recommended"
  ) {
    return isRecommended(validity, validateOnChange === "number-recommended")
      ? validationMessage
      : "";
  }

  const keys =
    typeof validateOnChange === "string"
      ? [validateOnChange]
      : validateOnChange;

  return keys.length &&
    VALIDITY_STATE_KEYS.some((key) => validity[key] && keys.includes(key))
    ? validationMessage
    : "";
};
