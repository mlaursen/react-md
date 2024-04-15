"use client";
import { createContext, useContext } from "react";
import type { UseStateSetter } from "../types.js";

/** @since 6.0.0 */
export type ColorScheme = "light" | "dark";

/** @since 6.0.0 */
export type ColorSchemeMode = ColorScheme | "system";

/**
 * @since 6.0.0
 */
export interface ColorSchemeModeBehavior {
  /**
   * The current color scheme mode that is being used by your app that should
   * default to the `$color-scheme` SCSS variable. If the
   * {@link setColorSchemeMode} is called, this will update to that new value.
   *
   * TODO: Figure out how to document this
   *
   * - `colorScheme` - only `light` or `dark` -- only useful when the `colorSchemeMode` is set to `system`
   * - `colorSchemeMode` - current **user** defined color scheme behavior? should default to `$color-scheme`, but will change based on `setColorSchemeMode`
   */
  colorSchemeMode: ColorSchemeMode;

  /**
   * A function to update the color scheme.
   *
   * @see {@link useColorScheme} for an example usage
   */
  setColorSchemeMode: UseStateSetter<ColorSchemeMode>;
}

/** @since 6.0.0 */
export interface ColorSchemeContext extends ColorSchemeModeBehavior {
  /**
   * The current color scheme that is being used. This is only useful when the
   * {@link colorSchemeMode} is set to `"system"`.
   */
  colorScheme: ColorScheme;
}

const context = createContext<ColorSchemeContext>({
  colorScheme: "light",
  colorSchemeMode: "light",
  setColorSchemeMode() {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("The `ColorSchemeProvider` has not been initialized.");
    }
  },
});
context.displayName = "ColorScheme";
export const { Provider: ColorSchemeProvider } = context;

/**
 * @example Lazy Load Configurable Themes
 * ```tsx
 * import type { ChangeEvent, ReactElement } from "react";
 * import { lazy } from "react";
 * import { createRoot } from "react-doc/client";
 * import { Checkbox, ColorSchemeProvider, useColorScheme } from "@react-md/core";
 *
 * const DarkTheme = lazy(() => import("./DarkTheme"));
 * const SystemTheme = lazy(() => import("./SystemTheme"));
 *
 * function App(): ReactElement {
 *   const { colorScheme, colorSchemeMode, setColorSchemeMode } =
 *     useColorScheme();
 *
 *   const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
 *     const { value } = event.currentTarget;
 *     if (value === "light" || value === "dark" || value === "system") {
 *       setColorSchemeMode(value);
 *     }
 *   };
 *
 *   return (
 *     <>
 *       {colorSchemeMode === "dark" && <DarkTheme />}
 *       {colorSchemeMode === "system" && <SystemTheme />}
 *       <Checkbox
 *         label="Light"
 *         value="light"
 *         checked={colorSchemeMode === "light"}
 *         onChange={onChange}
 *       />
 *       <Checkbox
 *         label="Dark"
 *         value="dark"
 *         checked={colorSchemeMode === "dark"}
 *         onChange={onChange}
 *       />
 *       <Checkbox
 *         label="System"
 *         value="system"
 *         checked={colorSchemeMode === "system"}
 *         onChange={onChange}
 *       />
 *     </>
 *   );
 * }
 *
 *
 * const root = createRoot(document.getElementById("root"));
 * root.render(
 *   <ColorSchemeProvider>
 *     <App />
 *   </ColorSchemeProvider>
 * );
 *
 * // DarkTheme.tsx
 * import { useHtmlClassName } from "@react-md/core";
 *
 * import styles from "./DarkTheme.module.scss";
 *
 * export default function DarkTheme(): null {
 *   useHtmlClassName(styles.theme);
 *   return null
 * }
 *
 * // DarkTheme.module.scss
 * @use "@react-md/core";
 *
 * .theme {
 *   @include core.use-dark-theme;
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useColorScheme(): Readonly<ColorSchemeContext> {
  return useContext(context);
}
