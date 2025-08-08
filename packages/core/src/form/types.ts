import {
  type CSSProperties,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";

import { type PropsWithRef } from "../types.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-form-active-color"?: string;
    "--rmd-form-focus-color"?: string;

    // NOTE: The label properties are in this file since all label types are
    // in this file. If they are able to be moved to labelStyles or Label and
    // the compiled `.d.ts` includes the types from those files, this can be
    // moved.
    "--rmd-label-floating-x"?: string | number;
    "--rmd-label-floating-y"?: string | number;
    "--rmd-label-floating-active-x"?: string | number;
    "--rmd-label-floating-active-y"?: string | number;
    "--rmd-label-active-padding"?: string | number;
    "--rmd-label-active-background-color"?: string;

    // NOTE: The text field properties are in this file since there are no
    // typedefs included from `TextFieldContainer` or
    // `textFieldContainerStyles`.
    "--rmd-text-field-addon-top"?: string | number;
    "--rmd-text-field-addon-spacing"?: string | number;
    "--rmd-text-field-addon-margin-top"?: string | number;
    "--rmd-text-field-addon-left-offset"?: string | number;
    "--rmd-text-field-height"?: string | number;
    "--rmd-text-field-padding-left"?: string | number;
    "--rmd-text-field-padding-right"?: string | number;
    "--rmd-text-field-padding-top"?: string | number;
    "--rmd-text-field-border-color"?: string;
    "--rmd-text-field-hover-border-color"?: string;
    "--rmd-text-field-filled-color"?: string;
    "--rmd-text-field-filled-padding"?: string | number;
    "--rmd-text-field-outlined-padding"?: string | number;
    "--rmd-text-field-underlined-padding"?: string | number;
  }
}

/**
 * The supported themes for the `TextField`, `TextArea`, and `Select`
 * components.
 *
 * - "none" - display as an unstyled text field without any border or background
 *   colors.
 * - "underline" - display with only an underline that gains the form active
 *   color and animates from the left or right to the other side when the field
 *   is focused.
 * - "filled" - an extension of the `"underline"` state that will also have a
 *   slightly dark background applied.
 * - "outline" - outlines the entire text field in a border and applies the
 *   active color as box shadow when the field is focused.
 */
export type FormTheme = "none" | "underline" | "filled" | "outline";

/**
 * The direction that the underline should appear from when the theme is
 * `"underline"` or `"filled"`.
 */
export type FormUnderlineDirection = "left" | "center" | "right";

export interface FormThemeOptions {
  /**
   * The current theme type.
   *
   * @defaultValue `"outline"`
   */
  theme?: FormTheme;

  /**
   * The current underline direction.
   *
   * @defaultValue `"left"`
   */
  underlineDirection?: FormUnderlineDirection;
}

/**
 * @since 6.0.0
 */
export interface FormConfiguration extends Required<FormThemeOptions> {
  /**
   * Set this to `false` if the `$disable-uncontrolled-input-toggles` variable
   * is set to `true` in the Sass configuration.
   *
   * Since the `checked` state only changes for the radio that has been clicked,
   * the previously checked radio would also be shown as checked with no way of
   * fixing it without controlling the radio component. When this flag is
   * enabled, the checked icons and state are handled through css instead of
   * `useState`.
   *
   * @defaultValue `true`
   */
  uncontrolledToggles: boolean;
}

/**
 * @since 6.4.0
 */
export interface InteractableFormComponentStates {
  /** @defaultValue `false` */
  disabled?: boolean;

  /** @defaultValue `false` */
  readOnly?: boolean;
}

/**
 * @since 6.4.0
 */
export interface EditableFormComponentStates
  extends InteractableFormComponentStates {
  /** @defaultValue `false` */
  error?: boolean;
}

/**
 * @since 6.0.0
 */
export interface FormComponentStates extends EditableFormComponentStates {
  /** @defaultValue `false` */
  active?: boolean;
}

/**
 * @since 6.0.0
 * @see https://html.spec.whatwg.org/multipage/forms.html#autofill
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
 */
