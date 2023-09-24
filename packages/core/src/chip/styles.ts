import { cnb } from "cnbuilder";
import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-chip");

/**
 * @remarks \@since 6.0.0
 *
 * Note for the future: Once Firefox supports the `:has` selector, the
 * `leftAddon` and `rightAddon` can be removed. The styles would automatically
 * apply the padding instead:
 *
 * ```scss
 * &:has(.rmd-icon:first-child, .rmd-avatar:first-child) {
 *   @include core.auto-rtl(
 *     padding-left,
 *     $addon-left-padding,
 *     $horizontal-padding
 *   );
 * }
 *
 * $index: if(
 *   not core.$interaction-mode or core.$interaction-mode == press,
 *   1,
 *   2 // last child is always the `.rmd-ripple-container`
 * );
 * &:has(.rmd-icon:nth-last-child(#{$index})) {
 *   @include core.auto-rtl(
 *     padding-right,
 *     $addon-right-padding,
 *     $horizontal-padding
 *   );
 * }
 * ```
 */
export interface ChipClassNameOptions {
  className?: string;
  selectedClassName?: string;

  /** @defaultValue `"solid"` */
  theme?: "outline" | "solid";

  /** @defaultValue `false` */
  disabled?: boolean;

  /** @defaultValue `false` */
  selected?: boolean;

  /** @defaultValue `false` */
  selectedThemed?: boolean;

  /** @defaultValue `false` */
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
 * @remarks \@since 6.0.0
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
    noninteractive = false,
    pressedClassName,
    leftAddon = false,
    rightAddon = false,
  } = options;

  return cnb(
    styles({
      themed: !disabled && selected && selectedThemed,
      selected: !disabled && selected && !selectedThemed,
      solid: theme === "solid",
      outline: theme === "outline",
      disabled,
      noninteractive,
      "left-addon": leftAddon && !rightAddon,
      "right-addon": !leftAddon && rightAddon,
      surrounded: leftAddon && rightAddon,
      pressed,
    }),
    selected && selectedClassName,
    pressedClassName,
    cssUtils({ textColor: disabled ? "text-disabled" : undefined }),
    className
  );
}

/**
 * @remarks \@since 6.0.0
 */
export interface ChipContentClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function chipContent(options: ChipContentClassNameOptions = {}): string {
  const { className } = options;

  return cnb(styles("content"), className);
}
