import { ErrorMessageOptions } from "./getErrorMessage";

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
export const defaultIsErrored: IsErrored = ({
  value,
  errorMessage,
  minLength,
  maxLength,
  isBlurEvent,
}) =>
  !!errorMessage ||
  (typeof maxLength === "number" && value.length > maxLength) ||
  (isBlurEvent && typeof minLength === "number" && value.length < minLength);
