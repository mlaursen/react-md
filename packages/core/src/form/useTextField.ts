"use client";
import type {
  HTMLAttributes,
  ReactNode,
  Ref,
  RefCallback,
  RefObject,
} from "react";
import { useCallback, useRef, useState } from "react";
import { useIcon } from "../icon/IconProvider.js";
import type { UseStateInitializer, UseStateSetter } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import type { FormMessageInputLengthCounterProps } from "./FormMessage.js";
import type { TextFieldProps } from "./TextField.js";
import type { FormMessageProps } from "./types.js";
import type {
  ErrorMessageOptions,
  GetErrorIcon,
  GetErrorMessage,
  IsErrored,
  TextFieldValidationOptions,
  TextFieldValidationType,
} from "./validation.js";
import {
  defaultGetErrorIcon,
  defaultGetErrorMessage,
  defaultIsErrored,
} from "./validation.js";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Added the `onInvalid` handler
 */
export type TextFieldChangeHandlers<
  E extends HTMLInputElement | HTMLTextAreaElement,
> = Pick<HTMLAttributes<E>, "onBlur" | "onChange" | "onInvalid">;

/** @remarks \@since 6.0.0 */
export interface ErrorChangeHandlerOptions<
  E extends HTMLInputElement | HTMLTextAreaElement,
> {
  /**
   * A ref containing the `TextField` or `TextArea` if you need access to that
   * DOM node for error reporting.
   */
  ref: RefObject<E>;

  /**
   * The current name for the `TextField` or `TextArea`.
   */
  name: string;

  /**
   * This will be `true` when the `TextField`/`TextArea` has an error.
   */
  error: boolean;

  /**
   * The error message returned by {@link GetErrorMessage}/the browser's
   * validation message. This is normally an empty string when the {@link error}
   * state is `false`.
   */
  errorMessage: string;
}

/**
 * A function that reports the error state changing. A good use-case for this is
 * to keep track of all the errors within your form and keep a submit button
 * disabled until they have been resolved.
 *
 * Example:
 *
 * ```ts
 * const [errors, setErrors] = useState<Record<string, boolean | undefined>>({});
 * const onErrorChange: ErrorChangeHandler = ({ name, error }) =>
 *   setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
 *
 * const invalid = Object.values(errors).some(Boolean);
 *
 * // form implementation is left as an exercise for the reader
 * <Button type="submit" disabled={invalid} onClick={submitForm}>Submit</Button>
 * ```
 *
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Changed to object argument.
 */
export type ErrorChangeHandler<
  E extends HTMLInputElement | HTMLTextAreaElement,
> = (options: ErrorChangeHandlerOptions<E>) => void;

/** @remarks \@since 2.5.6 */
export interface TextFieldHookState {
  /**
   * The current value for the `TextField` or `TextArea`.
   */
  value: string;

  /**
   * This will be `true` when the `TextField`/`TextArea` has an error.
   */
  error: boolean;

  /**
   * The error message returned by {@link GetErrorMessage}/the browser's
   * validation message. This is normally an empty string when the {@link error}
   * state is `false`.
   */
  errorMessage: string;
}

/**
 * All the props that will be generated and return from the `useTextField` hook
 * that should be passed to a `FormMessage` component.
 *
 * @remarks \@since 2.5.0
 */
export interface ProvidedFormMessageProps
  extends Pick<FormMessageProps, "id" | "theme" | "children">,
    Required<Pick<TextFieldProps, "error">>,
    Partial<Pick<FormMessageInputLengthCounterProps, "length" | "maxLength">> {}

/**
 * All the props that will be generated and returned by the `useTextField` hook
 * that should be passed to a `TextField` component.
 *
 * @remarks \@since 2.5.0
 */
export interface ProvidedTextFieldProps<
  E extends HTMLInputElement | HTMLTextAreaElement,
> extends TextFieldValidationOptions,
    TextFieldChangeHandlers<E>,
    Required<Pick<TextFieldProps, "id" | "name" | "value" | "error">>,
    Pick<TextFieldProps, "aria-describedby" | "rightAddon"> {
  /**
   * A ref that must be passed to the `TextField`/`TextArea` so that the custom
   * validity behavior can work.
   *
   * @remarks \@since 6.0.0
   */
  ref: RefCallback<E>;
}

/**
 * @remarks \@since 2.5.0
 */
export interface ProvidedTextFieldMessageProps<
  E extends HTMLInputElement | HTMLTextAreaElement,
> extends ProvidedTextFieldProps<E> {
  /**
   * These props will be defined as long as the `disableMessage` prop is not
   * `true` from the `useTextField` hook.
   */
  messageProps: ProvidedFormMessageProps;
}

