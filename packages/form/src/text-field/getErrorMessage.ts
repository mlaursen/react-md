import { InputHTMLAttributes } from "react";

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
 * - `true` -> always show the browser message when it exists
 * - `false` -> never show the browser message
 * - `"recommended"` -> only shows the browser message if it is not one of the
 *   `RECOMMENDED_STATE_KEYS` validation errors
 * - `keyof ValidityState` -> only shows the browser message if it is not the
 *   specific validation error
 * - `(keyof ValidityState)[]` -> only shows the browser message if it is not
 *   the specific validation errors
 */
export type ChangeValidationBehavior =
  | boolean
  | "recommended"
  | keyof ValidityState
  | readonly (keyof ValidityState)[];

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
 * @param options An object containing metadata that can be used to create an
 * error message for your `TextField` or `TextArea`.
 * @return An error message to display or an empty string.
 */
export type GetErrorMessage = (options: ErrorMessageOptions) => string;

/** @internal */
const RECOMMENDED_STATE_KEYS: readonly (keyof ValidityState)[] = [
  "valueMissing",
  "tooShort",
  "tooLong",
  "badInput",
];

/**
 * The default implementation for getting an error message for the `TextField`
 * or `TextArea` components that:
 *
 * - prevents the browser `minLength` and `tooLong` error text from appearing
 *   during change events since the message is extremely verbose
 * - prevents the `valueMissing` and `badInput` error text from appearing during
 *   change events since it's better to wait for the blur event.
 *
 * The above behavior is also configured by the {@link ChangeValidationBehavior}.
 */
export const defaultGetErrorMessage: GetErrorMessage = ({
  isBlurEvent,
  validity,
  validationMessage,
  validateOnChange,
}) => {
  if (isBlurEvent || !validationMessage) {
    return validationMessage;
  }

  if (!validateOnChange) {
    return "";
  }

  let keys = RECOMMENDED_STATE_KEYS;
  if (
    typeof validateOnChange === "string" &&
    validateOnChange !== "recommended"
  ) {
    keys = [validateOnChange];
  } else if (Array.isArray(validateOnChange)) {
    keys = validateOnChange;
  }

  if (
    Object.entries(validity).some(
      ([key, value]) => value && !keys.includes(key as keyof ValidityState)
    )
  ) {
    return validationMessage;
  }

  return "";
};
