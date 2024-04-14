"use client";
import { type ReactElement, type ReactNode } from "react";
import { useLocalStorage } from "../useLocalStorage.js";
import { ColorSchemeProvider, type ColorSchemeMode } from "./useColorScheme.js";
import { useColorSchemeProvider } from "./useColorSchemeProvider.js";

/**
 * @since 6.0.0
 */
export interface LocalStorageColorSchemeProviderProps {
  /**
   * Set this to `true` to prevent a `<meta name="color-scheme" content="{COLOR_SCHEME}">`
   * from being added to the `document.head`.
   *
   * @defaultValue `false`
   */
  disableMetaTag?: boolean;

  /**
   * Set this to a string like `"colorScheme"` if you want to store the user's
   * color scheme preference in local storage.
   *
   * @defaultValue `""`
   */
  localStorageKey?: string;

  /**
   * The current color scheme mode that is being used by your app. This should
   * match the `$color-scheme` SCSS variable.
   *
   * @defaultValue `"light"`
   */
  defaultColorSchemeMode?: ColorSchemeMode;

  children: ReactNode;
}

/**
 * An optional implementation of the {@link ColorSchemeProvider} that supports
 * storing the value in local storage if the
 * {@link LocalStorageColorSchemeProviderProps.localStorageKey} is provided.
 *
 * @example
 * ```tsx
 * import {
 *   LocalStorageColorSchemeProvider,
 *   SegmentedButtonContainer,
 *   SegmentedButton,
 *   useColorScheme,
 * } from "@react-md/core";
 * import { createRoot } from "react-dom/client";
 *
 * function MyComponent(): ReactElement {
 *   const { colorScheme, colorSchemeMode, setColorSchemeMode } = useColorScheme();
 *   // colorScheme: "light" | "dark"
 *   // colorSchemeMode: "light" | "dark" | "system"
 *
 *   return (
 *     <>
 *       The current color scheme is {colorScheme}
 *       <SegmentedButtonContainer>
 *         <SegmentedButton
 *           selected={colorSchemeMode === "light"}
 *           onClick={() => {
 *             setColorSchemeMode("light")
 *           }}
 *         >
 *           Light
 *         </SegmentedButton>
 *         <SegmentedButton
 *           selected={colorSchemeMode === "dark"}
 *           onClick={() => {
 *             setColorSchemeMode("dark")
 *           }}
 *         >
 *           Dark
 *         </SegmentedButton>
 *         <SegmentedButton
 *           selected={colorSchemeMode === "system"}
 *           onClick={() => {
 *             setColorSchemeMode("system")
 *           }}
 *         >
 *           System
 *         </SegmentedButton>
 *       </SegmentedButtonContainer>
 *     </>
 *   )l
 * }
 *
 * const container = document.getElementById("root");
 * const root = createRoot(container);
 *
 * root.render(
 *   <LocalStorageColorSchemeProvider defaultColorSchemeMode="system">
 *     <MyComponent />
 *   </LocalStorageColorSchemeProvider>
 * );
 * ```
 *
 * @since 6.0.0
 */
export function LocalStorageColorSchemeProvider(
  props: LocalStorageColorSchemeProviderProps
): ReactElement {
  const {
    localStorageKey = "",
    defaultColorSchemeMode = "light",
    disableMetaTag,
    children,
  } = props;

  const { value: colorSchemeMode, setValue: setColorSchemeMode } =
    useLocalStorage({
      key: localStorageKey,
      defaultValue: defaultColorSchemeMode,
      deserializer: (item) =>
        item === "light" || item === "dark" || item === "system"
          ? item
          : defaultColorSchemeMode,
    });

  const value = useColorSchemeProvider({
    disableMetaTag,
    colorSchemeMode,
    setColorSchemeMode,
  });

  return <ColorSchemeProvider value={value}>{children}</ColorSchemeProvider>;
}
