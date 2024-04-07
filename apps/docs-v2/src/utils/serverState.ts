import { type CodeLanguage } from "@/components/MainLayout/ConfigureTypescriptEnabled.jsx";
import {
  CODE_LANGUAGE_KEY,
  CODE_THEME_KEY,
  COLOR_SCHEME_KEY,
  PACKAGE_MANAGER_KEY,
} from "@/constants/cookies.js";
import { PRISM_THEMES, type PrismTheme } from "@/constants/prismThemes.js";
import { getCookie } from "@/utils/serverCookies.js";
import { type PackageManager } from "@react-md/code/PackageManagerProvider";
import { type ColorSchemeMode } from "@react-md/core/theme/useColorScheme";
import { cookies } from "next/headers.js";
import "server-only";

export interface AppCookies {
  defaultPrismTheme: PrismTheme;
  defaultCodeLanguage: CodeLanguage;
  defaultPackageManager: PackageManager;
  defaultColorSchemeMode: ColorSchemeMode;
}

export function getAppCookies(): AppCookies {
  const instance = cookies();
  const defaultColorSchemeMode = getCookie({
    name: COLOR_SCHEME_KEY,
    isValid: (value): value is ColorSchemeMode =>
      value === "light" || value === "dark" || value === "system",
    defaultValue: "system",
    instance,
  });
  const defaultPrismTheme = getCookie({
    name: CODE_THEME_KEY,
    isValid: (value): value is PrismTheme =>
      PRISM_THEMES.includes(value as PrismTheme),
    defaultValue: "vim-solarized-dark",
    instance,
  });
  const defaultCodeLanguage = getCookie({
    name: CODE_LANGUAGE_KEY,
    isValid: (value): value is CodeLanguage => value === "ts" || value === "js",
    defaultValue: "ts",
    instance,
  });
  const defaultPackageManager = getCookie({
    name: PACKAGE_MANAGER_KEY,
    isValid: (value): value is PackageManager =>
      value === "npm" || value === "yarn" || value === "pnpm",
    defaultValue: "npm",
    instance,
  });

  return {
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
    defaultColorSchemeMode,
  };
}
