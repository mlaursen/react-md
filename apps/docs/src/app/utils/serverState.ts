import fallbackThemeStyles from "@/components/LoadThemeStyles/SystemTheme.module.scss";
import {
  CODE_LANGUAGE_KEY,
  CODE_THEME_KEY,
  COLOR_SCHEME_KEY,
  PACKAGE_MANAGER_KEY,
} from "@/constants/cookies.js";
import { DISABLE_DEFAULT_SYSTEM_THEME } from "@/constants/rmdConfig.jsx";
import fallbackPrismStyles from "@/prism-themes/VimSolarizedDark.module.scss";
import { PRISM_THEMES, type PrismTheme } from "@/prism-themes/themes.js";
import { type CodeLanguage } from "@/providers/CodeLanguageProvider.jsx";
import { type PackageManager } from "@/providers/PackageManagerProvider.jsx";
import { getCookie } from "@/utils/serverCookies.js";
import { pascalCase } from "@/utils/strings.js";
import { type ColorSchemeMode } from "@react-md/core";
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

export type CSSModulesImport = typeof fallbackPrismStyles;

async function loadStyles(
  load: Promise<{ default: CSSModulesImport }>,
  fallback: CSSModulesImport
): Promise<CSSModulesImport> {
  return await load
    .then((mod) => mod.default)
    .catch((error) => {
      if (process.env.NODE_ENV !== "production") {
        throw error;
      }

      return fallback;
    });
}

export interface InitialAppState extends AppCookies {
  prismStyles: CSSModulesImport;
  themeStyles: CSSModulesImport;
}

export async function getInitialState(): Promise<InitialAppState> {
  const {
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
    defaultColorSchemeMode,
  } = getAppCookies();
  const prismName = pascalCase(defaultPrismTheme);
  const prismStyles = await loadStyles(
    import(`@/prism-themes/${prismName}.module.scss`),
    fallbackPrismStyles
  );

  let themeStyles: CSSModulesImport = {};
  if (defaultColorSchemeMode !== "system" || DISABLE_DEFAULT_SYSTEM_THEME) {
    const themeName = pascalCase(defaultColorSchemeMode);
    themeStyles = await loadStyles(
      import(`@/components/LoadThemeStyles/${themeName}Theme.module.scss`),
      fallbackThemeStyles
    );
  }

  return {
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
    defaultColorSchemeMode,
    prismStyles,
    themeStyles,
  };
}
