import { cnb } from "cnbuilder";
import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-segmented-button-container");

/**
 * @remarks \@since 6.0.0
 */
export interface SegmentedButtonContainerClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  disableFullWidth?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function segmentedButtonContainer(
  options: SegmentedButtonContainerClassNameOptions = {}
): string {
  const { className, disableFullWidth } = options;

  return cnb(styles(), cssUtils({ fullWidth: !disableFullWidth }), className);
}
