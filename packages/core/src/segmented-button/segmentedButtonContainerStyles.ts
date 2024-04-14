import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-segmented-button-container");

/**
 * @since 6.0.0
 */
export interface SegmentedButtonContainerClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  disableFullWidth?: boolean;
}

/**
 * @since 6.0.0
 */
export function segmentedButtonContainerStyles(
  options: SegmentedButtonContainerClassNameOptions = {}
): string {
  const { className, disableFullWidth } = options;

  return cnb(styles({ "full-width": !disableFullWidth }), className);
}
