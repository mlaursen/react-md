import React, { createContext, FunctionComponent, useContext } from "react";
import {
  useEventListener,
  useAppSize,
  AppSize as AppSizeType,
} from "@react-md/utils";

const AppSizeContext = createContext<AppSizeType>({
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isPortraitPhone: false,
  isLandscapePhone: false,
  isPortraitTablet: false,
  isLandscapeTablet: false,
  isLargeDesktop: false,
});

export function useAppSizeContext() {
  return useContext(AppSizeContext);
}

export const AppSize: FunctionComponent = ({ children }) => {
  const value = useAppSize();
  return (
    <AppSizeContext.Provider value={value}>{children}</AppSizeContext.Provider>
  );
};

export default AppSize;
