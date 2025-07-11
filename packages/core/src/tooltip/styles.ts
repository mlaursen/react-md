import { cnb } from "cnbuilder";

import { type TextOverflow, cssUtils } from "../cssUtils.js";
import { type SimplePosition } from "../positioning/types.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-tooltip");

declare module "react" {
  interface CSSProperties {
    "--rmd-tooltip-background-color"?: string;
    "--rmd-tooltip-border-radius"?: string | number;
    "--rmd-tooltip-color"?: string;
    "--rmd-tooltip-spacing"?: string | number;
    "--rmd-tooltip-z-index"?: string | number;
    "--rmd-tooltip-horizontal-padding"?: string | number;
    "--rmd-tooltip-vertical-padding"?: string | number;
    "--rmd-tooltip-min-height"?: string | number;
    "--rmd-tooltip-max-width"?: string | number;
    "--rmd-tooltip-dense-horizontal-padding"?: string | number;
    "--rmd-tooltip-dense-vertical-padding"?: string | number;
    "--rmd-tooltip-dense-min-height"?: string | number;
    "--rmd-tooltip-transition-distance"?: string | number;
  }
}

/**
 * @since 6.0.0
 * @since 6.3.1 Allow `position` to be optional
 */
export interface TooltipClassNameOptions {
  className?: string;

  /**
   * Set this to `true` to use a smaller font size and padding on the tooltip
   * and a smaller gap between the tooltip and tooltipped element.
   *
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * @defaultValue `"below"`
   */
  position?: SimplePosition;

  /**
   * Set this to `"nowrap"` for tooltips that are positioned near the edge of
   * the viewport that have a position of `"above"` or `"below"` so that the
   * tooltip no longer aligns to the center of the tooltipped element.
   *
   * Set this to `"ellipsis"` if the tooltip should only show a single line of
   * text and ellipsis once it has reached the max tooltip width.
   *
   * @defaultValue `"allow"`
   */
  textOverflow?: TextOverflow;
}

/**
 * @since 6.0.0
 */
export function tooltip(options: TooltipClassNameOptions): string {
  const { dense, position = "below", className, textOverflow } = options;

  return cnb(
    styles({
      dense,
      [position]: true,
    }),
    cssUtils({ textOverflow }),
    className
  );
}
