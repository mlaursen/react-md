"use client";
import { rmdConfig } from "@/constants/rmdConfig.jsx";
import { type AppCookies } from "@/utils/serverState.js";
import { CoreProviders } from "@react-md/core/CoreProviders";
import { MenuConfigurationProvider } from "@react-md/core/menu/MenuConfigurationProvider";
import { TooltipHoverModeProvider } from "@react-md/core/tooltip/TooltipHoverModeProvider";
import { WritingDirectionProvider } from "@react-md/core/typography/WritingDirectionProvider";
import { type ReactElement, type ReactNode } from "react";
import { CodeLanguageProvider } from "./CodeLanguageProvider.jsx";
import { CookieColorSchemeProvider } from "./CookieColorSchemeProvider.jsx";
import { PackageManagerProvider } from "./PackageManagerProvider.jsx";
import { PrismThemeProvider } from "./PrismThemeProvider.jsx";

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
            <CookieColorSchemeProvider
              defaultColorSchemeMode={defaultColorSchemeMode}
            >
              <CodeLanguageProvider defaultCodeLanguage={defaultCodeLanguage}>
                <PrismThemeProvider defaultPrismTheme={defaultPrismTheme}>
                  <PackageManagerProvider
                    defaultPackageManager={defaultPackageManager}
                  >
                    {children}
                  </PackageManagerProvider>
                </PrismThemeProvider>
              </CodeLanguageProvider>
            </CookieColorSchemeProvider>
          </TooltipHoverModeProvider>
        </MenuConfigurationProvider>
      </WritingDirectionProvider>
    </CoreProviders>
  );
}
