import fallbackThemeStyles from "@/components/LoadThemeStyles/SystemTheme.module.scss";
import type { CodeLanguage } from "@/components/RootProviders/CodeLanguageProvider.jsx";
import type { PackageManager } from "@/components/RootProviders/PackageManagerProvider.jsx";
import {
  CODE_LANGUAGE_KEY,
  CODE_THEME_KEY,
  COLOR_SCHEME_KEY,
  PACKAGE_MANAGER_KEY,
} from "@/constants/cookies.js";
import { DISABLE_DEFAULT_SYSTEM_THEME } from "@/constants/rmdConfig.jsx";
import fallbackPrismStyles from "@/prism-themes/VimSolarizedDark.module.scss";
import type { PrismTheme } from "@/prism-themes/themes.js";
import { PRISM_THEMES } from "@/prism-themes/themes.js";
import { getCookie } from "@/utils/serverCookies.js";
import { pascalCase } from "@/utils/strings.js";
import type { ColorSchemeMode } from "@react-md/core";
import { cookies } from "next/headers.js";
import "server-only";

export interface AppCookies {
  defaultColorScheme: ColorSchemeMode;
  defaultPrismTheme: PrismTheme;
  defaultCodeLanguage: CodeLanguage;
  defaultPackageManager: PackageManager;
}

export function getAppCookies(): AppCookies {
  const instance = cookies();
  const defaultColorScheme = getCookie({
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
    defaultValue: "default",
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
    defaultColorScheme,
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
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
    defaultColorScheme,
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
  } = getAppCookies();
  const prismName = pascalCase(defaultPrismTheme);
  const prismStyles = await loadStyles(
    import(`@/prism-themes/${prismName}.module.scss`),
    fallbackPrismStyles
  );

  let themeStyles: CSSModulesImport = {};
  if (defaultColorScheme !== "system" || DISABLE_DEFAULT_SYSTEM_THEME) {
    const themeName = pascalCase(defaultColorScheme);
    themeStyles = await loadStyles(
      import(`@/components/LoadThemeStyles/${themeName}Theme.module.scss`),
      fallbackThemeStyles
    );
  }

  return {
    defaultColorScheme,
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
    prismStyles,
    themeStyles,
  };
}
