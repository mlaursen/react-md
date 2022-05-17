import type { ReactElement, ReactNode } from "react";

import type { AppSizeQueries } from "./AppSizeProvider";
import { AppSizeProvider } from "./AppSizeProvider";
import { UserInteractionModeProvider } from "./UserInteractionModeProvider";

export interface CoreProvidersProps {
  appSizeQueries: Readonly<AppSizeQueries>;
  children: ReactNode;
}

export function CoreProviders(props: CoreProvidersProps): ReactElement {
  const { appSizeQueries, children } = props;
  return (
    <UserInteractionModeProvider>
      <AppSizeProvider {...appSizeQueries}>{children}</AppSizeProvider>
    </UserInteractionModeProvider>
  );
}
