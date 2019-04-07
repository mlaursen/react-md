import React, { createContext, FunctionComponent, useContext } from "react";
import { useAppSize, AppSize as AppSizeType } from "@react-md/utils";

const DEFAULTS = {
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isPortraitPhone: false,
  isLandscapePhone: false,
  isPortraitTablet: false,
  isLandscapeTablet: false,
  isLargeDesktop: false,
};

const AppSizeContext = createContext<AppSizeType>(DEFAULTS);

export function useAppSizeContext() {
  return useContext(AppSizeContext);
}

export const AppSize: FunctionComponent<Partial<AppSizeType>> = ({
  children,
  ...defaults
}) => {
  const value = useAppSize({ defaultValue: defaults as AppSizeType });
  return (
    <AppSizeContext.Provider value={value}>{children}</AppSizeContext.Provider>
  );
};

AppSize.defaultProps = DEFAULTS;

export default AppSize;