/** @remarks \@since 2.5.6 */
export interface TextFieldHookOptions<
  E extends HTMLInputElement | HTMLTextAreaElement,
> extends TextFieldValidationOptions,
    TextFieldChangeHandlers<E> {
  /**
   * An optional id to use for the `TextField` or `TextArea` that is also used
   * to create an id for the inline help/error messages.
   *
   * @defaultValue `"text-field-" + useId()`
   */
  id?: string;

  /**
   * An optional ref that should be merged with the ref returned by this hook.
   * This should really only be used if you are making a custom component using
   * this hook and forwarding refs. If you need a ref to access the `<input>` or
   * `<textarea>` DOM node, you can use the `fieldRef` returned by this hook
   * instead.
   *
   * @example
   * Accessing TextField DOM Node
   * ```tsx
   * import { TextField, useTextField } from "@react-md/core";
   * import { useEffect } from "react";
   * import type { ReactElement } from "react";
   *
   * function Example(): ReactElement {
   *   const { fieldRef, fieldProps } = useTextField({ name: "example" });
   *
   *   useEffect(() => {
   *     fieldRef.current;
   *     //       ^ HTMLInputElement | null
   *   }, [fieldRef]);
   *
   *   return <TextField {...fieldProps} label="Example" />;
   * }
   * ```
   */
  ref?: Ref<E>;

  /**
   * A unique name to attach to the `TextField`, `TextArea` or `Password`
   * component.
   */
  name: string;

  /**
   * Boolean if the `FormMessage` should also display a counter for the
   * remaining letters allowed based on the `maxLength`.
   *
   * This will still be considered false if the `maxLength` value is not
   * provided.
   *
   * @defaultValue `false`
   */
  counter?: boolean;

  /**
   * This is used internally for the `useNumberField` hook and probably
   * shouldn't be used otherwise. This is just passed into the
   * {@link getErrorMessage} options and is used for additional validation.
   *
   * @defaultValue `false`
   */
  isNumber?: boolean;

  /**
   * The default value to use for the `TextField` or `TextArea` one initial
   * render. If you want to manually change the value to something else after
   * the initial render, either change the `key` for the component containing
   * this hook, or use the `setState` function returned from this hook.
   *
   * @defaultValue `""`
   */
  defaultValue?: UseStateInitializer<string>;

  /**
   * An optional help text to display in the `FormMessage` component when there
   * is not an error.
   */
  helpText?: ReactNode;

  /**
   * A function used to determine if the `TextField` or `TextArea` is an in
   * errored state.
   *
   * @see {@link defaultIsErrored}
   * @defaultValue `defaultIsErrored`
   */
  isErrored?: IsErrored;

  /**
   * An optional error icon used in the {@link getErrorIcon} option.
   *
   * @defaultValue `useIcon("error")`
   */
  errorIcon?: ReactNode;

  /**
   * A function used to get the error icon to display at the right of the
   * `TextField` or `TextArea`. The default behavior will only show an icon when
   * the `error` state is `true` and an `errorIcon` option has been provided.
   *
   * @see {@link defaultGetErrorIcon}
   * @defaultValue `defaultGetErrorIcon`
   */
  getErrorIcon?: GetErrorIcon;

  /**
   * A function to get and display an error message based on the `TextField` or
   * `TextArea` validity.
   *
   * @see {@link defaultGetErrorMessage}
   * @defaultValue `defaultGetErrorMessage`
   */
  getErrorMessage?: GetErrorMessage;

  /**
   * An optional function that will be called whenever the `error` state is
   * changed. This can be used for more complex forms to `disable` the Submit
   * button or anything else if any field has an error.
   *
   * @defaultValue `() => {}`
   */
  onErrorChange?: ErrorChangeHandler<E>;

  /**
   * Boolean if the `TextField` or `TextArea` will **not** be rendered along
   * with a `FormMessage` component. This will prevent the `aria-describedby`
   * prop from being returned when set to `true`.
   *
   * @defaultValue `false`
   */
  disableMessage?: boolean;

  /**
   * Boolean if the `maxLength` prop should not be passed to the `TextField`
   * component since it will prevent any additional characters from being
   * entered in the text field which might feel like weird behavior to some
   * users. This should really only be used when the `counter` option is also
   * enabled and rendering along with a `FormMessage` component.
   *
   * @defaultValue `false`
   */
  disableMaxLength?: boolean;

  /**
   * @defaultValue `"recommended"`
   */
  validationType?: TextFieldValidationType;
}

/** @remarks \@since 6.0.0 */
export interface TextFieldImplementation<
  E extends HTMLInputElement | HTMLTextAreaElement,
