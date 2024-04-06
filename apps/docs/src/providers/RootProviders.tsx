"use client";
import { AppToastRenderer } from "@/components/AppToastRenderer.jsx";
import { rmdConfig } from "@/constants/rmdConfig.jsx";
import { appToastManager } from "@/toasts.js";
import { type AppCookies } from "@/utils/serverState.js";
import {
  CoreProviders,
  MenuConfigurationProvider,
  NullSuspense,
  Snackbar,
  ThemeProvider,
  ToastManagerProvider,
  TooltipHoverModeProvider,
  WritingDirectionProvider,
} from "react-md";
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
                    <ToastManagerProvider manager={appToastManager}>
                      <TooltipHoverModeProvider>
                        {children}
                      </TooltipHoverModeProvider>
                      <NullSuspense>
                        <Snackbar renderToast={AppToastRenderer} />
                      </NullSuspense>
                    </ToastManagerProvider>
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
