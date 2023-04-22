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

// disabled in development since it makes debugging a bit easier by having all
// the css variables in one block in the `SystemTheme_container__` class
// The `app.scss` will include the default system theme for production
export const disableDefaultSystemTheme = process.env.NODE_ENV !== "production";
