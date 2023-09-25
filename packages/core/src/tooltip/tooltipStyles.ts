import { cnb } from "cnbuilder";
import { cssUtils } from "../cssUtils.js";
import type { SimplePosition } from "../positioning/types.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-tooltip");

/**
 * @remarks \@since 6.0.0
 */
export interface TooltipClassNameOptions {
  className?: string;
  dense?: boolean;
  position: SimplePosition;
  disableLineWrap?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function tooltip(options: TooltipClassNameOptions): string {
  const { dense, position, className, disableLineWrap } = options;

  return cnb(
    styles({
      dense,
      [position]: true,
    }),
    cssUtils({ textOverflow: disableLineWrap ? "nowrap" : undefined }),
    className
  );
}