export type AutocompleteAttributeValue =
  | "off"
  | "on"
  | "name"
  | "honorific-prefix"
  | "given-name"
  | "additional-name"
  | "family-name"
  | "honorific-suffix"
  | "nickname"
  | "email"
  | "username"
  | "new-password"
  | "current-password"
  | "one-time-code"
  | "organization-title"
  | "organization"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level1"
  | "address-level2"
  | "address-level3"
  | "address-level4"
  | "country"
  | "country-name"
  | "postal-code"
  | "cc-name"
  | "cc-given-name"
  | "cc-additional-name"
  | "cc-family-name"
  | "cc-number"
  | "cc-exp"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-csc"
  | "cc-type"
  | "transaction-currency"
  | "transaction-amount"
  | "language"
  | "bday"
  | "bday-day"
  | "bday-month"
  | "bday-year"
  | "sex"
  | "tel"
  | "tel-country-code"
  | "tel-national"
  | "tek-area-code"
  | "tel-local"
  | "tel-extension"
  | "impp"
  | "url"
  | "photo";

/**
 * @since 6.0.0
 */
export interface UserAgentAutocompleteProps {
  /**
   * Set this to enable additional autocompletion suggestions for a user for
   * different form fields. Using this prop will update the
   * {@link UserAgentAutocompleteProps.name} and {@link autoComplete} to default to
   * this value.
   *
   * @example
   * ```tsx
   * <Form>
   *   <TextField
   *     label="Enter your credit card number"
   *     autoCompleteValue="cc-number"
   *     {...creditCardProps}
   *     inputMode="number"
   *   />
   *   <TextField
   *     label="Name on card"
   *     autoCompleteValue="cc-name"
   *     {...creditCardNameProps}
   *   />
   *   <TextField
   *     label="Security code"
   *     autoCompleteValue="cc-csc"
   *     {...securityCodeProps}
   *     inputMode="number"
   *   />
   *   <Button type="submit">Submit</Button>
   * </Form>
   * ```
   *
   * @see https://html.spec.whatwg.org/multipage/forms.html#autofill
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
   * @see {@link AutocompleteAttributeValue}
   * @see {@link autoComplete}
   * @see {@link UserAgentAutocompleteProps.name}
   */
  autoCompleteValue?: AutocompleteAttributeValue;

  /**
   * @see {@link autoCompleteValue}
   * @defaultValue `autoCompleteValue`
   */
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];

  /**
   * @see {@link autoCompleteValue}
   * @defaultValue `autoCompleteValue`
   */
  name?: string;
}

export interface FormMessageClassNameOptions {
  className?: string;

  /**
   * Boolean if the message should gain the error state which changes the text
   * color to `red` by default.
   *
   * @defaultValue `false`
   */
  error?: boolean;

  /**
   * The current theme for the related text field. This is really only used to
   * match the current horizontal padding of the text field.
   *
   * @defaultValue `"outline"`
   */
  theme?: FormTheme;
}

export interface FormMessageProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "minLength" | "maxLength">,
    FormMessageClassNameOptions {
  /**
   * If this component is acting as a form-level error message handler, the role
   * should be updated to be `"alert"` for additional accessibility.
   *
   * Note: when creating a form-level error message handler, the messages should
   * no longer appear as the user types and instead once the user tries to
   * submit the form. Having an alert role disrupts normal screen reader
   * behavior by immediately reading changes in this element.
   *
   * @defaultValue `undefined`
   */
  role?: "alert";

  /**
   * Boolean if the children should no longer be wrapped in a `<p>` tag. This
   * should normally only be disabled if using a custom error message wrapper or
   * the counter behavior is not being used. To get correct alignments of the
   * message and counter, the `children` must be wrapped in some element and
   * cannot be plain test.
   *
   * Note: this will always be considered `true` if the `role` is set to
   * `"alert"`.
   *
   * @defaultValue `false`
   */
  disableWrap?: boolean;

  /**
   * Optional props to provide to inline counter.
   *
   * @since 6.3.0
   */
  counterProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>>;

  /**
   * Optional props to apply to the `<p>` tag that surrounds the `children`.
   * This will not be used if `role="alert"` or `disableWrap={true}`.
   *
   * @since 6.3.0
   */
  messageProps?: PropsWithRef<HTMLAttributes<HTMLParagraphElement>>;

  /**
   * An optional style to apply to the `<p>` tag that surrounds the `children`.
   * This will not be used if `role="alert"` or `disableWrap={true}`.
   */
  messageStyle?: CSSProperties;

  /**
   * An optional className to apply to the `<p>` tag that surrounds the
   * `children`. This will not be used if `role="alert"` or
   * `disableWrap={true}`.
   */
  messageClassName?: string;
}

