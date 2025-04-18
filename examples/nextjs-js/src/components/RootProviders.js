"use client";

import { CoreProviders } from '@react-md/core/CoreProviders';
import { MenuConfigurationProvider } from '@react-md/core/menu/MenuConfigurationProvider';
import { TooltipHoverModeProvider } from '@react-md/core/tooltip/TooltipHoverModeProvider';
import { rmdConfig } from '../rmdConfig';

export function RootProviders({ children }) {
  return (
    <CoreProviders {...rmdConfig}>
      <MenuConfigurationProvider renderAsSheet="phone">
        <TooltipHoverModeProvider>{children}</TooltipHoverModeProvider>
      </MenuConfigurationProvider>
    </CoreProviders>
  )
}