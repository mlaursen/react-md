"use client";

import { type ReactElement, type ReactNode } from "react";

import { useLocalStorage } from "../useLocalStorage.js";
import { isColorScheme } from "./isColorScheme.js";
import { type ColorScheme } from "./types.js";
import { ColorSchemeProvider } from "./useColorScheme.js";
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
  defaultColorScheme?: ColorScheme;

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
 *   const { currentColor, colorScheme, setColorScheme } = useColorScheme();
 *   // currentColor: "light" | "dark"
 *   // colorScheme: "light" | "dark" | "system"
 *
 *   return (
 *     <>
 *       The current color scheme is {currentColor}
 *       <SegmentedButtonContainer>
 *         <SegmentedButton
 *           selected={colorScheme === "light"}
 *           onClick={() => {
 *             setColorScheme("light")
 *           }}
 *         >
 *           Light
 *         </SegmentedButton>
 *         <SegmentedButton
 *           selected={colorScheme === "dark"}
 *           onClick={() => {
 *             setColorScheme("dark")
 *           }}
 *         >
 *           Dark
 *         </SegmentedButton>
 *         <SegmentedButton
 *           selected={colorScheme === "system"}
 *           onClick={() => {
 *             setColorScheme("system")
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
 *   <LocalStorageColorSchemeProvider defaultColorScheme="system">
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
    defaultColorScheme = "light",
    disableMetaTag,
    children,
  } = props;

  const { value: colorScheme, setValue: setColorScheme } = useLocalStorage({
    key: localStorageKey,
    defaultValue: defaultColorScheme,
    deserializer: (item) => (isColorScheme(item) ? item : defaultColorScheme),
  });

  const value = useColorSchemeProvider({
    disableMetaTag,
    colorScheme,
    setColorScheme,
  });

  return <ColorSchemeProvider value={value}>{children}</ColorSchemeProvider>;
}
