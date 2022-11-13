import { createContext, useContext, useMemo } from "react";
import type { CustomLayout } from "./useCustomLayout";
import { useCustomLayout } from "./useCustomLayout";

export type WebsiteConfigurationContext = CustomLayout;

const context = createContext<WebsiteConfigurationContext | undefined>(
  undefined
);

export const { Provider: WebsiteConfigurationProvider } = context;

export function useWebsiteConfiguration(): Readonly<WebsiteConfigurationContext> {
  const value = useContext(context);
  if (!value) {
    throw new Error();
  }

  return value;
}

export function useWebsiteConfigurationProvider(): Readonly<WebsiteConfigurationContext> {
  const {
    phoneLayout,
    setPhoneLayout,
    tabletLayout,
    setTabletLayout,
    desktopLayout,
    setDesktopLayout,
    largeDesktopLayout,
    setLargeDesktopLayout,
    landscapeTabletLayout,
    setLandscapeTabletLayout,
  } = useCustomLayout();

  return useMemo(
    () => ({
      phoneLayout,
      setPhoneLayout,
      tabletLayout,
      setTabletLayout,
      desktopLayout,
      setDesktopLayout,
      largeDesktopLayout,
      setLargeDesktopLayout,
      landscapeTabletLayout,
      setLandscapeTabletLayout,
    }),
    [
      desktopLayout,
      landscapeTabletLayout,
      largeDesktopLayout,
      phoneLayout,
      setDesktopLayout,
      setLandscapeTabletLayout,
      setLargeDesktopLayout,
      setPhoneLayout,
      setTabletLayout,
      tabletLayout,
    ]
  );
}
