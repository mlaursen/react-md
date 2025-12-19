import { type ConfigurableThemeColors } from "@react-md/core/theme/types";
import { createContext, useContext } from "react";

export interface CustomThemeContext {
  setOverrides: (overrides: Partial<ConfigurableThemeColors>) => void;
}

const context = createContext<CustomThemeContext | null>(null);
export const { Provider: CustomThemeContextProvider } = context;

export function useCustomThemeContext(): Readonly<CustomThemeContext> {
  const value = useContext(context);
  if (!value) {
    throw new Error("CustomThemeContextProvider must be mounted");
  }

  return value;
}
