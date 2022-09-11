import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * @remarks \@since 2.5.6
 * @remarks \@since 6.0.0 Renamed from `TextConstraints` to
 * `TextFieldValidationOptions`
 */
export type TextFieldValidationOptions = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "minLength" | "maxLength" | "required" | "pattern"
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
 * - `"recommended"` -&gt; only shows the browser message if it is one of the
 *   `RECOMMENDED_STATE_KEYS`/`RECOMMENDED_NUMBER_STATE_KEYS` validation errors
 * - `keyof ValidityState` -&gt; only shows the browser message if it is not the
 *   specific validation error
 * - `(keyof ValidityState)[]` -&gt; only shows the browser message if it is not
 *   the specific validation errors
 *
 * @see {@link RECOMMENDED_STATE_KEYS}
 * @see {@link RECOMMENDED_NUMBER_STATE_KEYS}
 * @remarks \@since 2.5.6
 * @remarks \@since 6.0.0 Renamed from `ChangeValidationBehavior` to
 * `TextFieldValidationType`
 */
export type TextFieldValidationType =
  | "blur"
  | "change"
  | "recommended"
  | keyof ValidityState
  | readonly (keyof ValidityState)[];

/**
 * @remarks \@since 2.5.0
 */
export interface ErrorMessageOptions extends TextFieldValidationOptions {
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
   * This will only be `true` if called by the `useNumberField` hook.
   */
  isNumber: boolean;

  /**
   * Boolean if this is triggered from a blur event instead of a change event.
   */
  isBlurEvent: boolean;

  /**
   * The validation type defined by the `useTextField` hook.
   */
  validationType: TextFieldValidationType;
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
export const defaultGetErrorMessage: GetErrorMessage = (options) => {
  const {
    isNumber,
    isBlurEvent,
    validity,
    validationMessage,
    validationType: validate,
  } = options;

  if (isBlurEvent || !validationMessage || validate === "change") {
    return validationMessage;
  }

  if (validate === "blur") {
    return "";
  }

  if (validate === "recommended") {
    return isRecommended(validity, isNumber) ? validationMessage : "";
  }

  const keys = typeof validate === "string" ? [validate] : validate;

  return keys.length &&
    VALIDITY_STATE_KEYS.some((key) => validity[key] && keys.includes(key))
    ? validationMessage
    : "";
};

/**
 * @remarks \@since 2.5.0
 */
export interface IsErroredOptions extends ErrorMessageOptions {
  /**
   * The current error message or an empty string.
   */
  errorMessage: string;
}

/**
 * A function that is used to determine if a `TextField` or `TextArea` is in an
 * errored state.
 *
 * @param options - All the current options that can be used to determine the
 * error state.
 * @returns True if the component is considered to be in an errored state.
 * @remarks \@since 2.5.0
 */
export type IsErrored = (options: IsErroredOptions) => boolean;

/**
 * The default implementation for checking if a `TextField` or `TextArea` is
 * errored by returning `true` if the `errorMessage` string is truthy or the
 * value is not within the `minLength` and `maxLength` constraints when they
 * exist.
 *
 * @remarks \@since 2.5.0
 */
export const defaultIsErrored: IsErrored = (options) => {
  const { value, errorMessage, minLength, maxLength, isBlurEvent } = options;

  return (
    !!errorMessage ||
    (typeof maxLength === "number" && value.length > maxLength) ||
    (isBlurEvent && typeof minLength === "number" && value.length < minLength)
  );
};

/**
 * @remarks \@since 6.0.0
 */
export interface GetErrorIconOptions {
  /**
   * This will be `true` if the `TextField` or `TextArea` is in an errorred state.
   */
  error: boolean;

  /**
   * The current error icon that was provided.
   */
  errorIcon: ReactNode;

  /**
   * The current error message or an empty string.
   */
  errorMessage: string;
}

/**
 * A function that can be used to dynamically get an error icon based on the
 * current visible error.
 *
 * @param options - The {@link GetErrorIconOptions}
 * @returns An icon to render or falsey to render nothing.
 * @remarks \@since 2.5.0
 * @remarks \@since 6.0.0 Updated to accept a single object argument
 */
export type GetErrorIcon = (options: GetErrorIconOptions) => ReactNode;

/**
 * The default implementation for showing an error icon in `TextField` and
 * `TextArea` components that will only display when the error flag is enabled.
 *
 * @remarks \@since 2.5.0
 */
export const defaultGetErrorIcon: GetErrorIcon = (options) => {
  const { error, errorIcon } = options;

  return error && errorIcon;
};
