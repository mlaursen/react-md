import fallbackThemeStyles from "@/components/LoadThemeStyles/SystemTheme.module.scss";
import { type CodeLanguage } from "@/components/MainLayout/ConfigureTypescriptEnabled.jsx";
import {
  CODE_LANGUAGE_KEY,
  CODE_THEME_KEY,
  COLOR_SCHEME_KEY,
  PACKAGE_MANAGER_KEY,
} from "@/constants/cookies.js";
import { PRISM_THEMES, type PrismTheme } from "@/constants/prismThemes.js";
import { DISABLE_DEFAULT_SYSTEM_THEME } from "@/constants/rmdConfig.jsx";
import { getCookie } from "@/utils/serverCookies.js";
import { type PackageManager } from "@react-md/code/PackageManagerProvider";
import { isColorSchemeMode } from "@react-md/core/theme/isColorScheme";
import { type ColorSchemeMode } from "@react-md/core/theme/types";
import { cookies } from "next/headers.js";
import "server-only";
import { pascalCase } from "./strings.js";

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
    isValid: isColorSchemeMode,
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

export type CSSModulesImport = typeof fallbackThemeStyles;

async function loadStyles(
  load: Promise<{ default: CSSModulesImport }>,
  fallback: CSSModulesImport
): Promise<CSSModulesImport> {
  return await load
    .then((mod) => mod.default)
    .catch((error: unknown) => {
      if (process.env.NODE_ENV !== "production") {
        throw error;
      }

      return fallback;
    });
}

export interface InitialAppState extends AppCookies {
  themeStyles: CSSModulesImport;
}

export async function getInitialState(): Promise<InitialAppState> {
  const {
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
    defaultColorSchemeMode,
  } = getAppCookies();

  let themeStyles: CSSModulesImport = {};
  if (defaultColorSchemeMode !== "system" || DISABLE_DEFAULT_SYSTEM_THEME) {
    const themeName = pascalCase(defaultColorSchemeMode);
    themeStyles = await loadStyles(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      import(`@/components/LoadThemeStyles/${themeName}Theme.module.scss`),
      fallbackThemeStyles
    );
  }

  return {
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
    defaultColorSchemeMode,
    themeStyles,
  };
}
