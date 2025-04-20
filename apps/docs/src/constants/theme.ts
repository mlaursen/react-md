import { black, pinkAccent200, teal500 } from "@react-md/core/colors";
import {
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
} from "@react-md/core/theme/constants";
import { type ConfigurableThemeColors } from "@react-md/core/theme/types";

export const MATERIAL_COLORS_WITH_SHADES = [
  "red",
  "pink",
  "purple",
  "deepPurple",
  "indigo",
  "blue",
  "lightBlue",
  "cyan",
  "teal",
  "green",
  "lightGreen",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deepOrange",
] as const;
export type MaterialColorWithShade =
  (typeof MATERIAL_COLORS_WITH_SHADES)[number];

export const MATERIAL_COLORS = [
  ...MATERIAL_COLORS_WITH_SHADES,
  "brown",
  "grey",
  "blueGrey",
] as const;
export type MaterialColor = (typeof MATERIAL_COLORS)[number];

export const MATERIAL_COLOR_SHADES = [
  "900",
  "800",
  "700",
  "600",
  "500",
  "400",
  "300",
  "200",
  "100",
  "50",
  "A700",
  "A400",
  "A200",
  "A100",
] as const;
export type MaterialColorShade = (typeof MATERIAL_COLOR_SHADES)[number];

export const DEFAULT_WEBSITE_THEME_COLORS = {
  primaryColor: teal500,
  onPrimaryColor: black,
  secondaryColor: pinkAccent200,
  onSecondaryColor: black,
} satisfies Partial<ConfigurableThemeColors>;
export const DEFAULT_WEBSITE_LIGHT_THEME: ConfigurableThemeColors = {
  ...DEFAULT_LIGHT_THEME,
  ...DEFAULT_WEBSITE_THEME_COLORS,
};
export const DEFAULT_WEBSITE_DARK_THEME: ConfigurableThemeColors = {
  ...DEFAULT_DARK_THEME,
  ...DEFAULT_WEBSITE_THEME_COLORS,
};
