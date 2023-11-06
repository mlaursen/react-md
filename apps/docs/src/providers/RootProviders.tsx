"use client";
import { type AppCookies } from "@/app/utils/serverState.js";
import { AppToastRenderer } from "@/components/AppToastRenderer/AppToastRenderer.jsx";
import { rmdConfig } from "@/constants/rmdConfig.js";
import {
  CoreProviders,
  MenuConfigurationProvider,
  NullSuspense,
  Snackbar,
  ThemeProvider,
  TooltipHoverModeProvider,
  WritingDirectionProvider,
} from "@react-md/core";
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
          <CookieColorSchemeProvider
            defaultColorSchemeMode={defaultColorSchemeMode}
          >
            <ThemeProvider>
              <PrismThemeProvider defaultPrismTheme={defaultPrismTheme}>
                <PackageManagerProvider
                  defaultPackageManager={defaultPackageManager}
                >
                  <CodeLanguageProvider
                    defaultCodeLanguage={defaultCodeLanguage}
                  >
                    <TooltipHoverModeProvider>
                      {children}
                    </TooltipHoverModeProvider>
                    <NullSuspense>
                      <Snackbar renderToast={AppToastRenderer} />
                    </NullSuspense>
                  </CodeLanguageProvider>
                </PackageManagerProvider>
              </PrismThemeProvider>
            </ThemeProvider>
          </CookieColorSchemeProvider>
        </MenuConfigurationProvider>
      </WritingDirectionProvider>
    </CoreProviders>
  );
}
