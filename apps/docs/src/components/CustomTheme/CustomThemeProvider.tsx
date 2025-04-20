"use client";

import { ThemeProvider } from "@react-md/core/theme/ThemeProvider";
import {
  type CSSVariable,
  type ConfigurableThemeColors,
} from "@react-md/core/theme/types";
import { useCSSVariables } from "@react-md/core/theme/useCSSVariables";
import { useColorScheme } from "@react-md/core/theme/useColorScheme";
import { type ReactElement, type ReactNode, useMemo, useState } from "react";

import { CUSTOM_THEME_KEY } from "@/constants/cookies.js";
import {
  DEFAULT_WEBSITE_DARK_THEME,
  DEFAULT_WEBSITE_LIGHT_THEME,
} from "@/constants/theme.js";
import { removeCookie, setCookie } from "@/utils/clientCookies.js";
import { kebabCase } from "@/utils/strings.js";

import { CustomThemeContextProvider } from "./useCustomThemeContext.js";

const EMPTY_OBJECT = {} as const;

export interface CustomThemeProviderProps {
  children: ReactNode;
  defaultCustomTheme: Partial<ConfigurableThemeColors> | undefined;
}

export function CustomThemeProvider({
  children,
  defaultCustomTheme = EMPTY_OBJECT,
}: Readonly<CustomThemeProviderProps>): ReactElement {
  const { currentColor } = useColorScheme();

  const [overrides, setOverrides] = useState<
    Partial<ConfigurableThemeColors> | undefined
  >(defaultCustomTheme);

  const theme = useMemo(() => {
    const defaults =
      currentColor === "light"
        ? DEFAULT_WEBSITE_LIGHT_THEME
        : DEFAULT_WEBSITE_DARK_THEME;
    return {
      ...defaults,
      ...overrides,
    };
  }, [currentColor, overrides]);
  const variables = useMemo<CSSVariable[]>(() => {
    if (!overrides) {
      return [];
    }

    return Object.entries(overrides).map<CSSVariable>(([name, value]) => ({
      name: `--rmd-${kebabCase(name as keyof ConfigurableThemeColors)}`,
      value,
    }));
  }, [overrides]);
  useCSSVariables(variables);

  return (
    <ThemeProvider theme={theme}>
      <CustomThemeContextProvider
        value={useMemo(
          () => ({
            setOverrides: (overrides) => {
              const next = JSON.stringify(overrides);
              setOverrides(overrides);
              if (next === "{}") {
                removeCookie(CUSTOM_THEME_KEY);
              } else {
                setCookie(CUSTOM_THEME_KEY, JSON.stringify(overrides));
              }
            },
          }),
          []
        )}
      >
        {children}
      </CustomThemeContextProvider>
    </ThemeProvider>
  );
}
