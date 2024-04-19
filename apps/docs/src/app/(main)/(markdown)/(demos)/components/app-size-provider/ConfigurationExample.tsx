import { AppSizeProvider } from "@react-md/core/media-queries/AppSizeProvider";
import { type AppSizeQueries } from "@react-md/core/media-queries/appSize";
import { type ReactNode } from "react";

// these are the defaults and can be numbers or strings
const APP_SIZE_QUERIES: AppSizeQueries = {
  phoneMaxWidth: "47.9375em",
  tabletMinWidth: "48em",
  tabletMaxWidth: "64em",
  desktopMinWidth: "64.0625em",
  desktopLargeMinWidth: "80em",
};

export function RootProvider({ children }: { children: ReactNode }): ReactNode {
  return <AppSizeProvider {...APP_SIZE_QUERIES}>{children}</AppSizeProvider>;
}
