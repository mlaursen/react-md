import type { ReactElement, ReactNode } from "react";
import { useMemo } from "react";

import type { ThemeMode } from "./colors";
import { ThemeContext } from "./useTheme";
import { ThemeActionsContext } from "./useThemeActions";
import useThemeConfiguration from "./useThemeConfiguration";

export interface ThemeProps {
  defaultTheme?: ThemeMode;
  children: ReactNode;
}

export default function Theme({
  defaultTheme = "light",
  children,
}: ThemeProps): ReactElement {
  const {
    primary,
    secondary,
    accent,
    theme,
    setPrimary,
    setSecondary,
    setAccent,
    toggleTheme,
    reset,
  } = useThemeConfiguration(defaultTheme);

  const currentTheme = useMemo(
    () => ({
      primary,
      secondary,
      accent,
      theme,
    }),
    [accent, primary, secondary, theme]
  );
  const actions = useMemo(
    () => ({
      setPrimary,
      setSecondary,
      setAccent,
      toggleTheme,
      reset,
    }),
    [reset, setAccent, setPrimary, setSecondary, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={currentTheme}>
      <ThemeActionsContext.Provider value={actions}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeContext.Provider>
  );
}
