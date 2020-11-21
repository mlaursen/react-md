import { ErrorMessageOptions } from "./getErrorMessage";

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
 * @param options All the current options that can be used to determine the
 * error state.
 * @return True if the component is considered to be in an errored state.
 */
export type IsErrored = (options: IsErroredOptions) => boolean;

/**
 * The default implementation for checking if a `TextField` or `TextArea` is
 * errored by returning `true` if the `errorMessage` string is truthy or the
 * value is not within the `minLength` and `maxLength` constraints when they
 * exist.
 */
export const defaultIsErrored: IsErrored = ({
  value,
  errorMessage,
  minLength,
  maxLength,
}) =>
  !!errorMessage ||
  (typeof minLength === "number" && value.length < minLength) ||
  (typeof maxLength === "number" && value.length > maxLength);
