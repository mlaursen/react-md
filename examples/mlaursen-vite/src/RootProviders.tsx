import { CoreProviders } from "@react-md/core/CoreProviders";
import { MenuConfigurationProvider } from "@react-md/core/menu/MenuConfigurationProvider";
import { TooltipHoverModeProvider } from "@react-md/core/tooltip/TooltipHoverModeProvider";
import { type ReactElement, type ReactNode } from "react";

import { rmdConfig } from "./rmdConfig";

export interface RootProvidersProps {
  children: ReactNode;
}

export function RootProviders({ children }: RootProvidersProps): ReactElement {
  return (
    <CoreProviders {...rmdConfig}>
      <MenuConfigurationProvider renderAsSheet="phone">
        <TooltipHoverModeProvider>{children}</TooltipHoverModeProvider>
      </MenuConfigurationProvider>
    </CoreProviders>
  );
}
