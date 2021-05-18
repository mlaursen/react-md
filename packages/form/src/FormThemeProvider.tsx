import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
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
   */
  theme?: FormTheme;

  /**
   * The current underline direction.
   */
  underlineDirection?: FormUnderlineDirection;
}

export type FormThemeContext = Required<FormThemeOptions>;

const context = createContext<FormThemeContext>({
  theme: "outline",
  underlineDirection: "left",
});

/**
 * Gets the current theme values for a form component by inheriting the current
 * form theme via context. If you provide an object of theme props, the returned
 * value will use any defined values from the theme props and fallback to the
 * context value.
 *
 * Example:
 * ```ts
 * // everything is inherited
 * const formTheme = useFormTheme();
 *
 * // theme will be set to "underline" while the others will be inherited
 * const formTheme = useFormTheme({ theme: "underline" });
 * ```
 */
export function useFormTheme(options: FormThemeOptions = {}): FormThemeContext {
  const formTheme = useContext(context);
  let { theme, underlineDirection } = options;
  theme = theme ?? formTheme.theme;
  underlineDirection = underlineDirection ?? formTheme.underlineDirection;

  return {
    theme,
    underlineDirection,
  };
}

const { Provider } = context;

export interface FormThemeProviderProps extends FormThemeOptions {
  children: ReactNode;
}

/**
 * Since you'll normally want all of your form components to use the same theme,
 * this is a simple way to provide the same theme to all components without
 * needing all the prop-drilling/copying.
 */
export function FormThemeProvider({
  theme = "outline",
  underlineDirection = "left",
  children,
}: FormThemeProviderProps): ReactElement {
  const value = useMemo(
    () => ({ theme, underlineDirection }),
    [theme, underlineDirection]
  );

  return <Provider value={value}>{children}</Provider>;
}
