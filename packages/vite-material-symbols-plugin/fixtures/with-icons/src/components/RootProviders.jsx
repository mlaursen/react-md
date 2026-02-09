import { CoreProviders } from "@react-md/core/CoreProviders";
import { MenuConfigurationProvider } from "@react-md/core/menu/MenuConfigurationProvider";
import { TooltipHoverModeProvider } from "@react-md/core/tooltip/TooltipHoverModeProvider";

export function RootProviders({ children }) {
  return (
    <CoreProviders>
      <MenuConfigurationProvider renderAsSheet="phone">
        <TooltipHoverModeProvider>{children}</TooltipHoverModeProvider>
      </MenuConfigurationProvider>
    </CoreProviders>
  );
}
