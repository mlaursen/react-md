import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-segmented-button");

/**
 * @remarks \@since 6.0.0
 */
export interface SegmentedButtonClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  selected?: boolean;

  /**
   * An optional className to apply when {@link selected} is `true`
   */
  selectedClassName?: string;

  /** @internal */
  pressedClassName?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function segmentedButton(
  options: SegmentedButtonClassNameOptions = {}
): string {
  const { className, selected, selectedClassName, pressedClassName } = options;

  return cnb(
    styles({ selected }),
    selected && selectedClassName,
    pressedClassName,
    className
  );
}
