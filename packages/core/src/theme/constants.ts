import {
  black,
  blue500,
  greenAccent700,
  orangeAccent200,
  orangeAccent400,
  red500,
} from "./colors.js";
import { type ConfigurableThemeColors, type ThemeColors } from "./types.js";

/** @since 6.0.0 */
export const DEFAULT_THEME_COLORS: Readonly<ThemeColors> = {
  primaryColor: blue500,
  onPrimaryColor: black,
  secondaryColor: orangeAccent400,
  onSecondaryColor: black,
  warningColor: orangeAccent200,
  onWarningColor: black,
  errorColor: red500,
  onErrorColor: black,
  successColor: greenAccent700,
  onSuccessColor: black,
};

/** @since 6.0.0 */
export const DEFAULT_LIGHT_THEME: Readonly<ConfigurableThemeColors> = {
  ...DEFAULT_THEME_COLORS,
  backgroundColor: "#fafafa",
  textPrimaryColor: "#212121",
  textSecondaryColor: "#757575",
  textHintColor: "#a8a8a8",
  textDisabledColor: "#9e9e9e",
};

/** @since 6.0.0 */
export const DEFAULT_DARK_THEME: Readonly<ConfigurableThemeColors> = {
  ...DEFAULT_THEME_COLORS,
  backgroundColor: "#121212",
  textPrimaryColor: "#d9d9d9",
  textSecondaryColor: "#b3b3b3",
  textHintColor: "gray", // #808080
  textDisabledColor: "gray", // #808080
};
