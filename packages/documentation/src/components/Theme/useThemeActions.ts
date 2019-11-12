import { createContext, useContext } from "react";

import { PrimaryColor, SecondaryColor, ColorAccent } from "./colors";

export type SetPrimary = (color: PrimaryColor) => void;
export type SetSecondary = (color: SecondaryColor) => void;
export type SetAccent = (accent: ColorAccent | string) => void;
export type ToggleTheme = () => void;
export type ResetTheme = () => void;

export interface ThemeActions {
  setPrimary: SetPrimary;
  setSecondary: SetSecondary;
  setAccent: SetAccent;
  toggleTheme: ToggleTheme;
  reset: ResetTheme;
}

const noop = (): void => {};
export const ThemeActionsContext = createContext<ThemeActions>({
  setPrimary: noop,
  setSecondary: noop,
  setAccent: noop,
  toggleTheme: noop,
  reset: noop,
});

export default function useThemeActions(): ThemeActions {
  return useContext(ThemeActionsContext);
}
