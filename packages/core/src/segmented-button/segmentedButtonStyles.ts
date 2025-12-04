import { cnb } from "cnbuilder";

import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-segmented-button");

declare module "react" {
  interface CSSProperties {
    "--rmd-segmented-button-border-radius"?: string | number;
    "--rmd-segmented-button-min-height"?: string | number;
    "--rmd-segmented-button-min-width"?: string | number;
    "--rmd-segmented-button-outline-width"?: string | number;
    "--rmd-segmented-button-outline-color"?: string | number;
    "--rmd-segmented-button-color"?: string | number;
    "--rmd-segmented-button-selected-background-color"?: string | number;
    "--rmd-segmented-button-selected-color"?: string | number;
  }
}

/**
 * @since 6.3.1
 */
export interface BaseSegmentedButtonClassNameOptions {
  className?: string;

  /**
   * Set this to `true` to apply selected styles and an optional
   * {@link selectedIcon}
   *
   * @defaultValue `false`
   */
  selected?: boolean;

  /**
   * An optional className to apply when {@link selected} is `true`
   */
  selectedClassName?: string;
}

/**
 * @since 6.0.0
 * @since 6.3.1 Extends BaseSegmentedButtonClassNameOptions
 */
export interface SegmentedButtonClassNameOptions extends BaseSegmentedButtonClassNameOptions {
  /** @internal */
  pressedClassName?: string;
}

/**
 * @since 6.0.0
 */
export function segmentedButton(
  options: SegmentedButtonClassNameOptions = {}
): string {
  const { className, selected, selectedClassName, pressedClassName } = options;

  return cnb(
    styles({ selected }),
    selected && selectedClassName,
    pressedClassName,
    cssUtils({ surface: true }),
    className
  );
}
