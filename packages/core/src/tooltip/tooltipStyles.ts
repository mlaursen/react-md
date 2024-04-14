import { cnb } from "cnbuilder";
import { cssUtils, type TextOverflow } from "../cssUtils.js";
import type { SimplePosition } from "../positioning/types.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-tooltip");

/**
 * @since 6.0.0
 */
export interface TooltipClassNameOptions {
  className?: string;
  dense?: boolean;
  position: SimplePosition;
  textOverflow?: TextOverflow;
}

/**
 * @since 6.0.0
 */
export function tooltip(options: TooltipClassNameOptions): string {
  const { dense, position, className, textOverflow } = options;

  return cnb(
    styles({
      dense,
      [position]: true,
    }),
    cssUtils({ textOverflow }),
    className
  );
}
