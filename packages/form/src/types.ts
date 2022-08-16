import type { PropsWithRef } from "@react-md/core";
import type {
  CSSProperties,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";

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

export interface FormComponentStates {
  error?: boolean;
  active?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

/**
 * @remarks \@since 6.0.0
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
 */
export type AutoCompleteValue =
  | "off"
  | "on"
  | "name"
  | "honorific-prefix"
  | "given-name"
  | "additional-name"
  | "honorific-suffix"
  | "nickname"
  | "email"
  | "username"
  | "new-password"
  | "current-password"
  | "one-time-code"
  | "organiziation-title"
  | "organiziation"
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
  | "url"
  | "photo";

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

export interface FormMessageContainerExtension {
  /**
   * If the extension doesn't actually want to render the `FormMessage`
   * component, these props are optional. It kind of eliminates the whole
   * purpose of this component though.
   */
  messageProps?: PropsWithRef<FormMessageProps, HTMLDivElement>;

  /**
   * Any props (and an optional ref) to provide to the `<div>` surrounding the
   * children and `FormMessage` component.
   *
   * Note: This will not be used if the `messageProps` are not provided since
   * only the `children` will be returned without the container.
   */
  messageContainerProps?: PropsWithRef<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

export interface LabelClassNameOptions extends FormComponentStates {
  className?: string;

  dense?: boolean;
  floating?: boolean;
}

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    LabelClassNameOptions {}

export interface TextFieldContainerOptions
  extends FormThemeOptions,
    FormComponentStates {
  dense?: boolean;
  inline?: boolean;
  stretch?: boolean;

  /**
   * This should generally be an icon or a button that will be placed before the
   * `TextField` or `TextArea`.
   */
  leftAddon?: ReactNode;

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
   * recommended for accessibility, but can be ommitted if an `aria-label` or
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
  labelProps?: PropsWithRef<LabelProps, HTMLLabelElement>;

  /**
   * A conveniece prop for applying custom style to a label. This is equivalent
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
   * A convenience prop for apply a custom className to a label. This is
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
