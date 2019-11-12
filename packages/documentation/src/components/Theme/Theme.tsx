import React, { FC, useMemo } from "react";

import { ThemeMode } from "./colors";
import { ThemeContext } from "./useTheme";
import { ThemeActionsContext } from "./useThemeActions";
import useThemeConfiguration from "./useThemeConfiguration";

export interface ThemeProps {
  defaultTheme?: ThemeMode;
}

const Theme: FC<ThemeProps> = ({ defaultTheme = "light", children }) => {
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
};

export default Theme;
