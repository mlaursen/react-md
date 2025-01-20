"use client";

import { CoreProviders } from "@react-md/core/CoreProviders";
import { TooltipHoverModeProvider } from "@react-md/core/tooltip/TooltipHoverModeProvider";
import { type ReactElement, type ReactNode } from "react";

import { rmdConfig } from "@/constants/rmdConfig.jsx";

export interface RootProvidersProps {
  children: ReactNode;
}

export function RootProviders(props: RootProvidersProps): ReactElement {
  const { children } = props;

  return (
    <CoreProviders {...rmdConfig}>
      <TooltipHoverModeProvider>{children}</TooltipHoverModeProvider>
    </CoreProviders>
  );
}
