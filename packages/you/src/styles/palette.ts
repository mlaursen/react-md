import { cnb } from "cnbuilder";

/**
 * @since 8.0.0
 */
export type PaletteBackground = "background";

/**
 * @since 8.0.0
 */
export type BasePaletteTheme = "primary" | "secondary" | "tertiary" | "error";

/**
 * @since 8.0.0
 */
export type BasePaletteSurface =
  | "surface"
  | "surface-variant"
  | "inverse-surface";

/**
 * @since 8.0.0
 */
export type BasePaletteContainer =
  | PaletteBackground
  | BasePaletteTheme
  | BasePaletteSurface
  | `${BasePaletteTheme}-container`;

/**
 * @since 8.0.0
 */
export type OnBasePaletteContainer = `on-${BasePaletteContainer}`;

/**
 * @since 8.0.0
 */
export type PaletteContainer = BasePaletteContainer | OnBasePaletteContainer;

/**
 * @since 8.0.0
 */
export type ExtraPaletteSurface =
  | "inverse-primary"
  | "surface-dim"
  | "surface-bright"
  | "surface-container-lowest"
  | "surface-container-low"
  | "surface-container"
  | "surface-container-high"
  | "surface-container-highest";

/**
 * @since 8.0.0
 */
export type PaletteBackgroundColor = BasePaletteContainer | ExtraPaletteSurface;

/**
 * @since 8.0.0
 */
export type PaletteTextColor =
  | BasePaletteTheme
  | OnBasePaletteContainer
  | "currentcolor";

/**
 * @since 8.0.0
 */
export type RemainingPalette =
  | "outline"
  | "outline-variant"
  | "shadow"
  | "surface-tint"
  | "scrim";

/**
 * @since 8.0.0
 */
export type PaletteTokenName =
  | PaletteContainer
  | ExtraPaletteSurface
  | RemainingPalette;

/**
 * @since 8.0.0
 */
export interface PaletteBackgroundClassNameOptions {
  className?: string;
  background?: PaletteBackgroundColor;
}

/**
 * @since 8.0.0
 */
export interface PaletteTextColorClassNameOptions {
  className?: string;
  textColor?: PaletteTextColor;
}

/**
 * @since 8.0.0
 */
export interface PaletteClassNameOptions
  extends PaletteBackgroundClassNameOptions, PaletteTextColorClassNameOptions {}

/**
 * @since 8.0.0
 */
export function palette(options: PaletteClassNameOptions = {}): string {
  const { className, background, textColor } = options;

  const isTextColor = !!textColor && textColor !== "currentcolor";

  return cnb(
    background && `rmd-${background}`,
    isTextColor && textColor.startsWith("on-") && `rmd-${textColor}`,
    isTextColor && !textColor.startsWith("on-") && `rmd-text-${textColor}`,
    textColor === "currentcolor" && "rmd-current-color",
    className
  );
}
