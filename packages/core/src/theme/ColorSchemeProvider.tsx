import type { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "../useMediaQuery";
import { backgroundColorVar } from "./cssVars";
import { getContrastRatio } from "./utils";

export type ColorScheme = "light" | "dark";
export type ColorSchemeMode = ColorScheme | "system";
export type SetColorSchemeMode = Dispatch<SetStateAction<ColorSchemeMode>>;

export interface ColorSchemeContext {
  colorScheme: ColorScheme;
  colorSchemeMode: ColorSchemeMode;
  setColorSchemeMode: SetColorSchemeMode;
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
const { Provider } = context;

export type DefaultColorScheme = ColorScheme | (() => ColorScheme);

export function useColorScheme(): Readonly<ColorSchemeContext> {
  return useContext(context);
}

export interface ColorSchemeProviderProps {
  mode?: ColorSchemeMode;
  defaultScheme?: DefaultColorScheme;
  children: ReactNode;
}

export function ColorSchemeProvider(
  props: ColorSchemeProviderProps
): ReactElement {
  const {
    children,
    mode = "light",
    defaultScheme = mode === "dark" ? "dark" : "light",
  } = props;
  const [colorSchemeMode, setColorSchemeMode] =
    useState<ColorSchemeMode>(defaultScheme);
  const isDarkTheme = useMediaQuery(
    "(prefers-color-scheme: dark)",
    mode !== "system"
  );
  const derivedColorScheme = isDarkTheme ? "dark" : "light";
  const colorScheme = mode === "system" ? derivedColorScheme : mode;

  const value = useMemo<ColorSchemeContext>(
    () => ({
      colorScheme,
      colorSchemeMode,
      setColorSchemeMode,
    }),
    [colorScheme, colorSchemeMode]
  );
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (mode === "system") {
        return;
      }

      const rootElement = document.documentElement;
      const rootStyles = window.getComputedStyle(rootElement);
      const backgroundColor = rootStyles.getPropertyValue(backgroundColorVar);
      const lightContrast = getContrastRatio(backgroundColor, "#fff");
      const darkContrast = getContrastRatio(backgroundColor, "#000");
      const isDarkMode = darkContrast < lightContrast;
      const isLightMode = lightContrast < darkContrast;
      if (
        (isDarkMode && mode === "light") ||
        (isLightMode && mode === "dark")
      ) {
        const currentMode = isDarkMode ? "dark" : "light";
        // eslint-disable-next-line no-console
        console.warn(
          `The "mode" for the \`ColorSchemeProvider\` has been set to "${mode}" but ` +
            `the root background color is "${currentMode}". ` +
            `This prop might need to be changed to "${currentMode}" or "system".`
        );
      }
      // if (darkContrast > lightContrast && mode !== "st") {
      //   console.warn("The `ColorSchemeProvider` was initialized to have a ");
      // }
    }, []);
  }

  return <Provider value={value}>{children}</Provider>;
}
