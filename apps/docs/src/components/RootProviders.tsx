"use client";

import {
  type PackageManager,
  PackageManagerProvider,
} from "@react-md/code/PackageManagerProvider";
import { TypescriptEnabledProvider } from "@react-md/code/TypescriptEnabledProvider";
import { CoreProviders } from "@react-md/core/CoreProviders";
import { MenuConfigurationProvider } from "@react-md/core/menu/MenuConfigurationProvider";
import { ThemeProvider } from "@react-md/core/theme/ThemeProvider";
import { TooltipHoverModeProvider } from "@react-md/core/tooltip/TooltipHoverModeProvider";
import { WritingDirectionProvider } from "@react-md/core/typography/WritingDirectionProvider";
import { type ReactElement, type ReactNode } from "react";

import { CODE_LANGUAGE_KEY, PACKAGE_MANAGER_KEY } from "@/constants/cookies.js";
import { rmdConfig } from "@/constants/rmdConfig.jsx";
import { setCookie } from "@/utils/clientCookies.js";
import { type AppCookies } from "@/utils/serverState.js";

import { CookieColorSchemeProvider } from "./CookieColorSchemeProvider.jsx";
import { PrismThemeProvider } from "./PrismThemeProvider.jsx";

const handlePackageManagerChange = (value: PackageManager): void => {
  setCookie(PACKAGE_MANAGER_KEY, value);
};
const handleTypescriptEnabledChange = (enabled: boolean): void => {
  setCookie(CODE_LANGUAGE_KEY, enabled ? "ts" : "js");
};

export interface RootProvidersProps extends AppCookies {
  children: ReactNode;
}

export function RootProviders(props: RootProvidersProps): ReactElement {
  const {
    children,
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
    defaultColorSchemeMode,
  } = props;

  return (
    <CoreProviders {...rmdConfig}>
      <WritingDirectionProvider>
        <MenuConfigurationProvider renderAsSheet="phone">
          <TooltipHoverModeProvider>
            <ThemeProvider>
              <CookieColorSchemeProvider
                defaultColorSchemeMode={defaultColorSchemeMode}
              >
                <TypescriptEnabledProvider
                  defaultValue={defaultCodeLanguage === "ts"}
                  onTypescriptEnabledChange={handleTypescriptEnabledChange}
                >
                  <PrismThemeProvider defaultPrismTheme={defaultPrismTheme}>
                    <PackageManagerProvider
                      defaultValue={defaultPackageManager}
                      onPackageManagerChange={handlePackageManagerChange}
                    >
                      {children}
                    </PackageManagerProvider>
                  </PrismThemeProvider>
                </TypescriptEnabledProvider>
              </CookieColorSchemeProvider>
            </ThemeProvider>
          </TooltipHoverModeProvider>
        </MenuConfigurationProvider>
      </WritingDirectionProvider>
    </CoreProviders>
  );
}
