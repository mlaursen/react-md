import { cnb } from "cnbuilder";
import { bem } from "@react-md/core";

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

  /**
   * @defaultValue `"solid"`
   */
  theme?: "outline" | "solid";

  /**
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * @defaultValue `false`
   */
  selected?: boolean;

  /**
   * @defaultValue `false`
   */
  selectedThemed?: boolean;

  /**
   * @defaultValue `false`
   */
  noninteractive?: boolean;

  /**
   * @defaultValue `false`
   */
  leftAddon?: boolean;

  /**
   * @defaultValue `false`
   */
  rightAddon?: boolean;

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
      noninteractive: noninteractive,
      "left-addon": leftAddon && !rightAddon,
      "right-addon": !leftAddon && rightAddon,
      surrounded: leftAddon && rightAddon,
      pressed,
    }),
    pressedClassName,
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

/**
 * @remarks \@since 6.0.0
 */
export interface ChipIconClassNameOptions {
  className?: string;
  visible: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function chipIcon(options: ChipIconClassNameOptions): string {
  const { className, visible } = options;

  return cnb(styles("icon", { visible }), className);
}
