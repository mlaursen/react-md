"use client";
import {
  createContext,
  useContext,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import { type FormThemeOptions } from "./types.js";

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
 * @example
 * Simple Example
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
 * **Client Component**
 *
 * Since you'll normally want all of your form components to use the same theme,
 * this is a simple way to provide the same theme to all components without
 * needing all the prop-drilling/copying.
 */
export function FormThemeProvider(props: FormThemeProviderProps): ReactElement {
  const { theme = "outline", underlineDirection = "left", children } = props;

  const value = useMemo(
    () => ({ theme, underlineDirection }),
    [theme, underlineDirection]
  );

  return <Provider value={value}>{children}</Provider>;
}
