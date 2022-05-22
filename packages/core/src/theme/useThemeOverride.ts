import type { CSSProperties } from "react";
import { useMemo } from "react";
import type { ThemeCssVarName } from "./cssVars";
import {
  backgroundColorVar,
  errorColorVar,
  onErrorColorVar,
  onPrimaryColorVar,
  onSecondaryColorVar,
  onSuccessColorVar,
  onWarningColorVar,
  primaryColorVar,
  secondaryColorVar,
  successColorVar,
  textDisabledColorVar,
  textHintColorVar,
  textPrimaryColorVar,
  textSecondaryColorVar,
  warningColorVar,
} from "./cssVars";
import type { ConfigurableThemeColorsName } from "./types";
import type { CSSVariable } from "./useCSSVariables";
import { useCSSVariables } from "./useCSSVariables";

type ThemeVarLookup = {
  [key in ConfigurableThemeColorsName]: ThemeCssVarName;
};

const VAR_NAME_LOOKUP: ThemeVarLookup = {
  backgroundColor: backgroundColorVar,
  primaryColor: primaryColorVar,
  onPrimaryColor: onPrimaryColorVar,
  secondaryColor: secondaryColorVar,
  onSecondaryColor: onSecondaryColorVar,
  warningColor: warningColorVar,
  onWarningColor: onWarningColorVar,
  errorColor: errorColorVar,
  onErrorColor: onErrorColorVar,
  successColor: successColorVar,
  onSuccessColor: onSuccessColorVar,
  textPrimaryColor: textPrimaryColorVar,
  textSecondaryColor: textSecondaryColorVar,
  textHintColor: textHintColorVar,
  textDisabledColor: textDisabledColorVar,
};

export interface ThemeOverride {
  name: ConfigurableThemeColorsName;
  value: string;
}

export type ThemeOverrides = readonly Readonly<ThemeOverride>[];

export function useThemeOverride(overrides: ThemeOverrides): void;
export function useThemeOverride(
  overrides: ThemeOverrides,
  local: true
): CSSProperties;
export function useThemeOverride(
  overrides: ThemeOverrides,
  local?: boolean
): CSSProperties | void {
  const variables = useMemo(
    () =>
      overrides.map<CSSVariable>(({ name, value }) => ({
        name: VAR_NAME_LOOKUP[name],
        value,
      })),
    [overrides]
  );

  return useCSSVariables(variables, local as true);
}