/**
 * Props that are used to automatically add a counter for the remaining letters
 * available for the text field. The counter will always be created to the right
 * of the optional message.
 *
 * The counter is really a simple string of: `${length} / ${maxLength}`.
 *
 * If you need additional customization, it is recommended to create your own
 * implementation such as:
 *
 * ```tsx
 * <FormMessage>
 *   {errorMessage}
 *   <MyCounter {...props} />
 * </FormMessage>
 * ```
 *
 * Note: this should not be used alongside form-level messages.
 *
 * @since 2.9.0 Renamed from `FormMessageCounterProps` to
 * `FormMessageInputLengthCounterProps` since a `FormMessageCounter` component
 * was added
 */
export interface FormMessageInputLengthCounterProps {
  /**
   * The current length of the value in the related text field.
   */
  length: number;

  /**
   * The max length allowed for the value in the related text field.
   */
  maxLength: number;

  /**
   * An optional style to apply to the counter wrapper element.
   */
  counterStyle?: CSSProperties;

  /**
   * An optional className to apply to the counter wrapper element.
   */
  counterClassName?: string;
}

export interface FormMessageWithCounterProps
  extends FormMessageProps,
    FormMessageInputLengthCounterProps {}

/**
 * @since 6.0.0
 */
export interface FormMessageWithoutCounterProps extends FormMessageProps {
  length?: never;
  maxLength?: never;
  counterStyle?: never;
  counterClassName?: never;
}

export interface FormMessageContainerExtension {
  /**
   * If the extension doesn't actually want to render the `FormMessage`
   * component, these props are optional. It kind of eliminates the whole
   * purpose of this component though.
   */
  messageProps?: PropsWithRef<
    FormMessageProps & Partial<FormMessageInputLengthCounterProps>
  >;

  /**
   * Any props (and an optional ref) to provide to the `<div>` surrounding the
   * children and `FormMessage` component.
   *
   * Note: This will not be used if the `messageProps` are not provided since
   * only the `children` will be returned without the container.
   */
  messageContainerProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>>;
}

/** @since 6.0.0 */
export interface LabelClassNameOptions {
  className?: string;

  /**
   * Set this to `true` to remove the `gap` style from the label.
   *
   * @see `$label-gap`
   * @defaultValue `false`
   */
  gap?: boolean;

  /**
   * Set this to `true` when the parent `TextFieldContainer` has the `dense`
   * spec enabled. This updates the floating styles to match the smaller height.
   *
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * Set this to `true` to update the label's color to the error color.
   *
   * @see `$error-color`
   * @defaultValue `false`
   */
  error?: boolean;

  /**
   * Set this to `true` to update the label's color to the active color.
   *
   * @see `$active-color`
   * @defaultValue `false`
   */
  active?: boolean;

  /**
   * Set this to `true` if the label should gain `flex-direction: column`
   * styling.
   *
   * @defaultValue `false`
   */
  stacked?: boolean;

  /**
   * Set this to `true` to update the label's color to be the disabled color.
   *
   * @see `$disabled-color`
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Set this to true when label can floating above an input, textarea, or
   * select inside of a `TextFieldContainer`.
   *
   * @defaultValue `false`
   */
  floating?: boolean;

  /**
   * Set this to true when label is currently floating above an input,
   * textarea, or selected inside of a `TextFieldContainer`.
   *
   * @see {@link active}
   * @defaultValue `active`
   */
  floatingActive?: boolean;

