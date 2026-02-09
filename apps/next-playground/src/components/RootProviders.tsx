"use client";

import { CoreProviders } from "@react-md/core/CoreProviders";
import { MenuConfigurationProvider } from "@react-md/core/menu/MenuConfigurationProvider";
import { LocalStorageColorSchemeProvider } from "@react-md/core/theme/LocalStorageColorSchemeProvider";
import { TooltipHoverModeProvider } from "@react-md/core/tooltip/TooltipHoverModeProvider";
import { type ReactElement, type ReactNode } from "react";

import { rmdConfig } from "../rmdConfig.js";

export interface RootProvidersProps {
  children: ReactNode;
}

export function RootProviders({ children }: RootProvidersProps): ReactElement {
  return (
    <CoreProviders {...rmdConfig}>
      <MenuConfigurationProvider renderAsSheet="phone">
        <LocalStorageColorSchemeProvider defaultColorScheme="system">
          <TooltipHoverModeProvider>{children}</TooltipHoverModeProvider>
        </LocalStorageColorSchemeProvider>
      </MenuConfigurationProvider>
    </CoreProviders>
  );
}
