import { cnb } from "cnbuilder";

import { type BackgroundColor, cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-chip");

declare module "react" {
  interface CSSProperties {
    "--rmd-chip-gap"?: string;
    "--rmd-chip-height"?: string;
    "--rmd-chip-border-radius"?: string | number;
    "--rmd-chip-horizontal-padding"?: string | number;
    "--rmd-chip-vertical-padding"?: string | number;
    "--rmd-chip-solid-background-color"?: string;
    "--rmd-chip-solid-disabled-background-color"?: string;
    "--rmd-chip-solid-color"?: string;
    "--rmd-chip-theme-background-color"?: string;
    "--rmd-chip-theme-color"?: string;
    "--rmd-chip-outline-color"?: string;
    "--rmd-chip-outline-width"?: string | number;
    "--rmd-chip-outline-background-color"?: string;
    "--rmd-chip-outline-text-color"?: string;
  }
}

/**
 * @since 6.3.1
 */
export type ChipTheme = "outline" | "solid";

/**
 * @since 6.0.0
 *
 * Note for the future: Once Firefox supports the `:has` selector, the
 * `leftAddon` and `rightAddon` can be removed. The styles would automatically
 * apply the padding instead:
 *
 * ```scss
 * &:has(.rmd-icon:first-child, .rmd-avatar:first-child) {
 *   padding-left: $addon-left-padding;
 *
 *   @include utils.rtl {
 *     padding-left: $horizontal-padding;
 *     padding-right; $addon-left-padding;
 *   }
 * }
 *
 * $index: if(
 *   not core.$interaction-mode or core.$interaction-mode == press,
 *   1,
 *   2 // last child is always the `.rmd-ripple-container`
 * );
 * &:has(.rmd-icon:nth-last-child(#{$index})) {
 *   padding-right: $addon-left-padding;
 *
 *   @include utils.rtl {
 *     padding-left; $addon-left-padding;
 *     padding-right: $horizontal-padding;
 *   }
 * }
 * ```
 */
export interface ChipClassNameOptions {
  className?: string;

  /**
   * An optional className to provide only while {@link selected} is `true`.
   */
  selectedClassName?: string;

  /** @defaultValue `"solid"` */
  theme?: ChipTheme;

  backgroundColor?: BackgroundColor;

  /** @defaultValue `false` */
  disabled?: boolean;

  /** @defaultValue `false` */
  selected?: boolean;

  /** @defaultValue `false` */
  selectedThemed?: boolean;

  /** @defaultValue `true` */
  noninteractive?: boolean;

  /** @defaultValue `false` */
  leftAddon?: boolean;

  /** @defaultValue `false` */
  rightAddon?: boolean;

  /** @defaultValue `false` */
  pressed?: boolean;
  pressedClassName?: string;
}

/**
 * @since 6.0.0
 */
export function chip(options: ChipClassNameOptions = {}): string {
  const {
    className,
    theme = "solid",
    pressed = false,
    disabled = false,
    selected = false,
    selectedThemed = false,
    selectedClassName,
    noninteractive = true,
    pressedClassName,
    leftAddon = false,
    rightAddon = false,
    backgroundColor,
  } = options;

  return cnb(
    styles({
      themed: !disabled && selected && selectedThemed,
      selected: !disabled && selected && !selectedThemed,
      solid: theme === "solid",
      outline: theme === "outline",
      disabled,
      "left-addon": leftAddon,
      "right-addon": rightAddon,
      pressed,
    }),
    selected && selectedClassName,
    pressedClassName,
    cssUtils({
      surface: !noninteractive,
      textColor: disabled ? "text-disabled" : undefined,
      backgroundColor,
    }),
    className
  );
}

/**
 * @since 6.0.0
 */
export interface ChipContentClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function chipContent(options: ChipContentClassNameOptions = {}): string {
  const { className } = options;

  return cnb(styles("content"), className);
}