  /**
   * Set this to `true` to gain `flex-direction: row-reversed` styling. If the
   * {@link stacked} prop is also `true`, `flex-direction: column-reversed` will
   * be applied.
   *
   * @defaultValue `false`
   */
  reversed?: boolean;

  /**
   * @defaultValue `false`
   */
  inactive?: boolean;
}

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    LabelClassNameOptions {}

/**
 * @since 6.0.0
 */
export interface ConfigurableTextFieldAddonProps
  extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Boolean if the addon should be presentational only and prevent pointer
   * events.
   *
   * @defaultValue `false`
   */
  pointerEvents?: boolean;
}

/**
 * @since 6.0.0 Split props into `ConfigurableTextFieldAddonProps`
 */
export interface TextFieldAddonProps extends ConfigurableTextFieldAddonProps {
  /**
   * @defaultValue `false`
   */
  after?: boolean;

  /**
   * Set this to `true` if the addon should not be wrapped in a `<span>` with some
   * additional styles.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;
}

/**
 * @since 6.0.0 Renamed the `leftChildren` / `rightChildren` props to
 * `leftAddon` / `rightAddon`. Renamed `isLeftAddon` / `isRightAddon` to
 * `disableLeftAddonStyles` / `disableRightAddonStyles`. Added
 * `leftAddonProps` / `rightAddonProps`. Removed `stretch`
 */
export interface TextFieldContainerOptions
  extends FormThemeOptions,
    FormComponentStates {
  /**
   * Set this to `true` to enable the dense spec which reduces the height.
   *
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * Set this to `true` to change the style from `display: flex` to
   * `display: inline-flex`.
   *
   * @defaultValue `false`
   */
  inline?: boolean;

  /**
   * This should generally be an icon or a button that will be placed before the
   * `TextField` or `TextArea`.
   */
  leftAddon?: ReactNode;

  /**
   * Any additional props to pass to the `<span>` surrounding the {@link leftAddon}.
   *
   * @since 6.0.0
   */
  leftAddonProps?: PropsWithRef<ConfigurableTextFieldAddonProps>;

  /**
   * @see {@link TextFieldAddonProps.disabled}
   *
   * @defaultValue `false`
   */
  disableLeftAddonStyles?: boolean;

  /**
   * This should generally be an icon or a button that will be placed after the
   * `TextField` or `TextArea`.
   */
  rightAddon?: ReactNode;

  /**
   * Any additional props to pass to the `<span>` surrounding the {@link rightAddon}.
   *
   * @since 6.0.0
   */
  rightAddonProps?: PropsWithRef<ConfigurableTextFieldAddonProps>;

  /**
   * @see {@link TextFieldAddonProps.disabled}
   *
   * @defaultValue `false`
   */
  disableRightAddonStyles?: boolean;
}

export interface FormFieldOptions
  extends TextFieldContainerOptions,
    FormMessageContainerExtension {
  /**
   * An optional floating label to use with the text field. A label is generally
   * recommended for accessibility, but can be omitted if an `aria-label` or
   * `aria-labelledby` is provided.
   */
  label?: ReactNode;

  /**
   * Any additional props and/or ref that should be passed to the `<label>`
   * element when a {@link label} is provided.
   *
   * @example
   * ```tsx
   * labelProps={{
   *   ref: labelRef,
   *   style: {},
   *   className: "some-custom-class-name",
   *   onClick: (event) => {
   *     // do something
   *   }
   * }}
   * ```
   */
  labelProps?: PropsWithRef<LabelProps>;

  /**
   * A convenience prop to apply a custom style to a label. This is equivalent
   * to:
   *
   * ```ts
   * labelProps={{
   *   style: // some style here
   * }}
   * ```
   */
  labelStyle?: CSSProperties;

  /**
   * A convenience prop to apply a custom className to a label. This is
   * equivalent to:
   *
   * ```ts
   * labelProps={{
   *   className: "some-class-name",
   * }}
   * ```
   */
  labelClassName?: string;
}
