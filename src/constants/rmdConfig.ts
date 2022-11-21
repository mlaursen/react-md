import type { ColorSchemeMode, ElementInteractionMode } from "@react-md/core";

export const defaultElementInteractionMode: ElementInteractionMode = "ripple";
// export const defaultElementInteractionMode: ElementInteractionMode = "press";
// export const defaultElementInteractionMode: ElementInteractionMode = "none";
export const defaultColorSchemeMode: ColorSchemeMode = "system";
// export const defaultColorSchemeMode: ColorSchemeMode = "light";
// export const defaultColorSchemeMode: ColorSchemeMode = "dark";
//
export const defaultDisableHighContrastMode = false;
// export const defaultDisableHighContrastMode = true

// disabled since it makes debugging a bit easier by having all the css variables in one block
export const disableDefaultSystemTheme = true;
// export const disableDefaultSystemTheme = false;
