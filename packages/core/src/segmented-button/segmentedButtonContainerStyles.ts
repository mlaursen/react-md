import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-segmented-button-container");

/**
 * @remarks \@since 6.0.0
 */
export interface SegmentedButtonContainerClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function segmentedButtonContainerStyles(
  options: SegmentedButtonContainerClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles(), className);
}
