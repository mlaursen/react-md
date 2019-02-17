import React, { createContext, FunctionComponent, useContext } from "react";
import { useEventListener, useAppSize, IAppSize } from "@react-md/utils";

const AppSizeContext = createContext<IAppSize>({
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isPortraitPhone: false,
  isLandscapePhone: false,
  isPortraitTablet: false,
  isLandscapeTablet: false,
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
