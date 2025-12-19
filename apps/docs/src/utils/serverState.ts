import { type PackageManager } from "@react-md/code/PackageManagerProvider";
import { isColorScheme } from "@react-md/core/theme/isColorScheme";
import {
  type CSSVariableName,
  type CSSVariablesProperties,
  type ColorScheme,
  type ConfigurableThemeColors,
} from "@react-md/core/theme/types";
import { cookies } from "next/headers.js";
import { type CSSProperties } from "react";
import "server-only";

import fallbackThemeStyles from "@/components/LoadThemeStyles/SystemTheme.module.scss";
import { type CodeLanguage } from "@/components/MainLayout/ConfigureTypescriptEnabled.js";
import {
  CODE_LANGUAGE_KEY,
  CODE_THEME_KEY,
  COLOR_SCHEME_KEY,
  PACKAGE_MANAGER_KEY,
} from "@/constants/cookies.js";
import { PRISM_THEMES, type PrismTheme } from "@/constants/prismThemes.js";
import { DISABLE_DEFAULT_SYSTEM_THEME } from "@/constants/rmdConfig.js";
import { getCookie, getThemeCookie } from "@/utils/serverCookies.js";

import { kebabCase, pascalCase } from "./strings.js";

export interface AppCookies {
  defaultPrismTheme: PrismTheme;
  defaultCodeLanguage: CodeLanguage;
  defaultPackageManager: PackageManager;
  defaultColorScheme: ColorScheme;
  defaultCustomTheme: Partial<ConfigurableThemeColors> | undefined;
}

export async function getAppCookies(): Promise<AppCookies> {
  const instance = await cookies();
  const defaultColorScheme = getCookie({
    name: COLOR_SCHEME_KEY,
    isValid: isColorScheme,
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
  const defaultCustomTheme = getThemeCookie(instance);

  return {
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
    defaultColorScheme,
    defaultCustomTheme,
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
  customProperties?: CSSProperties;
}

export async function getInitialState(): Promise<InitialAppState> {
  const {
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
    defaultColorScheme,
    defaultCustomTheme,
  } = await getAppCookies();

  let themeStyles: CSSModulesImport = {};
  if (defaultColorScheme !== "system" || DISABLE_DEFAULT_SYSTEM_THEME) {
    const themeName = pascalCase(defaultColorScheme);
    themeStyles = await loadStyles(
      import(`@/components/LoadThemeStyles/${themeName}Theme.module.scss`),
      fallbackThemeStyles
    );
  }

  let customProperties: CSSProperties | undefined;
  if (defaultCustomTheme) {
    const style: CSSVariablesProperties<CSSVariableName> = {};
    for (const [name, value] of Object.entries(defaultCustomTheme)) {
      style[`--rmd-${kebabCase(name)}`] = value;
    }

    customProperties = style;
  }

  return {
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
    defaultColorScheme,
    defaultCustomTheme,
    themeStyles,
    customProperties,
  };
}
