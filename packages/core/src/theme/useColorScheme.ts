"use client";

import { createContext, useContext } from "react";

import { type ColorSchemeContext } from "./types.js";

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
