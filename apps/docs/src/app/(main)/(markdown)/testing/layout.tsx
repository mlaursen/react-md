import { type ReactElement, type ReactNode } from "react";

import { TestFrameworkProvider } from "./TestFrameworkProvider.js";

export interface TestingOverviewLayoutProps {
  children: ReactNode;
}

export default function TestingOverviewLayout({
  children,
}: TestingOverviewLayoutProps): ReactElement {
  return <TestFrameworkProvider>{children}</TestFrameworkProvider>;
}