> extends TextFieldHookState {
  fieldRef: RefObject<E>;
  reset(): void;
  setState: UseStateSetter<Readonly<TextFieldHookState>>;
  fieldProps: ProvidedTextFieldProps<E>;
}

/** @remarks \@since 6.0.0 */
export interface TextFieldWithMessageImplementation<
  E extends HTMLInputElement | HTMLTextAreaElement,
> extends TextFieldImplementation<E> {
  fieldProps: ProvidedTextFieldMessageProps<E>;
}

/** @remarks \@since 6.0.0 */
export interface ValidatedTextFieldImplementation<
  E extends HTMLInputElement | HTMLTextAreaElement,
> extends TextFieldImplementation<E> {
  fieldProps: ProvidedTextFieldProps<E> | ProvidedTextFieldMessageProps<E>;
}

/**
 * If you do not want to display the error messages below the `TextField` and
 * handle error messages separately, set the `disableMessage` option to `true`.
 *
 * @example
 * No Inline Error Messages
 * ```tsx
 * import type { ReactElement } from "react";
 * import { TextField, useTextField } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   const { fieldProps } = useTextField({
 *     name: "example",
 *     disableMessage: true,
 *   });
 *
 *   return <TextField {...fieldProps} label="Example" />;
 * }
 * ```
 *
 * Look at the other {@link useTextField} override for additional examples.
 */
export function useTextField<E extends HTMLInputElement | HTMLTextAreaElement>(
  options: TextFieldHookOptions<E> & { disableMessage: true }
): TextFieldImplementation<E>;

/**
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { TextField, useTextField } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   const { fieldProps } = useTextField({
 *     name: "example",
 *   });
 *
 *   return <TextField {...fieldProps} label="Example" />;
 * }
 * ```
 *
 * @example
 * Inline Counter
 * ```tsx
 * import type { ReactElement } from "react";
 * import { TextField, useTextField } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   const { fieldProps } = useTextField({
 *     name: "example",
 *     counter: true,
 *     required: true,
 *     maxLength: 20,
 *     disableMaxLength: true,
 *   });
 *
 *   return <TextField {...fieldProps} label="Example" />;
 * }
 * ```
 *
 * @example
 * Adding Constraints
 * ```tsx
 * import type { ReactElement } from "react";
 * import { TextField, useTextField } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   const { fieldProps } = useTextField({
 *     name: "example",
 *     required: true,
 *     pattern: "^[A-z]+$",
 *     minLength: 4,
 *     maxLength: 20,
 *   });
 *
 *   return <TextField {...fieldProps} label="Example" />;
 * }
 * ```
 *
 * @example
 * Custom Validation
 * ```tsx
 * import type { ReactElement } from "react";
 * import { TextField, useTextField } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   const { fieldProps } = useTextField({
 *     name: "example",
 *     required: true,
 *     getErrorMessage(options) {
 *       const {
 *         value,
 *         pattern,
 *         required,
 *         minLength,
 *         maxLength,
 *         validity,
 *         validationMessage,
 *         isNumber,
 *         isBlurEvent,
 *         validationType,
 *       } = options;
 *
 *       if (validity.tooLong) {
 *         return `No more than ${maxLength} characters.`;
 *       }
 *
 *       if (validity.tooShort) {
 *         return `No more than ${minLength} characters.`;
 *       }
 *
 *       if (validity.valueMissing) {
 *         return "This value is required!";
 *       }
 *
 *       if (value === "bad value") {
 *         return "Value cannot be bad value";
 *       }
 *
 *       return defaultGetErrorMessage(options);
 *     }
 *   });
 *
 *   return <TextField {...fieldProps} label="Example" />;
 * }
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * @remarks
 * \@since 2.5.6
 * \@since 6.0.0 This hook returns an object instead of an ordered list.
 */
