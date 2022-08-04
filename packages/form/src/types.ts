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
