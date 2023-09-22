"use client";
import { rmdConfig } from "@/constants/rmdConfig.js";
import { type PrismTheme } from "@/prism-themes/themes.js";
import {
  CoreProviders,
  MenuConfigurationProvider,
  NullSuspense,
  Snackbar,
  ThemeProvider,
} from "@react-md/core";
import { type ReactElement, type ReactNode } from "react";
import { AppToastRenderer } from "../AppToastRenderer/AppToastRenderer.jsx";
import {
  CodeLanguageProvider,
  type CodeLanguage,
} from "./CodeLanguageProvider.jsx";
import {
  PackageManagerProvider,
  type PackageManager,
} from "./PackageManagerProvider.jsx";
import { PrismThemeProvider } from "./PrismThemeProvider.jsx";

export interface RootProvidersProps {
  children: ReactNode;
  defaultPrismTheme?: PrismTheme;
  defaultCodeLanguage?: CodeLanguage;
  defaultPackageManager?: PackageManager;
}

export function RootProviders(props: RootProvidersProps): ReactElement {
  const {
    children,
    defaultPrismTheme = "default",
    defaultCodeLanguage = "ts",
    defaultPackageManager = "npm",
  } = props;

  return (
    <CoreProviders {...rmdConfig}>
      <MenuConfigurationProvider renderAsSheet="phone">
        <ThemeProvider>
          <PrismThemeProvider defaultPrismTheme={defaultPrismTheme}>
            <PackageManagerProvider
              defaultPackageManager={defaultPackageManager}
            >
              <CodeLanguageProvider defaultCodeLanguage={defaultCodeLanguage}>
                {children}
                <NullSuspense>
                  <Snackbar renderToast={AppToastRenderer} />
                </NullSuspense>
              </CodeLanguageProvider>
            </PackageManagerProvider>
          </PrismThemeProvider>
        </ThemeProvider>
      </MenuConfigurationProvider>
    </CoreProviders>
  );
}
