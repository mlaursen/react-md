"use client";
import { rmdConfig } from "@/constants/rmdConfig.jsx";
import { CoreProviders } from "@react-md/core/CoreProviders";
import { type ReactElement, type ReactNode } from "react";

export interface RootProvidersProps {
  children: ReactNode;
}

export function RootProviders(props: RootProvidersProps): ReactElement {
  const { children } = props;

  return <CoreProviders {...rmdConfig}>{children}</CoreProviders>;
}
