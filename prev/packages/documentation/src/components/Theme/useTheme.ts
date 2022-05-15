import { createContext, useContext } from "react";
import Cookie from "js-cookie";
import scssVariables from "@react-md/theme/dist/scssVariables";

import type {
  PrimaryColor,
  SecondaryColor,
  ColorAccent,
  ThemeMode,
} from "./colors";

export interface Theme {
  primary: PrimaryColor;
  secondary: SecondaryColor;
  accent: ColorAccent;
  theme: ThemeMode;
}

export const DEFAULT_PRIMARY: PrimaryColor = "teal";
export const DEFAULT_SECONDARY: SecondaryColor = "pink";
export const DEFAULT_ACCENT: ColorAccent = 200;
export const DEFAULT_THEME: ThemeMode = "light";

export const DEFAULT_PRIMARY_COLOR = scssVariables["rmd-teal-500"];
export const DEFAULT_SECONDARY_COLOR = scssVariables["rmd-pink-a-200"];

export const ThemeContext = createContext<Theme>({
  primary: DEFAULT_PRIMARY,
  secondary: DEFAULT_SECONDARY,
  accent: DEFAULT_ACCENT,
  theme: DEFAULT_THEME,
});

export function getDefaultTheme(
  cookies?: Record<string, string | undefined>
): ThemeMode {
  if (cookies) {
    return cookies.theme === "dark" ? "dark" : "light";
  }

  if (typeof localStorage !== "undefined") {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "dark" || localTheme === "light") {
      return localTheme;
    }
  }

  const cookieTheme = Cookie.get("theme");
  return cookieTheme === "dark" ? "dark" : "light";
}

export default function useTheme(): Theme {
  return useContext(ThemeContext);
}
