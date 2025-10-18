import { CoreProviders } from "@react-md/core/CoreProviders";
import { DEFAULT_APP_SIZE } from "@react-md/core/media-queries/appSize";
import { type ReactElement, type ReactNode } from "react";

export interface RootProvidersProps {
  children: ReactNode;
}

export function RootProviders(props: RootProvidersProps): ReactElement {
  const { children } = props;

  return (
    <CoreProviders
      // these are the defaults
      ssr={false}
      ssrAppSize={DEFAULT_APP_SIZE}
      portalContainer={undefined}
    >
      {children}
    </CoreProviders>
  );
}
