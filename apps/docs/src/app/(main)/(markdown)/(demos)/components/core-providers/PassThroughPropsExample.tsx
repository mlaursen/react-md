import { CoreProviders } from "@react-md/core/CoreProviders";
import {
  DEFAULT_APP_SIZE,
  DEFAULT_APP_SIZE_QUERIES,
} from "@react-md/core/media-queries/appSize";
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
      appSizeQueries={DEFAULT_APP_SIZE_QUERIES}
      portalContainer={undefined}
    >
      {children}
    </CoreProviders>
  );
}
