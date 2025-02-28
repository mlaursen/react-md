"use client";

import { createContext, useContext } from "react";

import { type ColorSchemeContext } from "./types.js";

const context = createContext<ColorSchemeContext>({
  currentColor: "light",
  colorScheme: "light",
  setColorScheme() {
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
 * import { Checkbox } from "@react-md/core/form/Checkbox";
 * import { ColorSchemeProvider, useColorScheme } from "@react-md/core/theme/useColorScheme";
 * import { type ChangeEvent, lazy, type ReactElement } from "react";
 * import { createRoot } from "react-dom/client";
 *
 * const DarkTheme = lazy(() => import("./DarkTheme.jsx"));
 * const SystemTheme = lazy(() => import("./SystemTheme.jsx"));
 *
 * function App(): ReactElement {
 *   const { currentColor, colorScheme, setColorScheme } =
 *     useColorScheme();
 *
 *   const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
 *     const { value } = event.currentTarget;
 *     if (value === "light" || value === "dark" || value === "system") {
 *       setColorScheme(value);
 *     }
 *   };
 *
 *   return (
 *     <>
 *       <NullSuspense>
 *         {colorScheme === "dark" && <DarkTheme />}
 *         {colorScheme === "system" && <SystemTheme />}
 *       </NullSuspense>
 *       <Checkbox
 *         label="Light"
 *         value="light"
 *         checked={colorScheme === "light"}
 *         onChange={onChange}
 *       />
 *       <Checkbox
 *         label="Dark"
 *         value="dark"
 *         checked={colorScheme === "dark"}
 *         onChange={onChange}
 *       />
 *       <Checkbox
 *         label="System"
 *         value="system"
 *         checked={colorScheme === "system"}
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
 * import { useHtmlClassName } from "@react-md/core/useHtmlClassName";
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