export function useTextField<E extends HTMLInputElement | HTMLTextAreaElement>(
  options: TextFieldHookOptions<E>
): TextFieldWithMessageImplementation<E>;
export function useTextField<E extends HTMLInputElement | HTMLTextAreaElement>(
  options: TextFieldHookOptions<E>
): ValidatedTextFieldImplementation<E> {
  const {
    id: propId,
    ref: propRef,
    name,
    defaultValue = "",
    isNumber = false,
    required,
    pattern,
    minLength,
    maxLength,
    onBlur = noop,
    onChange = noop,
    onInvalid = noop,
    counter = false,
    helpText,
    validationType = "recommended",
    disableMessage = false,
    disableMaxLength = false,
    errorIcon: propErrorIcon,
    isErrored = defaultIsErrored,
    onErrorChange = noop,
    getErrorIcon = defaultGetErrorIcon,
    getErrorMessage = defaultGetErrorMessage,
  } = options;

  const id = useEnsuredId(propId, "text-field");
  const messageId = `${id}-message`;
  const [fieldRef, ref] = useEnsuredRef(propRef);
  const [state, setState] = useState<TextFieldHookState>(() => {
    const value =
      typeof defaultValue === "function" ? defaultValue() : defaultValue;

    return {
      value,
      error: false,
      errorMessage: "",
    };
  });
  const { value, error, errorMessage } = state;

  // using a `ref` instead of a `useCallback` makes it so the `defaultValue`
  // will always be used once reset.
  const reset = useRef(() => {
    fieldRef.current?.setCustomValidity("");
    setState({ value, error: false, errorMessage: "" });
  }).current;

  const errored = useRef(error);
  const checkValidity = useCallback(
    (isBlurEvent: boolean) => {
      const field = fieldRef.current;
      if (!field) {
        throw new Error("Unable to check validity due to missing ref");
      }

      // need to temporarily set the `maxLength` back so it can be "verified"
      // through the validity api
      /* istanbul ignore next */
      if (isBlurEvent && disableMaxLength && typeof maxLength === "number") {
        field.maxLength = maxLength;
      }

      const { value } = field;
      field.setCustomValidity("");
      field.checkValidity();

      // remove the temporarily set `maxLength` attribute after checking the
      // validity
      /* istanbul ignore next */
      if (disableMaxLength && typeof maxLength === "number") {
        field.removeAttribute("maxLength");
      }

      const options: ErrorMessageOptions = {
        value,
        pattern,
        required,
        minLength,
        maxLength,
        isBlurEvent,
        isNumber,
        validationType,
        validity: field.validity,
        validationMessage: field.validationMessage,
      };
      const errorMessage = getErrorMessage(options);
      const error = isErrored({ ...options, errorMessage });

      if (errored.current !== error) {
        errored.current = error;
        onErrorChange({
          ref: fieldRef,
          name,
          error,
          errorMessage,
        });
      }

      /* istanbul ignore next */
      if (errorMessage !== field.validationMessage) {
        field.setCustomValidity(errorMessage);
      }

      setState((prevState) => {
        if (
          prevState.value === value &&
          prevState.error === error &&
          prevState.errorMessage === errorMessage
        ) {
          return prevState;
        }

        return {
          value,
          error,
          errorMessage,
        };
      });
    },
    [
      disableMaxLength,
      fieldRef,
      getErrorMessage,
      isErrored,
      isNumber,
      maxLength,
      minLength,
      name,
      onErrorChange,
      pattern,
      required,
      validationType,
    ]
  );

  const errorIcon = useIcon("error", propErrorIcon);
  const fieldProps: ProvidedTextFieldProps<E> & {
    messageProps?: ProvidedFormMessageProps;
  } = {
    id,
    ref,
    name,
    value,
    error,
    required,
    pattern,
    minLength,
    maxLength: disableMaxLength ? undefined : maxLength,
    rightAddon: getErrorIcon({
      error,
      errorIcon,
      errorMessage,
    }),
    onBlur(event) {
      onBlur(event);
      if (event.isPropagationStopped()) {
        return;
      }
      checkValidity(true);
    },
    onChange(event) {
      onChange(event);
      if (event.isPropagationStopped()) {
        return;
      }

      if (validationType === "blur") {
        setState((prevState) => ({
          ...prevState,
          value: event.currentTarget.value,
        }));
        return;
      }

      checkValidity(false);
    },
    onInvalid(event) {
      onInvalid(event);
      if (
        event.isPropagationStopped() ||
        event.currentTarget === document.activeElement
      ) {
        return;
      }

      // this makes it so that if a submit button is clicked in a form, all
      // textfields will gain the error state immediately
      // also need to extract the validationMessage immediately because of the
      // SyntheticEvent behavior in React. By the time the `setState` is called,
      // the event might've been deleted
      const { validationMessage } = event.currentTarget;

      setState((prevState) => {
        if (prevState.error) {
          return prevState;
        }

        return {
          ...prevState,
          error: true,
          errorMessage: validationMessage,
        };
      });
    },
  };

  if (!disableMessage) {
    fieldProps["aria-describedby"] = messageId;
    fieldProps.messageProps = {
      id: messageId,
      error,
      length: counter ? value.length : undefined,
      maxLength:
        counter && typeof maxLength === "number" ? maxLength : undefined,
      children: errorMessage || helpText,
    };
  }

  return {
    ...state,
    reset,
    setState,
    fieldRef,
    fieldProps,
  };
}
