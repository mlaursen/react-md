import { ReactNode } from "react";

/**
 * A function that can be used to dynamically get an error icon based on the
 * current visible error.
 *
 * @param errorMessage - The current error message or an empty string
 * @param error - Boolean if the `TextField` or `TextArea` are considered to be
 * in an errored state
 * @param errorIcon - The current `errorIcon` that was provided to the
 * `useTextField` hook.
 * @returns An icon to render or falsey to render nothing.
 * @remarks \@since 2.5.0
 */
export type GetErrorIcon = (
  errorMessage: string,
  error: boolean,
  errorIcon: ReactNode
) => ReactNode;

/**
 * The default implementation for showing an error icon in `TextField` and
 * `TextArea` components that will only display when the error flag is enabled.
 *
 * @remarks \@since 2.5.0
 */
export const defaultGetErrorIcon: GetErrorIcon = (_message, error, errorIcon) =>
  error && errorIcon;
